// Generates placeholder hero art in src/assets/hero/: bike-1..3.png (transparent bicycle line-art) and thumb-1..3.jpg.
// Replace these files with your own cut-out bike PNGs / product photos (keep the same names).
//   node scripts/gen-hero-art.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../src/assets/hero/', import.meta.url));
const photos = fileURLToPath(new URL('../src/assets/photos/', import.meta.url));
mkdirSync(out, { recursive: true });

function bike({ frame, accent, kind }) {
  const R = [190, 340], F = [610, 340], BB = [395, 345];
  const road = kind === 'road', mtb = kind === 'mtb';
  const S = road ? [350, 150] : [355, 178], H1 = road ? [555, 160] : [560, 170], H2 = road ? [572, 205] : [578, 212];
  const tireW = mtb ? 22 : road ? 9 : 14, tubeW = road ? 13 : 17;
  const wheel = ([x, y], i) => {
    let s = `<circle cx="${x}" cy="${y}" r="${135 - tireW / 2}" fill="none" stroke="#1a1a1a" stroke-width="${tireW}"/>`;
    s += `<circle cx="${x}" cy="${y}" r="${112}" fill="none" stroke="#9aa0a6" stroke-width="3.5"/>`;
    for (let a = 0; a < 18; a++) { const t = (a / 18) * Math.PI * 2; s += `<line x1="${x + Math.cos(t) * 14}" y1="${y + Math.sin(t) * 14}" x2="${x + Math.cos(t) * 111}" y2="${y + Math.sin(t) * 111}" stroke="#b8bdc2" stroke-width="1.4"/>`; }
    if (mtb || kind === 'gravel') s += `<circle cx="${x}" cy="${y}" r="30" fill="none" stroke="#6b7076" stroke-width="3"/>`;
    if (mtb) for (let a = 0; a < 40; a++) { const t = (a / 40) * Math.PI * 2; s += `<line x1="${x + Math.cos(t) * 124}" y1="${y + Math.sin(t) * 124}" x2="${x + Math.cos(t) * 134}" y2="${y + Math.sin(t) * 134}" stroke="#444" stroke-width="3"/>`; }
    return s + `<circle cx="${x}" cy="${y}" r="11" fill="#2b2f33"/>`;
  };
  const line = (a, b, w = tubeW, c = frame) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  let s = wheel(R) + wheel(F);
  s += line(BB, R, tubeW - 4) + line(S, R, tubeW - 5) + line(BB, S) + line(S, H1) + line(BB, H2, tubeW + 3) + line(H1, H2, tubeW + 2, accent);
  s += mtb
    ? line(H2, [F[0] - 8, F[1] - 70], 16, '#2b2f33') + line([F[0] - 8, F[1] - 70], F, 11, '#c9ced3')
    : line(H2, F, tubeW - 4, accent);
  // cockpit
  s += line(H1, [H1[0] - 12, H1[1] - 34], 12, '#222');
  s += road
    ? `<path d="M ${H1[0] - 12} ${H1[1] - 36} q 50 -8 62 22 q 4 24 -22 24" fill="none" stroke="#222" stroke-width="10" stroke-linecap="round"/>`
    : line([H1[0] - 38, H1[1] - 40], [H1[0] + 42, H1[1] - 52], 11, '#222');
  // saddle + post
  s += line(S, [S[0] - 3, S[1] - 26], 10, '#222') + line([S[0] - 40, S[1] - 30], [S[0] + 32, S[1] - 26], 14, '#111');
  // drivetrain
  s += `<circle cx="${BB[0]}" cy="${BB[1]}" r="30" fill="none" stroke="#2b2f33" stroke-width="6"/><circle cx="${BB[0]}" cy="${BB[1]}" r="12" fill="${accent}"/>`;
  s += line([BB[0] - 30, BB[1] + 28], [BB[0] + 30, BB[1] - 28], 6, '#222') + line(BB, R, 3, '#3a3f45');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="40 80 720 460" width="1200" height="767">${s}</svg>`;
}

const defs = [
  { n: 1, frame: '#111111', accent: '#0094de', kind: 'mtb', thumb: '1563990308267-cd6d3cc09318' },
  { n: 2, frame: '#0094de', accent: '#111111', kind: 'road', thumb: '1485965120184-e220f721d03e' },
  { n: 3, frame: '#1f2937', accent: '#0094de', kind: 'gravel', thumb: '1544191696-102dbdaeeaa0' },
];
for (const d of defs) {
  await sharp(Buffer.from(bike(d)), { density: 144 }).png({ compressionLevel: 9 }).toFile(`${out}bike-${d.n}.png`);
  await sharp(`${photos}${d.thumb}.jpg`).resize(700, 700, { fit: 'cover' }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${out}thumb-${d.n}.jpg`);
  console.log('hero art', d.n);
}
