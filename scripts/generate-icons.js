import fs from 'fs';
import zlib from 'zlib';

// Function to calculate CRC32 for PNG chunks
function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  return table;
}

const crcTable = createCRC32Table();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function writePNG(width, height, getPixel) {
  // PNG Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth: 8
  ihdrData[9] = 6; // Color type: 6 (RGBA)
  ihdrData[10] = 0; // Compression method
  ihdrData[11] = 0; // Filter method
  ihdrData[12] = 0; // Interlace method

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // Raw image data with 0 filter byte per scanline
  const scanlineLength = width * 4 + 1;
  const rawData = Buffer.alloc(height * scanlineLength);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = getPixel(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  // IDAT chunk
  const compressed = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = data.length;
  const buf = Buffer.alloc(4 + 4 + length + 4);
  buf.writeUInt32BE(length, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crcTarget = buf.subarray(4, 8 + length);
  const crcVal = crc32(crcTarget);
  buf.writeUInt32BE(crcVal, 8 + length);
  return buf;
}

// Generate brand icon pixel logic
function getStoryVersePixel(isMaskable) {
  return (x, y, w, h) => {
    // Normalised coords -1 to 1
    const nx = (x / w) * 2 - 1;
    const ny = (y / h) * 2 - 1;
    const dist = Math.sqrt(nx * nx + ny * ny);

    // Deep luxury Burgundy to Crimson gradient (#7D2948 -> #3D1222)
    const tY = (ny + 1) / 2;
    let r = Math.round(125 - 60 * tY);
    let g = Math.round(41 - 22 * tY);
    let b = Math.round(72 - 38 * tY);
    let a = 255;

    // Outer rounded corner clip if not maskable
    if (!isMaskable) {
      const cornerRadius = 0.28;
      const qx = Math.max(0, Math.abs(nx) - (1 - cornerRadius));
      const qy = Math.max(0, Math.abs(ny) - (1 - cornerRadius));
      const cornerDist = Math.sqrt(qx * qx + qy * qy);
      if (cornerDist > cornerRadius) {
        return [0, 0, 0, 0];
      }
    }

    // Emblem scale
    const scale = isMaskable ? 0.65 : 0.85;
    const ex = nx / scale;
    const ey = ny / scale;
    const eDist = Math.sqrt(ex * ex + ey * ey);

    // Golden halo ring around center
    if (eDist >= 0.72 && eDist <= 0.77) {
      return [232, 197, 71, 230]; // Gold #E8C547
    }

    // Stylized "S" / Book / Sparkle glyph inside
    // Vertical center ribbon & curve approximations
    const inTopArc = (ex * ex + (ey + 0.25) * (ey + 0.25) < 0.16) && (ex * ex + (ey + 0.25) * (ey + 0.25) > 0.05) && (ex < 0.15 || ey > -0.25);
    const inBotArc = (ex * ex + (ey - 0.25) * (ey - 0.25) < 0.16) && (ex * ex + (ey - 0.25) * (ey - 0.25) > 0.05) && (ex > -0.15 || ey < 0.25);
    const inDiagonal = Math.abs(ex + ey * 0.8) < 0.12 && Math.abs(ey) < 0.35;

    if (inTopArc || inBotArc || inDiagonal) {
      return [255, 255, 255, 255]; // Crisp white S-monogram
    }

    // Sparkling gold star at top right
    const starDx = Math.abs(ex - 0.4);
    const starDy = Math.abs(ey + 0.4);
    if ((starDx < 0.04 && starDy < 0.15) || (starDy < 0.04 && starDx < 0.15)) {
      return [245, 210, 110, 255]; // Star sparkle
    }

    return [r, g, b, a];
  };
}

if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

// 1. Generate 192x192
const pwa192 = writePNG(192, 192, getStoryVersePixel(false));
fs.writeFileSync('public/pwa-192x192.png', pwa192);

// 2. Generate 512x512
const pwa512 = writePNG(512, 512, getStoryVersePixel(false));
fs.writeFileSync('public/pwa-512x512.png', pwa512);

// 3. Generate 512x512 Maskable (full bleed background, padded safe zone)
const pwaMaskable = writePNG(512, 512, getStoryVersePixel(true));
fs.writeFileSync('public/pwa-maskable-512x512.png', pwaMaskable);

// 4. Generate Apple Touch Icon 180x180
const appleIcon = writePNG(180, 180, getStoryVersePixel(false));
fs.writeFileSync('public/apple-touch-icon.png', appleIcon);

// 5. Generate Favicon
fs.writeFileSync('public/favicon.ico', pwa192);

console.log('PNG and ICO assets successfully generated in /public');
