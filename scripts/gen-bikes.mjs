// Generates src/data/bikes.ts from REAL Trinx specifications taken from the official site (trinx.com), 14 Oct 2026.
// The official site lists no prices or weights, so prices are null ("Price on request") until you add them.
// Photos are still illustrative stock images (not the exact model).
//   node scripts/gen-bikes.mjs
import { writeFileSync } from 'node:fs';

const HEX = { black: '#161616', red: '#c8102e', orange: '#ff6a13', blue: '#1f4e9c', grey: '#8b9097', gray: '#8b9097', cyan: '#19b5c9', white: '#f1f1f1', green: '#1f8a5b', brown: '#7a4b2a', yellow: '#f5c400', pink: '#e85d9a', purple: '#7a3fb5', silver: '#c4c8cd', matte: null };
// "Black/Red" -> two-tone swatch from each side's first colour word; "Cyan/White Green" -> [cyan, white]
const colour = (label) => {
  const parts = label.split('/').map((p) => p.trim().split(/\s+/).find((w) => HEX[w.toLowerCase()]) || 'grey');
  return { name: label, swatch: [...new Set(parts.map((p) => HEX[p.toLowerCase()]))].slice(0, 2) };
};
const S = (...labels) => labels.map(colour);
const base = 'http://www.trinx.com/index.php?ac=article&at=read&did=';

const bikes = [
  // ---------- Mountain (Trinx "Hardtail") ----------
  { name: 'X9 Pro', cat: 'Mountain', did: 2185, sizes: ['S (15")', 'M (17")', 'L (19")'], colors: null,
    over: 'Carbon-frame 29" hardtail with a Boost frame, 100 mm remote-lockout fork, Shimano SLX 12-speed drivetrain and hydraulic disc brakes.',
    imgs: ['1575585269294-7d28dd912db8', '1636925281365-f82e35b7e1c7', '1572111504021-40abd3479ddb'],
    s: { frame: 'TRINX T800 carbon, 29" × 15/17/19", Boost', fork: 'Magnesium air remote suspension, 100 mm travel, Boost', shifter: 'Shimano SLX SL-M7100', rearDerailleur: 'Shimano SLX RD-M7100', crank: 'Prowheel 36T × 175 mm', cassette: 'CS-M9012, 11–50T, 12-speed', chain: 'KMC 12-speed', brakes: 'Shimano BR-MT200 hydraulic disc', wheels: 'Trinx alloy double wall, Weinmann U32 rims, Formula alloy sealed-bearing Boost disc hubs', tires: 'CST C-1747 29 × 2.25" 160TPI', saddle: 'SR Sport' } },
  { name: 'X5 Pro', cat: 'Mountain', did: 2184, sizes: ['S (15")', 'M (17")'], colors: null,
    over: '29" alloy hardtail with hidden cable routing, a 100 mm remote-lockout air fork, Shimano Deore 10-speed gearing and hydraulic disc brakes.',
    imgs: ['1508789454646-bef72439f197', '1563990308267-cd6d3cc09318', '1572111504021-40abd3479ddb'],
    s: { frame: 'Trinx alloy, 29" × 15/17", special-shaped tubes, hidden cables', fork: 'Magnesium air remote suspension, 100 mm travel', shifter: 'Shimano Deore SL-M4100', rearDerailleur: 'Shimano Deore RD-M4120', crank: 'Alloy 36T × 175 mm', cassette: '11–42T, 10-speed', chain: 'KMC 10-speed', brakes: 'Shimano BR-MT200 hydraulic disc', wheels: 'Trinx alloy double wall', tires: 'Kenda 29 × 2.1"', saddle: 'Trinx Sport' } },
  { name: 'K036 Elite (Striker)', cat: 'Mountain', did: 2078, sizes: ['S (16")', 'M (18")', 'L (20")'], colors: S('Cyan/White Green', 'Matte Black/White Red', 'Black/White Blue'),
    over: '27.5" hardtail with a 100 mm suspension fork, 24-speed gearing and mechanical disc brakes — an affordable trail starter.',
    imgs: ['1544191696-102dbdaeeaa0', '1575585269294-7d28dd912db8'],
    s: { frame: 'Trinx Hi-Ten steel, 27.5" × 16/18/20"', fork: 'Suspension, 100 mm travel', shifter: 'Ltwoo SL-V4008', frontDerailleur: 'Ltwoo FD-V5008', rearDerailleur: 'Ltwoo RD-V4008-L-2', crank: '24/34/42T × 170 mm', cassette: '13–32T, 8-speed', chain: 'KMC 24-speed', brakes: 'Alloy mechanical disc', wheels: 'Trinx alloy double wall rims, disc hubs', tires: 'Chaoyang 27.5 × 1.95"', saddle: 'Trinx Sport' } },
  // ---------- Road ----------
  { name: 'Tempo 1.0', cat: 'Road', did: 2022, sizes: ['460 mm', '500 mm', '540 mm'], colors: S('Black/Red', 'Black/Orange', 'Black/Blue', 'Matte Grey/Cyan'),
    over: 'Entry-level 700C road bike with a light alloy frame, Shimano 21-speed drivetrain and 28c tyres.',
    imgs: ['1532298229144-0ec0c57515c7', '1541625602330-2277a4c46182', '1534787238916-9ba6764efd4f'],
    s: { frame: 'Trinx alloy', fork: 'Hi-Ten steel, 700C', shifter: 'Shimano SL-A050', rearDerailleur: 'Shimano RD-TZ500', crank: 'Trinx 28/38/48T × 170 mm', cassette: '14–28T, 7-speed', chain: 'M30 7-speed', brakes: 'Alloy side-pull brake', wheels: 'Trinx double wall 700C rims, steel hubs', tires: 'Chaoyang H-419 700 × 28C', saddle: 'Trinx Sport' } },
  { name: 'Tempo 2.1', cat: 'Road', did: 2020, sizes: ['460 mm', '500 mm', '540 mm'], colors: S('Grey/Cyan', 'Grey/Cyan Black', 'Black/Orange', 'Black/Red'),
    over: '700C road bike with brifter shifting, mechanical disc brakes and 28c tyres for confident braking in wet mountain weather.',
    imgs: ['1485965120184-e220f721d03e', '1593764592116-bfb2a97c642a'],
    s: { frame: 'Trinx alloy', fork: 'Hi-Ten steel, 700C', shifter: 'Shimano ST-A070', rearDerailleur: 'Shimano RD-TZ500', crank: 'Trinx 38/48T × 170 mm', cassette: '14–28T, 7-speed', chain: 'M30 7-speed', brakes: 'Repute alloy mechanical disc', wheels: 'Trinx double wall 700C rims, double sealed-bearing hubs', tires: 'Chaoyang H-419 700 × 28C', saddle: 'Trinx Sport' } },
  { name: 'TDO 900', cat: 'Road', did: 2190, sizes: ['450 mm', '480 mm', '510 mm', '530 mm'], colors: S('White/Silver', 'Blue/White'),
    over: 'Carbon road bike with a full Shimano 105 12-speed disc-brake groupset, carbon wheelset and integrated carbon handlebar.',
    imgs: ['1532298229144-0ec0c57515c7', '1485965120184-e220f721d03e'],
    s: { frame: 'Trinx carbon, 700C', fork: 'Trinx carbon, 700C', shifter: 'Shimano 105 ST-R7120', frontDerailleur: 'Shimano 105 FD-R7100', rearDerailleur: 'Shimano 105 RD-R7100', crank: 'Shimano 105 FC-R7100', cassette: 'Shimano 105 CS-R7100', chain: 'Shimano CN-M7100', brakes: 'Shimano 105 BR-R7170 disc', wheels: 'Trinx carbon 700C wheelset', tires: 'Grand Sport Race 700 × 28C', saddle: 'Selle Italia SRX' } },
  // ---------- Gravel / adventure (listed under "Road" on trinx.com) ----------
  { name: 'GTR 2.0', cat: 'Gravel', did: 2017, sizes: ['480 mm', '520 mm', '540 mm'], colors: S('Blue/Orange', 'Matte Black/Red', 'Matte Blue/Grey', 'Grey/Red'),
    over: 'Alloy gravel bike with a carbon fork, Shimano GRX 11-speed components and 40c Maxxis tyres for mixed surfaces.',
    imgs: ['1576435728678-68d0fbf94e91', '1511994298241-608e28f14fde'],
    s: { frame: 'Trinx alloy, 700C × 480/520/540 mm, smooth welding', fork: 'Carbon, 700C', shifter: 'Shimano GRX', rearDerailleur: 'Shimano RD-RX812', crank: 'Prowheel 40T × 170 mm', cassette: 'CS-M9011, 11–42T, 11-speed', chain: 'KMC X11', brakes: 'Shimano BL-RX600 / BR-RX400', wheels: 'Xero GRD 1200 rims', tires: 'Maxxis 700 × 40C 60TPI', saddle: 'SR Sport' } },
  { name: 'Climber 2.3', cat: 'Gravel', did: 2018, sizes: ['460 mm', '500 mm', '540 mm'], colors: S('Matte Brown/Orange', 'Black/Blue', 'Grey/Blue', 'Blue/Yellow'),
    over: 'Adventure road bike with Shimano Sora 9-speed shifting, disc brakes and wide 38c tyres.',
    imgs: ['1576435728678-68d0fbf94e91', '1471506480208-91b3a4cc78be'],
    s: { frame: 'Trinx alloy, 700C × 460/500/540 mm, smooth welding', fork: 'Alloy, 700C', shifter: 'Shimano Sora ST-R3000', frontDerailleur: 'Shimano Sora FD-R3000', rearDerailleur: 'Shimano Sora RD-R3000', crank: 'Prowheel alloy 34/50T × 170 mm', cassette: 'Sunshine CS-M3009, 11–32T, 9-speed', chain: 'KMC Z9', brakes: 'Alloy disc brake', wheels: 'Trinx double wall 700C rims, alloy road sealed-bearing hubs', tires: 'CST C-1894 700 × 38C', saddle: 'SR Sport' } },
  { name: 'Climber 2.1', cat: 'Gravel', did: 2019, sizes: ['460 mm', '500 mm', '540 mm'], colors: S('Matte Brown/Orange', 'Black/Blue', 'Grey/Blue', 'Blue/Yellow'),
    over: 'Adventure road bike with Shimano Claris 8-speed shifting, disc brakes and wide 38c tyres.',
    imgs: ['1511994298241-608e28f14fde', '1576435728678-68d0fbf94e91'],
    s: { frame: 'Trinx alloy, smooth welding', fork: 'Alloy, 700C', shifter: 'Shimano Claris ST-R2000', rearDerailleur: 'Shimano Claris RD-R2000', crank: 'Prowheel alloy 34/50T × 170 mm', cassette: 'Sunshine CS-M3008, 11–32T, 8-speed', chain: 'KMC Z8.1', brakes: 'Alloy disc brake', wheels: 'Trinx double wall 700C rims, alloy road sealed-bearing hubs', tires: 'CST C-1894 700 × 38C', saddle: 'SR Sport' } },
  // ---------- City ----------
  { name: 'Free 1.0', cat: 'City', did: 2024, sizes: ['470 mm', '510 mm'], colors: S('Black/Red', 'Silver/Blue', 'Matte Grey/Orange', 'Blue/Yellow'),
    over: 'Flat-bar 700C fitness and city bike with 21-speed Shimano gearing, V-brakes and 32c tyres.',
    imgs: ['1505705694340-019e1e335916', '1571068316344-75bc76f77890'],
    s: { frame: 'Trinx alloy, 700C × 470/510 mm', fork: 'Hi-Ten steel, 700C', shifter: 'Shimano ST-EF500-7', frontDerailleur: 'Shimano FD-TY510', rearDerailleur: 'Shimano RD-TY300', crank: 'Chainwheel 28/38/48T × 170 mm', cassette: '14–28T, 7-speed', chain: 'KMC 7-speed', brakes: 'Alloy V-brake', wheels: 'Trinx 700C CNC double alloy walls, quick-release steel hubs', tires: 'CST 700 × 32C', saddle: 'Trinx Sport' } },
  { name: 'Touring 1.0 (700C)', cat: 'City', did: 2101, sizes: ['406 mm (women’s frame)'], colors: S('Grey/Black', 'Black/White Orange', 'White/Blue'),
    over: 'Comfortable 700C touring and city bike with a shoulder-lock suspension fork, 24-speed gearing and mechanical disc brakes.',
    imgs: ['1559348349-86f1f65817fe', '1501147830916-ce44a6359892'],
    s: { frame: 'Trinx alloy, 700C × 406 mm, women’s frame', fork: '700C alloy shoulder-lock suspension', shifter: 'Shimano ST-EF500', frontDerailleur: 'Shimano FD-TY500', rearDerailleur: 'Shimano RD-TX800', crank: 'Prowheel 24/34/42T × 170 mm', cassette: 'CS-M3008, 11–32T, 8-speed', chain: 'KMC 8-speed', brakes: 'Trinx alloy mechanical disc', wheels: 'Trinx alloy 700C double wall, alloy disc hubs', tires: 'CST C-1446 700 × 38C', saddle: 'Trinx Comfort' } },
  { name: 'Cute 2.0', cat: 'City', did: 2102, sizes: ['24" × 406 mm'], colors: S('Gray/Blue Purple Brown', 'Pink/Red Blue Purple', 'Green/Blue White Green', 'Purple/Green Blue Red'),
    over: 'Simple 24" single-speed city bike with a women’s frame and comfortable saddle for short everyday trips.',
    imgs: ['1568849676085-51415703900f', '1501147830916-ce44a6359892'],
    s: { frame: 'Trinx alloy, 24" × 406 mm, women’s frame', fork: 'Hi-Ten steel', crank: 'Hi-Ten steel chainwheel 32T × 165 mm', cassette: 'Steel 16T, single speed', chain: 'M410 single speed', brakes: 'Steel caliper', wheels: 'Trinx alloy rims, Hi-Ten steel hubs', tires: 'CST 24 × 1-3/8"', saddle: 'Trinx Comfort' } },
  // ---------- Kids ----------
  { name: 'Red Elf 3.0', cat: 'Kids', did: 2174, sizes: ['18"'], colors: null,
    over: 'Kids’ 18" bike with a Hi-Ten steel frame, single-speed drivetrain and caliper brake.',
    imgs: ['1568849676085-51415703900f', '1508507282632-7ae0a31b8f62'],
    s: { frame: 'Trinx Hi-Ten steel, 18" × 230 mm', fork: '18" Hi-Ten steel', crank: 'Trinx 32T × 127 mm', cassette: '16T, single speed', chain: 'M410 single speed', brakes: 'Steel caliper', wheels: 'Trinx alloy rims, steel hubs', tires: '18 × 2.125" rubber', saddle: 'Trinx' } },
  { name: 'Blue Elf 3.0', cat: 'Kids', did: 2173, sizes: ['18"'], colors: null,
    over: 'Kids’ 18" bike with a Hi-Ten steel frame, single-speed drivetrain and caliper brake.',
    imgs: ['1508507282632-7ae0a31b8f62', '1559348349-86f1f65817fe'],
    s: { frame: 'Trinx Hi-Ten steel, 18" × 230 mm', fork: '18" Hi-Ten steel', crank: 'Trinx 32T × 127 mm', cassette: '16T, single speed', chain: 'M410 single speed', brakes: 'Steel caliper', wheels: 'Alloy rims, Trinx Hi-Ten steel hubs', tires: '18 × 2.125" rubber', saddle: 'Trinx' } },
  { name: 'Junior 4.0', cat: 'Kids', did: 1995, sizes: ['20"'], colors: S('Black/Gray Red', 'Gray/Blue White', 'Yellow/Orange', 'Orange/Yellow White'),
    over: 'Kids’ 20" bike with a light alloy frame, small-travel suspension fork, 7-speed gearing and mechanical disc brakes.',
    imgs: ['1508507282632-7ae0a31b8f62', '1505705694340-019e1e335916'],
    s: { frame: 'Trinx alloy, 20" × 280 mm', fork: 'Imitation alloy shoulder suspension, 30 mm travel', shifter: 'Ltwoo A2', frontDerailleur: 'Trinx FD-QD-35', rearDerailleur: 'Shimano RD-TY21-B', crank: 'Trinx 40T × 152 mm', cassette: '14–28T, 7-speed', chain: 'M30 7-speed', brakes: 'Trinx alloy mechanical disc', wheels: 'Trinx alloy double-deck rims, steel disc hubs', tires: '20 × 2.125" rubber', saddle: 'Trinx' } },
];

// Real Nu. prices from the shop owner (bikes not listed stay null = "Price on request")
const PRICES = { 'X9 Pro': 85000, 'X5 Pro': 48000, 'K036 Elite (Striker)': 120000, 'Tempo 1.0': 25000, 'Tempo 2.1': 38000, 'TDO 900': 30000, 'GTR 2.0': 55000 };
const slug = (s) => s.toLowerCase().replace(/[’"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const body = bikes.map((b, i) => `  {
    id: ${i + 1},
    name: ${JSON.stringify(b.name)},
    slug: ${JSON.stringify(slug(b.name))},
    category: ${JSON.stringify(b.cat)},
    price: { nu: ${PRICES[b.name] ?? null} },
    specs: ${JSON.stringify({ frame: null, fork: null, shifter: null, frontDerailleur: null, rearDerailleur: null, crank: null, cassette: null, chain: null, brakes: null, wheels: null, tires: null, saddle: null, weight: null, ...b.s })},
    colors: ${JSON.stringify(b.colors)},
    inStock: true,
    sizes: ${JSON.stringify(b.sizes)},
    overview: ${JSON.stringify(b.over)},
    sourceUrl: ${JSON.stringify(base + b.did)},
    images: ${JSON.stringify(b.imgs)},
  }`).join(',\n');

writeFileSync(new URL('../src/data/bikes.ts', import.meta.url), `// Trinx bikes shown on /bikes and /bikes/[slug].
// SPECS are the real Trinx specifications from the official site (trinx.com), taken 14 Oct 2026 — see each bike's sourceUrl.
// The official site lists NO PRICES or WEIGHTS: price.nu is null ("Price on request") until you enter your Nu. prices.
// inStock is a placeholder (all true) until it comes from your stock system.
// Photos are illustrative stock images (not the exact model) — swap in real product photos when ready.
// Regenerate with: node scripts/gen-bikes.mjs   (or edit this file directly once you add prices).

export const bikeCategoryList = [
  { name: 'Mountain', slug: 'mountain', label: 'Mountain bikes' },
  { name: 'Road', slug: 'road', label: 'Road bikes' },
  { name: 'Gravel', slug: 'gravel', label: 'Gravel bikes' },
  { name: 'City', slug: 'city', label: 'City bikes' },
  { name: 'Kids', slug: 'kids', label: "Kids' bikes" },
] as const;
export type BikeCategory = (typeof bikeCategoryList)[number]['name'];

export function categoryFromSlug(slug?: string | null): BikeCategory | undefined {
  if (!slug) return undefined;
  return bikeCategoryList.find((c) => c.slug === slug)?.name;
}

export type BikeSpecs = {
  frame: string | null; fork: string | null; shifter: string | null; frontDerailleur: string | null; rearDerailleur: string | null;
  crank: string | null; cassette: string | null; chain: string | null; brakes: string | null; wheels: string | null;
  tires: string | null; saddle: string | null; weight: string | null;
};
export type BikeColor = { name: string; swatch: string[] };

export interface Bike {
  id: number;
  name: string;
  slug: string;
  category: BikeCategory;
  price: { nu: number | null }; // null = price on request
  specs: BikeSpecs;
  colors: BikeColor[] | null;
  inStock: boolean;
  sizes: string[] | null;
  overview: string;
  sourceUrl: string;
  images: string[]; // photo ids in src/assets/photos
}

export const bikes: Bike[] = [
${body},
];

export const getBike = (slug: string) => bikes.find((b) => b.slug === slug);
`);
console.log('bikes.ts written:', bikes.length);
