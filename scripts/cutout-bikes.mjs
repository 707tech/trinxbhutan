// Turns studio bike photos (white background) into transparent PNG cut-outs for the hero slider.
// Removes: the outer background, the white gaps inside the wheels, and any caption text.
//   node scripts/cutout-bikes.mjs        (needs `sharp`, which Astro already installs)
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const photos = fileURLToPath(new URL('../src/assets/photos/', import.meta.url));
const hero = fileURLToPath(new URL('../src/assets/hero/', import.meta.url));
// slide 1 = hardtail, slide 2 = road, slide 3 = action / mountain
const jobs = [
  { src: 'X5 Pro.jpg', n: 1 },
  { src: 'Tempo 2.1.jpg', n: 2 },
  { src: 'K036 Elite.jpg', n: 3 },
];
const THR = 243; // a pixel counts as background when R, G and B are all above this
const MIN_HOLE = 120; // enclosed white regions bigger than this (px) are removed (wheel gaps)

function label(w, h, ok, conn8) {
  const lab = new Int32Array(w * h).fill(-1);
  const areas = [], touches = [];
  const st = [];
  for (let s = 0; s < w * h; s++) {
    if (!ok[s] || lab[s] !== -1) continue;
    const id = areas.length;
    let area = 0, edge = false;
    st.push(s); lab[s] = id;
    while (st.length) {
      const p = st.pop(); area++;
      const x = p % w, y = (p / w) | 0;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) edge = true;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if ((!dx && !dy) || (!conn8 && dx && dy)) continue;
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const q = ny * w + nx;
        if (ok[q] && lab[q] === -1) { lab[q] = id; st.push(q); }
      }
    }
    areas.push(area); touches.push(edge);
  }
  return { lab, areas, touches };
}

for (const { src, n } of jobs) {
  const { data, info } = await sharp(photos + src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  // 1) background candidates
  const cand = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) cand[i] = data[i * 3] >= THR && data[i * 3 + 1] >= THR && data[i * 3 + 2] >= THR ? 1 : 0;
  const bg = label(w, h, cand, false);
  const isBg = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) if (cand[i]) { const id = bg.lab[i]; if (bg.touches[id] || bg.areas[id] >= MIN_HOLE) isBg[i] = 1; }

  // 2) keep the biggest foreground blob (the bike); drops caption text and specks
  const fgOk = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) fgOk[i] = isBg[i] ? 0 : 1;
  const fg = label(w, h, fgOk, true);
  const biggest = fg.areas.reduce((b, a, i) => (a > fg.areas[b] ? i : b), 0);
  const alpha = Buffer.alloc(w * h);
  for (let i = 0; i < w * h; i++) alpha[i] = fg.lab[i] === biggest || (fg.lab[i] >= 0 && fg.areas[fg.lab[i]] > fg.areas[biggest] * 0.15) ? 255 : 0;

  // 3) soften the edge slightly so it does not look cut with scissors, then upscale 2x for a sharper hero
  const { data: soft, info: si } = await sharp(alpha, { raw: { width: w, height: h, channels: 1 } }).blur(0.9).raw().toBuffer({ resolveWithObject: true });
  const sc = si.channels;
  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) { rgba[i * 4] = data[i * 3]; rgba[i * 4 + 1] = data[i * 3 + 1]; rgba[i * 4 + 2] = data[i * 3 + 2]; rgba[i * 4 + 3] = soft[i * sc]; }
  const cut = sharp(rgba, { raw: { width: w, height: h, channels: 4 } }).trim({ threshold: 1 }); // crop to the bike
  const trimmed = await cut.png().toBuffer();
  await sharp(trimmed).resize({ width: 1400, kernel: 'lanczos3' }).sharpen({ sigma: 0.8 }).png({ compressionLevel: 9 }).toFile(`${hero}bike-${n}.png`);

  // square thumbnail: the bike on a light-grey tile
  const tb = await sharp(trimmed).resize({ width: 600, height: 600, fit: 'inside' }).toBuffer();
  await sharp({ create: { width: 700, height: 700, channels: 3, background: '#f2f2f2' } }).composite([{ input: tb, gravity: 'center' }]).jpeg({ quality: 85 }).toFile(`${hero}thumb-${n}.jpg`);
  console.log(src, '→ bike-' + n + '.png', `${w}x${h}`, 'kept', fg.areas[biggest], 'px');
}
