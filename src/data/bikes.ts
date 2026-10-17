// Trinx bikes shown on /bikes and /bikes/[slug].
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
  {
    id: 1,
    name: "X9 Pro",
    slug: "x9-pro",
    category: "Mountain",
    price: { nu: 85000 },
    specs: {"frame":"TRINX T800 carbon, 29\" × 15/17/19\", Boost","fork":"Magnesium air remote suspension, 100 mm travel, Boost","shifter":"Shimano SLX SL-M7100","frontDerailleur":null,"rearDerailleur":"Shimano SLX RD-M7100","crank":"Prowheel 36T × 175 mm","cassette":"CS-M9012, 11–50T, 12-speed","chain":"KMC 12-speed","brakes":"Shimano BR-MT200 hydraulic disc","wheels":"Trinx alloy double wall, Weinmann U32 rims, Formula alloy sealed-bearing Boost disc hubs","tires":"CST C-1747 29 × 2.25\" 160TPI","saddle":"SR Sport","weight":null},
    colors: null,
    inStock: true,
    sizes: ["S (15\")","M (17\")","L (19\")"],
    overview: "Carbon-frame 29\" hardtail with a Boost frame, 100 mm remote-lockout fork, Shimano SLX 12-speed drivetrain and hydraulic disc brakes.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2185",
    images: ["1575585269294-7d28dd912db8","1636925281365-f82e35b7e1c7","1572111504021-40abd3479ddb"],
  },
  {
    id: 2,
    name: "X5 Pro",
    slug: "x5-pro",
    category: "Mountain",
    price: { nu: 48000 },
    specs: {"frame":"Trinx alloy, 29\" × 15/17\", special-shaped tubes, hidden cables","fork":"Magnesium air remote suspension, 100 mm travel","shifter":"Shimano Deore SL-M4100","frontDerailleur":null,"rearDerailleur":"Shimano Deore RD-M4120","crank":"Alloy 36T × 175 mm","cassette":"11–42T, 10-speed","chain":"KMC 10-speed","brakes":"Shimano BR-MT200 hydraulic disc","wheels":"Trinx alloy double wall","tires":"Kenda 29 × 2.1\"","saddle":"Trinx Sport","weight":null},
    colors: null,
    inStock: true,
    sizes: ["S (15\")","M (17\")"],
    overview: "29\" alloy hardtail with hidden cable routing, a 100 mm remote-lockout air fork, Shimano Deore 10-speed gearing and hydraulic disc brakes.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2184",
    images: ["1508789454646-bef72439f197","1563990308267-cd6d3cc09318","1572111504021-40abd3479ddb"],
  },
  {
    id: 3,
    name: "K036 Elite (Striker)",
    slug: "k036-elite-striker",
    category: "Mountain",
    price: { nu: 120000 },
    specs: {"frame":"Trinx Hi-Ten steel, 27.5\" × 16/18/20\"","fork":"Suspension, 100 mm travel","shifter":"Ltwoo SL-V4008","frontDerailleur":"Ltwoo FD-V5008","rearDerailleur":"Ltwoo RD-V4008-L-2","crank":"24/34/42T × 170 mm","cassette":"13–32T, 8-speed","chain":"KMC 24-speed","brakes":"Alloy mechanical disc","wheels":"Trinx alloy double wall rims, disc hubs","tires":"Chaoyang 27.5 × 1.95\"","saddle":"Trinx Sport","weight":null},
    colors: [{"name":"Cyan/White Green","swatch":["#19b5c9","#f1f1f1"]},{"name":"Matte Black/White Red","swatch":["#161616","#f1f1f1"]},{"name":"Black/White Blue","swatch":["#161616","#f1f1f1"]}],
    inStock: true,
    sizes: ["S (16\")","M (18\")","L (20\")"],
    overview: "27.5\" hardtail with a 100 mm suspension fork, 24-speed gearing and mechanical disc brakes — an affordable trail starter.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2078",
    images: ["1544191696-102dbdaeeaa0","1575585269294-7d28dd912db8"],
  },
  {
    id: 4,
    name: "Tempo 1.0",
    slug: "tempo-1-0",
    category: "Road",
    price: { nu: 25000 },
    specs: {"frame":"Trinx alloy","fork":"Hi-Ten steel, 700C","shifter":"Shimano SL-A050","frontDerailleur":null,"rearDerailleur":"Shimano RD-TZ500","crank":"Trinx 28/38/48T × 170 mm","cassette":"14–28T, 7-speed","chain":"M30 7-speed","brakes":"Alloy side-pull brake","wheels":"Trinx double wall 700C rims, steel hubs","tires":"Chaoyang H-419 700 × 28C","saddle":"Trinx Sport","weight":null},
    colors: [{"name":"Black/Red","swatch":["#161616","#c8102e"]},{"name":"Black/Orange","swatch":["#161616","#ff6a13"]},{"name":"Black/Blue","swatch":["#161616","#1f4e9c"]},{"name":"Matte Grey/Cyan","swatch":["#8b9097","#19b5c9"]}],
    inStock: true,
    sizes: ["460 mm","500 mm","540 mm"],
    overview: "Entry-level 700C road bike with a light alloy frame, Shimano 21-speed drivetrain and 28c tyres.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2022",
    images: ["1532298229144-0ec0c57515c7","1541625602330-2277a4c46182","1534787238916-9ba6764efd4f"],
  },
  {
    id: 5,
    name: "Tempo 2.1",
    slug: "tempo-2-1",
    category: "Road",
    price: { nu: 38000 },
    specs: {"frame":"Trinx alloy","fork":"Hi-Ten steel, 700C","shifter":"Shimano ST-A070","frontDerailleur":null,"rearDerailleur":"Shimano RD-TZ500","crank":"Trinx 38/48T × 170 mm","cassette":"14–28T, 7-speed","chain":"M30 7-speed","brakes":"Repute alloy mechanical disc","wheels":"Trinx double wall 700C rims, double sealed-bearing hubs","tires":"Chaoyang H-419 700 × 28C","saddle":"Trinx Sport","weight":null},
    colors: [{"name":"Grey/Cyan","swatch":["#8b9097","#19b5c9"]},{"name":"Grey/Cyan Black","swatch":["#8b9097","#19b5c9"]},{"name":"Black/Orange","swatch":["#161616","#ff6a13"]},{"name":"Black/Red","swatch":["#161616","#c8102e"]}],
    inStock: true,
    sizes: ["460 mm","500 mm","540 mm"],
    overview: "700C road bike with brifter shifting, mechanical disc brakes and 28c tyres for confident braking in wet mountain weather.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2020",
    images: ["1485965120184-e220f721d03e","1593764592116-bfb2a97c642a"],
  },
  {
    id: 6,
    name: "TDO 900",
    slug: "tdo-900",
    category: "Road",
    price: { nu: 30000 },
    specs: {"frame":"Trinx carbon, 700C","fork":"Trinx carbon, 700C","shifter":"Shimano 105 ST-R7120","frontDerailleur":"Shimano 105 FD-R7100","rearDerailleur":"Shimano 105 RD-R7100","crank":"Shimano 105 FC-R7100","cassette":"Shimano 105 CS-R7100","chain":"Shimano CN-M7100","brakes":"Shimano 105 BR-R7170 disc","wheels":"Trinx carbon 700C wheelset","tires":"Grand Sport Race 700 × 28C","saddle":"Selle Italia SRX","weight":null},
    colors: [{"name":"White/Silver","swatch":["#f1f1f1","#c4c8cd"]},{"name":"Blue/White","swatch":["#1f4e9c","#f1f1f1"]}],
    inStock: true,
    sizes: ["450 mm","480 mm","510 mm","530 mm"],
    overview: "Carbon road bike with a full Shimano 105 12-speed disc-brake groupset, carbon wheelset and integrated carbon handlebar.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2190",
    images: ["1532298229144-0ec0c57515c7","1485965120184-e220f721d03e"],
  },
  {
    id: 7,
    name: "GTR 2.0",
    slug: "gtr-2-0",
    category: "Gravel",
    price: { nu: 55000 },
    specs: {"frame":"Trinx alloy, 700C × 480/520/540 mm, smooth welding","fork":"Carbon, 700C","shifter":"Shimano GRX","frontDerailleur":null,"rearDerailleur":"Shimano RD-RX812","crank":"Prowheel 40T × 170 mm","cassette":"CS-M9011, 11–42T, 11-speed","chain":"KMC X11","brakes":"Shimano BL-RX600 / BR-RX400","wheels":"Xero GRD 1200 rims","tires":"Maxxis 700 × 40C 60TPI","saddle":"SR Sport","weight":null},
    colors: [{"name":"Blue/Orange","swatch":["#1f4e9c","#ff6a13"]},{"name":"Matte Black/Red","swatch":["#161616","#c8102e"]},{"name":"Matte Blue/Grey","swatch":["#1f4e9c","#8b9097"]},{"name":"Grey/Red","swatch":["#8b9097","#c8102e"]}],
    inStock: true,
    sizes: ["480 mm","520 mm","540 mm"],
    overview: "Alloy gravel bike with a carbon fork, Shimano GRX 11-speed components and 40c Maxxis tyres for mixed surfaces.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2017",
    images: ["1576435728678-68d0fbf94e91","1511994298241-608e28f14fde"],
  },
  {
    id: 8,
    name: "Climber 2.3",
    slug: "climber-2-3",
    category: "Gravel",
    price: { nu: null },
    specs: {"frame":"Trinx alloy, 700C × 460/500/540 mm, smooth welding","fork":"Alloy, 700C","shifter":"Shimano Sora ST-R3000","frontDerailleur":"Shimano Sora FD-R3000","rearDerailleur":"Shimano Sora RD-R3000","crank":"Prowheel alloy 34/50T × 170 mm","cassette":"Sunshine CS-M3009, 11–32T, 9-speed","chain":"KMC Z9","brakes":"Alloy disc brake","wheels":"Trinx double wall 700C rims, alloy road sealed-bearing hubs","tires":"CST C-1894 700 × 38C","saddle":"SR Sport","weight":null},
    colors: [{"name":"Matte Brown/Orange","swatch":["#7a4b2a","#ff6a13"]},{"name":"Black/Blue","swatch":["#161616","#1f4e9c"]},{"name":"Grey/Blue","swatch":["#8b9097","#1f4e9c"]},{"name":"Blue/Yellow","swatch":["#1f4e9c","#f5c400"]}],
    inStock: true,
    sizes: ["460 mm","500 mm","540 mm"],
    overview: "Adventure road bike with Shimano Sora 9-speed shifting, disc brakes and wide 38c tyres.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2018",
    images: ["1576435728678-68d0fbf94e91","1471506480208-91b3a4cc78be"],
  },
  {
    id: 9,
    name: "Climber 2.1",
    slug: "climber-2-1",
    category: "Gravel",
    price: { nu: null },
    specs: {"frame":"Trinx alloy, smooth welding","fork":"Alloy, 700C","shifter":"Shimano Claris ST-R2000","frontDerailleur":null,"rearDerailleur":"Shimano Claris RD-R2000","crank":"Prowheel alloy 34/50T × 170 mm","cassette":"Sunshine CS-M3008, 11–32T, 8-speed","chain":"KMC Z8.1","brakes":"Alloy disc brake","wheels":"Trinx double wall 700C rims, alloy road sealed-bearing hubs","tires":"CST C-1894 700 × 38C","saddle":"SR Sport","weight":null},
    colors: [{"name":"Matte Brown/Orange","swatch":["#7a4b2a","#ff6a13"]},{"name":"Black/Blue","swatch":["#161616","#1f4e9c"]},{"name":"Grey/Blue","swatch":["#8b9097","#1f4e9c"]},{"name":"Blue/Yellow","swatch":["#1f4e9c","#f5c400"]}],
    inStock: true,
    sizes: ["460 mm","500 mm","540 mm"],
    overview: "Adventure road bike with Shimano Claris 8-speed shifting, disc brakes and wide 38c tyres.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2019",
    images: ["1511994298241-608e28f14fde","1576435728678-68d0fbf94e91"],
  },
  {
    id: 10,
    name: "Free 1.0",
    slug: "free-1-0",
    category: "City",
    price: { nu: null },
    specs: {"frame":"Trinx alloy, 700C × 470/510 mm","fork":"Hi-Ten steel, 700C","shifter":"Shimano ST-EF500-7","frontDerailleur":"Shimano FD-TY510","rearDerailleur":"Shimano RD-TY300","crank":"Chainwheel 28/38/48T × 170 mm","cassette":"14–28T, 7-speed","chain":"KMC 7-speed","brakes":"Alloy V-brake","wheels":"Trinx 700C CNC double alloy walls, quick-release steel hubs","tires":"CST 700 × 32C","saddle":"Trinx Sport","weight":null},
    colors: [{"name":"Black/Red","swatch":["#161616","#c8102e"]},{"name":"Silver/Blue","swatch":["#c4c8cd","#1f4e9c"]},{"name":"Matte Grey/Orange","swatch":["#8b9097","#ff6a13"]},{"name":"Blue/Yellow","swatch":["#1f4e9c","#f5c400"]}],
    inStock: true,
    sizes: ["470 mm","510 mm"],
    overview: "Flat-bar 700C fitness and city bike with 21-speed Shimano gearing, V-brakes and 32c tyres.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2024",
    images: ["1505705694340-019e1e335916","1571068316344-75bc76f77890"],
  },
  {
    id: 11,
    name: "Touring 1.0 (700C)",
    slug: "touring-1-0-700c",
    category: "City",
    price: { nu: null },
    specs: {"frame":"Trinx alloy, 700C × 406 mm, women’s frame","fork":"700C alloy shoulder-lock suspension","shifter":"Shimano ST-EF500","frontDerailleur":"Shimano FD-TY500","rearDerailleur":"Shimano RD-TX800","crank":"Prowheel 24/34/42T × 170 mm","cassette":"CS-M3008, 11–32T, 8-speed","chain":"KMC 8-speed","brakes":"Trinx alloy mechanical disc","wheels":"Trinx alloy 700C double wall, alloy disc hubs","tires":"CST C-1446 700 × 38C","saddle":"Trinx Comfort","weight":null},
    colors: [{"name":"Grey/Black","swatch":["#8b9097","#161616"]},{"name":"Black/White Orange","swatch":["#161616","#f1f1f1"]},{"name":"White/Blue","swatch":["#f1f1f1","#1f4e9c"]}],
    inStock: true,
    sizes: ["406 mm (women’s frame)"],
    overview: "Comfortable 700C touring and city bike with a shoulder-lock suspension fork, 24-speed gearing and mechanical disc brakes.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2101",
    images: ["1559348349-86f1f65817fe","1501147830916-ce44a6359892"],
  },
  {
    id: 12,
    name: "Cute 2.0",
    slug: "cute-2-0",
    category: "City",
    price: { nu: null },
    specs: {"frame":"Trinx alloy, 24\" × 406 mm, women’s frame","fork":"Hi-Ten steel","shifter":null,"frontDerailleur":null,"rearDerailleur":null,"crank":"Hi-Ten steel chainwheel 32T × 165 mm","cassette":"Steel 16T, single speed","chain":"M410 single speed","brakes":"Steel caliper","wheels":"Trinx alloy rims, Hi-Ten steel hubs","tires":"CST 24 × 1-3/8\"","saddle":"Trinx Comfort","weight":null},
    colors: [{"name":"Gray/Blue Purple Brown","swatch":["#8b9097","#1f4e9c"]},{"name":"Pink/Red Blue Purple","swatch":["#e85d9a","#c8102e"]},{"name":"Green/Blue White Green","swatch":["#1f8a5b","#1f4e9c"]},{"name":"Purple/Green Blue Red","swatch":["#7a3fb5","#1f8a5b"]}],
    inStock: true,
    sizes: ["24\" × 406 mm"],
    overview: "Simple 24\" single-speed city bike with a women’s frame and comfortable saddle for short everyday trips.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2102",
    images: ["1568849676085-51415703900f","1501147830916-ce44a6359892"],
  },
  {
    id: 13,
    name: "Red Elf 3.0",
    slug: "red-elf-3-0",
    category: "Kids",
    price: { nu: null },
    specs: {"frame":"Trinx Hi-Ten steel, 18\" × 230 mm","fork":"18\" Hi-Ten steel","shifter":null,"frontDerailleur":null,"rearDerailleur":null,"crank":"Trinx 32T × 127 mm","cassette":"16T, single speed","chain":"M410 single speed","brakes":"Steel caliper","wheels":"Trinx alloy rims, steel hubs","tires":"18 × 2.125\" rubber","saddle":"Trinx","weight":null},
    colors: null,
    inStock: true,
    sizes: ["18\""],
    overview: "Kids’ 18\" bike with a Hi-Ten steel frame, single-speed drivetrain and caliper brake.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2174",
    images: ["1568849676085-51415703900f","1508507282632-7ae0a31b8f62"],
  },
  {
    id: 14,
    name: "Blue Elf 3.0",
    slug: "blue-elf-3-0",
    category: "Kids",
    price: { nu: null },
    specs: {"frame":"Trinx Hi-Ten steel, 18\" × 230 mm","fork":"18\" Hi-Ten steel","shifter":null,"frontDerailleur":null,"rearDerailleur":null,"crank":"Trinx 32T × 127 mm","cassette":"16T, single speed","chain":"M410 single speed","brakes":"Steel caliper","wheels":"Alloy rims, Trinx Hi-Ten steel hubs","tires":"18 × 2.125\" rubber","saddle":"Trinx","weight":null},
    colors: null,
    inStock: true,
    sizes: ["18\""],
    overview: "Kids’ 18\" bike with a Hi-Ten steel frame, single-speed drivetrain and caliper brake.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=2173",
    images: ["1508507282632-7ae0a31b8f62","1559348349-86f1f65817fe"],
  },
  {
    id: 15,
    name: "Junior 4.0",
    slug: "junior-4-0",
    category: "Kids",
    price: { nu: null },
    specs: {"frame":"Trinx alloy, 20\" × 280 mm","fork":"Imitation alloy shoulder suspension, 30 mm travel","shifter":"Ltwoo A2","frontDerailleur":"Trinx FD-QD-35","rearDerailleur":"Shimano RD-TY21-B","crank":"Trinx 40T × 152 mm","cassette":"14–28T, 7-speed","chain":"M30 7-speed","brakes":"Trinx alloy mechanical disc","wheels":"Trinx alloy double-deck rims, steel disc hubs","tires":"20 × 2.125\" rubber","saddle":"Trinx","weight":null},
    colors: [{"name":"Black/Gray Red","swatch":["#161616","#8b9097"]},{"name":"Gray/Blue White","swatch":["#8b9097","#1f4e9c"]},{"name":"Yellow/Orange","swatch":["#f5c400","#ff6a13"]},{"name":"Orange/Yellow White","swatch":["#ff6a13","#f5c400"]}],
    inStock: true,
    sizes: ["20\""],
    overview: "Kids’ 20\" bike with a light alloy frame, small-travel suspension fork, 7-speed gearing and mechanical disc brakes.",
    sourceUrl: "http://www.trinx.com/index.php?ac=article&at=read&did=1995",
    images: ["1508507282632-7ae0a31b8f62","1505705694340-019e1e335916"],
  },
];

export const getBike = (slug: string) => bikes.find((b) => b.slug === slug);
