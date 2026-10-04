const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Minimal PNG Decoder & Encoder to clear checkerboard background
function removeCheckerboardBackground(inputPath, outputPath) {
  const fileBuffer = fs.readFileSync(inputPath);
  
  // Verify PNG signature
  if (fileBuffer.readUInt32BE(0) !== 0x89504E47) {
    console.error('Not a valid PNG file');
    return;
  }

  // Parse PNG Chunks
  let pos = 8;
  let width = 0, height = 0, bitDepth = 0, colorType = 0;
  const idatChunks = [];

  while (pos < fileBuffer.length) {
    const length = fileBuffer.readUInt32BE(pos);
    const type = fileBuffer.toString('ascii', pos + 4, pos + 8);
    
    if (type === 'IHDR') {
      width = fileBuffer.readUInt32BE(pos + 8);
      height = fileBuffer.readUInt32BE(pos + 12);
      bitDepth = fileBuffer.readUInt8(pos + 16);
      colorType = fileBuffer.readUInt8(pos + 17);
      console.log(`PNG Info: ${width}x${height}, BitDepth: ${bitDepth}, ColorType: ${colorType}`);
    } else if (type === 'IDAT') {
      idatChunks.push(fileBuffer.subarray(pos + 8, pos + 8 + length));
    }
    
    pos += 12 + length;
  }

  if (idatChunks.length === 0) return;

  const compressedData = Buffer.concat(idatChunks);
  const decompressed = zlib.inflateSync(compressedData);

  // Unfilter scanlines (assuming RGBA 8-bit, colorType 6)
  const bytesPerPixel = colorType === 6 ? 4 : 3;
  const stride = width * bytesPerPixel + 1;
  const rawPixels = Buffer.alloc(width * height * 4);

  let prevScanline = Buffer.alloc(width * bytesPerPixel);

  for (let y = 0; y < height; y++) {
    const filterType = decompressed[y * stride];
    const scanline = decompressed.subarray(y * stride + 1, (y + 1) * stride);
    const unfilteredLine = Buffer.alloc(width * bytesPerPixel);

    for (let i = 0; i < scanline.length; i++) {
      let left = i >= bytesPerPixel ? unfilteredLine[i - bytesPerPixel] : 0;
      let up = prevScanline[i];
      let upLeft = i >= bytesPerPixel ? prevScanline[i - bytesPerPixel] : 0;

      let val = scanline[i];
      if (filterType === 1) val = (val + left) & 0xff;
      else if (filterType === 2) val = (val + up) & 0xff;
      else if (filterType === 3) val = (val + Math.floor((left + up) / 2)) & 0xff;
      else if (filterType === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        let pr = upLeft;
        if (pa <= pb && pa <= pc) pr = left;
        else if (pb <= pc) pr = up;
        val = (val + pr) & 0xff;
      }
      unfilteredLine[i] = val;
    }

    prevScanline = unfilteredLine;

    // Copy to RGBA buffer
    for (let x = 0; x < width; x++) {
      const srcIdx = x * bytesPerPixel;
      const dstIdx = (y * width + x) * 4;
      const r = unfilteredLine[srcIdx];
      const g = unfilteredLine[srcIdx + 1];
      const b = unfilteredLine[srcIdx + 2];
      const a = bytesPerPixel === 4 ? unfilteredLine[srcIdx + 3] : 255;

      // Detect checkerboard grid pattern (white/light grey shades: R,G,B close to each other > 175)
      const isMonochrome = Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && Math.abs(r - b) < 25;
      const isLightBackground = r > 165 && g > 165 && b > 165;
      const isDarkBackground = r < 20 && g < 20 && b < 20;

      if (isMonochrome && isLightBackground) {
        rawPixels[dstIdx] = r;
        rawPixels[dstIdx + 1] = g;
        rawPixels[dstIdx + 2] = b;
        rawPixels[dstIdx + 3] = 0; // Make transparent
      } else {
        rawPixels[dstIdx] = r;
        rawPixels[dstIdx + 1] = g;
        rawPixels[dstIdx + 2] = b;
        rawPixels[dstIdx + 3] = a;
      }
    }
  }

  // Filter scanlines as None (0) for simplicity
  const filteredData = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    filteredData[y * (width * 4 + 1)] = 0; // filter 0
    rawPixels.copy(filteredData, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }

  const newIdat = zlib.deflateSync(filteredData);

  // Build PNG Output
  const chunks = [];
  chunks.push(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8);
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);
  chunks.push(createChunk('IHDR', ihdr));

  // IDAT
  chunks.push(createChunk('IDAT', newIdat));

  // IEND
  chunks.push(createChunk('IEND', Buffer.alloc(0)));

  const outBuffer = Buffer.concat(chunks);
  fs.writeFileSync(outputPath, outBuffer);
  console.log(`Saved transparent mascot image to ${outputPath} (${outBuffer.length} bytes)`);
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const buf = Buffer.concat([typeBuf, data]);
  
  // Simple CRC32 computation
  const crc = crc32(buf);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);
  
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const inImg = 'c:/KV_GOLD2/KvGold/public/mascot/gold-mascot.png';
const outImg = 'c:/KV_GOLD2/KvGold/public/mascot/gold-mascot-clean.png';
removeCheckerboardBackground(inImg, outImg);
