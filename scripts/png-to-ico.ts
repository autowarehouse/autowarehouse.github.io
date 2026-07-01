#!/usr/bin/env bun
/**
 * Build a multi-resolution .ico from PNG files (modern PNG-embedded ICO format).
 * Usage: bun scripts/png-to-ico.ts in1.png [in2.png ...] out.ico
 */
export {};

const args = process.argv.slice(2);
const out = args.pop();
if (!out || args.length === 0) {
  console.error('usage: png-to-ico.ts <in.png...> <out.ico>');
  process.exit(1);
}

const pngs = await Promise.all(args.map(async (p) => new Uint8Array(await Bun.file(p).arrayBuffer())));

// PNG dimensions live in the IHDR chunk (bytes 16–24, big-endian width/height).
const dim = (png: Uint8Array) => {
  const dv = new DataView(png.buffer, png.byteOffset);
  return { w: dv.getUint32(16), h: dv.getUint32(20) };
};

const HEADER = 6;
const ENTRY = 16;
const dataOffset = HEADER + ENTRY * pngs.length;

const buf = new Uint8Array(dataOffset + pngs.reduce((n, p) => n + p.length, 0));
const dv = new DataView(buf.buffer);
dv.setUint16(2, 1, true); // type = icon
dv.setUint16(4, pngs.length, true); // image count

let offset = dataOffset;
pngs.forEach((png, i) => {
  const { w, h } = dim(png);
  const e = HEADER + ENTRY * i;
  buf[e] = w >= 256 ? 0 : w; // 0 encodes 256
  buf[e + 1] = h >= 256 ? 0 : h;
  dv.setUint16(e + 4, 1, true); // color planes
  dv.setUint16(e + 6, 32, true); // bits per pixel
  dv.setUint32(e + 8, png.length, true); // size of image data
  dv.setUint32(e + 12, offset, true); // offset to image data
  buf.set(png, offset);
  offset += png.length;
});

await Bun.write(out, buf);
console.log(`wrote ${out} (${pngs.length} sizes)`);
