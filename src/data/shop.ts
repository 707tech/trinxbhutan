// Parts & gear catalogue for the Shop page — SAMPLE products (replace with your real stock; prices in Nu.).
// Bikes are the Trinx bikes in bikes.ts; catalogue.ts combines both for the Shop page.
// Images are Unsplash photo ids (see unsplash() in lib/format.ts), all checked for third-party logos.

export const shopCategories = [
  "Featured",
  // Parts & gear
  "Bundle",
  "Brakes",
  "Chain",
  "Frames",
  "Grips",
  "Helmets",
  "Lights",
  "Mirror",
  "Forks",
  "Saddle",
  "Headsets",
  "Clothing",
  "Headwear",
] as const;

// "Featured" is a flag on products, every other entry is a real category
export type ShopCategory = Exclude<(typeof shopCategories)[number], "Featured">;

export const shopBrands = ["Trinx", "Gangjung Gear"] as const;
export type ShopBrand = (typeof shopBrands)[number];

export const shopColors = {
  Black: "#111111",
  White: "#f5f5f5",
  Grey: "#9ca3af",
  Orange: "#ff4e00",
  Red: "#dc2626",
  Blue: "#2563eb",
  Green: "#16a34a",
} as const;
export type ShopColor = keyof typeof shopColors;

export const shopSizes = ["S", "M", "L", "XL"] as const;
export type ShopSize = (typeof shopSizes)[number];

export type ShopProduct = {
  id: number;
  name: string;
  brand: ShopBrand;
  category: ShopCategory;
  price: number; // regular price, or the low end of a range
  salePrice?: number; // discounted price (shown with the regular price struck through)
  priceMax?: number; // set for variable products: shown as "price – priceMax"
  colors: ShopColor[];
  sizes: ShopSize[];
  badge?: "New" | "Sale" | "Sold";
  featured?: boolean;
  rating: number; // 0–5, for "Average rating" sorting
  popularity: number; // sales count, for "Popularity" sorting
  images: [string, string];
};

// Checked Unsplash photos, named so the catalogue below stays readable
const img = {
  mtbOrange: "1563990308267-cd6d3cc09318",
  mtbRed: "1575585269294-7d28dd912db8",
  mtbTire: "1572111504021-40abd3479ddb",
  mtbFork: "1636925281365-f82e35b7e1c7",
  roadBlack: "1532298229144-0ec0c57515c7",
  roadWhite: "1485965120184-e220f721d03e",
  roadStudio: "1593764592116-bfb2a97c642a",
  citySilver: "1571068316344-75bc76f77890",
  concrete: "1559348349-86f1f65817fe",
  blueWall: "1505705694340-019e1e335916",
  gravelWood: "1576435728678-68d0fbf94e91",
  gravelSunset: "1511994298241-608e28f14fde",
  cruiser: "1568849676085-51415703900f",
  commuter: "1501147830916-ce44a6359892",
  mountainRider: "1508789454646-bef72439f197",
  brakeDisc: "1694112406588-1ecfda4be1f5",
  brakeRed: "1648817709811-89f2d7e29657",
  forkCrown: "1690959129501-f60b82470421",
  chain: "1684166472907-e17eec7e9475",
  drivetrain: "1687203627800-da3fb4db92eb",
  saddle: "1722546487377-abae21517fe6",
  rearWheel: "1547259716-4e1f05819447",
  fender: "1516686491778-e8842063c23c",
  grips: "1637204886241-706d3dfd7c17",
  lights: "1706709688062-0be03fa7863b",
  handlebarSunset: "1475666675596-cca2035b3d79",
  helmet: "1603903824200-2c6927fd4b03",
  ridersHelmets: "1541625602330-2277a4c46182",
  tee: "1521572163474-6864f9cf17ab",
  sweat: "1620799140408-edc6dcb6d633",
  shoe: "1491553895911-0055eca6402d",
  capGrey: "1521369909029-2afed882baee",
  capCream: "1758179770377-dba261ebea4c",
};

const ALL: ShopSize[] = ["S", "M", "L", "XL"];

export const shopProducts: ShopProduct[] = [

  // Frames, forks & headsets
  { id: 14, name: "Carbon Aero Frame", brand: "Gangjung Gear", category: "Frames", price: 52000, colors: ["Black"], sizes: ALL, rating: 4.8, popularity: 70, images: [img.roadStudio, img.roadBlack] },
  { id: 15, name: "Alloy Trail Frame", brand: "Gangjung Gear", category: "Frames", price: 28000, salePrice: 23500, colors: ["Grey", "Red"], sizes: ["M", "L", "XL"], badge: "Sale", rating: 4.2, popularity: 60, images: [img.roadWhite, img.mtbRed] },
  { id: 16, name: "Steel Classic Frame", brand: "Gangjung Gear", category: "Frames", price: 19500, colors: ["Blue", "White"], sizes: ["S", "M", "L"], badge: "Sold", rating: 4.0, popularity: 45, images: [img.citySilver, img.blueWall] },
  { id: 17, name: "Air 140 Trail Fork", brand: "Gangjung Gear", category: "Forks", price: 38500, colors: ["Black", "Orange"], sizes: [], featured: true, rating: 4.7, popularity: 130, images: [img.mtbFork, img.forkCrown] },
  { id: 18, name: "Coil 100 XC Fork", brand: "Gangjung Gear", category: "Forks", price: 14500, salePrice: 11900, colors: ["Black"], sizes: [], badge: "Sale", rating: 4.1, popularity: 98, images: [img.forkCrown, img.brakeRed] },
  { id: 19, name: "Rigid Carbon Fork", brand: "Gangjung Gear", category: "Forks", price: 9800, colors: ["Black", "White"], sizes: [], rating: 4.3, popularity: 52, images: [img.brakeRed, img.mtbFork] },
  { id: 20, name: "Apex Headset Kit", brand: "Gangjung Gear", category: "Headsets", price: 6800, colors: ["Black", "Grey"], sizes: [], badge: "New", rating: 4.5, popularity: 88, images: [img.forkCrown, img.mtbFork] },
  { id: 21, name: "Tapered Headset Pro", brand: "Gangjung Gear", category: "Headsets", price: 4200, priceMax: 7400, colors: ["Black", "Red", "Blue"], sizes: [], rating: 4.2, popularity: 64, images: [img.mtbFork, img.forkCrown] },

  // Brakes, chain & drivetrain
  { id: 22, name: "Quad Piston Disc Set", brand: "Gangjung Gear", category: "Brakes", price: 16500, colors: ["Black", "Red"], sizes: [], featured: true, rating: 4.8, popularity: 155, images: [img.brakeRed, img.brakeDisc] },
  { id: 23, name: "Road Disc Caliper", brand: "Gangjung Gear", category: "Brakes", price: 7200, salePrice: 5900, colors: ["Black", "Grey"], sizes: [], badge: "Sale", rating: 4.3, popularity: 112, images: [img.brakeDisc, img.brakeRed] },
  { id: 24, name: "V-Brake Commuter Kit", brand: "Gangjung Gear", category: "Brakes", price: 1800, colors: ["Grey"], sizes: [], badge: "Sold", rating: 3.9, popularity: 140, images: [img.rearWheel, img.brakeDisc] },
  { id: 25, name: "11-Speed Chain", brand: "Gangjung Gear", category: "Chain", price: 2600, colors: ["Grey", "Black"], sizes: [], rating: 4.4, popularity: 300, images: [img.chain, img.drivetrain] },
  { id: 26, name: "12-Speed Gold Chain", brand: "Gangjung Gear", category: "Chain", price: 4900, colors: ["Orange", "Grey"], sizes: [], badge: "New", rating: 4.6, popularity: 160, images: [img.drivetrain, img.chain] },

  // Saddles, grips, lights & mirrors
  { id: 27, name: "Trail Comfort Saddle", brand: "Gangjung Gear", category: "Saddle", price: 3800, colors: ["Black"], sizes: [], rating: 4.2, popularity: 125, images: [img.saddle, img.rearWheel] },
  { id: 28, name: "Race Carbon Saddle", brand: "Gangjung Gear", category: "Saddle", price: 9600, salePrice: 7900, colors: ["Black", "White"], sizes: [], badge: "Sale", rating: 4.5, popularity: 72, images: [img.saddle, img.roadStudio] },
  { id: 29, name: "Lock-On Trail Grips", brand: "Gangjung Gear", category: "Grips", price: 1400, colors: ["Black", "Orange", "Blue"], sizes: [], rating: 4.4, popularity: 210, images: [img.grips, img.handlebarSunset] },
  { id: 30, name: "Cork Touring Grips", brand: "Gangjung Gear", category: "Grips", price: 950, colors: ["Orange", "Grey"], sizes: [], badge: "Sold", rating: 4.0, popularity: 75, images: [img.handlebarSunset, img.grips] },
  { id: 31, name: "Beam 800 Front Light", brand: "Trinx", category: "Lights", price: 3500, colors: ["Black"], sizes: [], badge: "New", featured: true, rating: 4.7, popularity: 190, images: [img.lights, img.handlebarSunset] },
  { id: 32, name: "Glow Rear Light Set", brand: "Gangjung Gear", category: "Lights", price: 1200, priceMax: 2400, colors: ["Black", "Red"], sizes: [], rating: 4.3, popularity: 170, images: [img.handlebarSunset, img.lights] },
  { id: 33, name: "Bar-End Mirror", brand: "Gangjung Gear", category: "Mirror", price: 850, colors: ["Black"], sizes: [], badge: "Sold", rating: 3.8, popularity: 66, images: [img.grips, img.lights] },
  { id: 34, name: "Wide-View Helmet Mirror", brand: "Gangjung Gear", category: "Mirror", price: 1100, salePrice: 890, colors: ["Black", "Grey"], sizes: [], badge: "Sale", rating: 4.0, popularity: 48, images: [img.lights, img.helmet] },

  // Helmets, clothing & headwear
  { id: 35, name: "Aero Shell Helmet", brand: "Trinx", category: "Helmets", price: 6500, salePrice: 4900, colors: ["Black", "Green"], sizes: ["S", "M", "L"], badge: "Sale", featured: true, rating: 4.6, popularity: 200, images: [img.helmet, img.ridersHelmets] },
  { id: 36, name: "Road Vent Helmet", brand: "Gangjung Gear", category: "Helmets", price: 5400, colors: ["White", "Black", "Red"], sizes: ["S", "M", "L"], rating: 4.4, popularity: 135, images: [img.ridersHelmets, img.helmet] },
  { id: 37, name: "Trail MIPS Helmet", brand: "Gangjung Gear", category: "Helmets", price: 7800, priceMax: 8900, colors: ["Black", "Orange"], sizes: ALL, badge: "New", rating: 4.7, popularity: 115, images: [img.helmet, img.mountainRider] },
  { id: 38, name: "Essential Ride Tee", brand: "Trinx", category: "Clothing", price: 1900, colors: ["White", "Black", "Orange"], sizes: ALL, badge: "New", rating: 4.3, popularity: 240, images: [img.tee, img.sweat] },
  { id: 39, name: "Thermal Crew Sweat", brand: "Gangjung Gear", category: "Clothing", price: 3200, salePrice: 2600, colors: ["White", "Grey"], sizes: ALL, badge: "Sale", rating: 4.5, popularity: 150, images: [img.sweat, img.tee] },
  { id: 40, name: "Clip Street Shoe", brand: "Gangjung Gear", category: "Clothing", price: 4800, colors: ["Black", "Grey"], sizes: ["M", "L", "XL"], rating: 4.1, popularity: 92, images: [img.shoe, img.tee] },
  { id: 41, name: "Club Ride Jersey", brand: "Gangjung Gear", category: "Clothing", price: 2800, colors: ["Red", "Blue"], sizes: ALL, badge: "Sold", rating: 4.4, popularity: 180, images: [img.ridersHelmets, img.sweat] },
  { id: 42, name: "Washed Ride Cap", brand: "Gangjung Gear", category: "Headwear", price: 900, colors: ["Grey", "Black"], sizes: ["M", "L"], rating: 4.2, popularity: 160, images: [img.capGrey, img.capCream] },
  { id: 43, name: "Summer Cotton Cap", brand: "Gangjung Gear", category: "Headwear", price: 750, salePrice: 590, colors: ["White"], sizes: ["S", "M"], badge: "Sale", rating: 4.0, popularity: 105, images: [img.capCream, img.capGrey] },

  // Bundles
  { id: 44, name: "Workshop Starter Bundle", brand: "Trinx", category: "Bundle", price: 8900, colors: ["Black"], sizes: [], featured: true, rating: 4.6, popularity: 82, images: [img.chain, img.drivetrain] },
  { id: 45, name: "Drivetrain Refresh Bundle", brand: "Gangjung Gear", category: "Bundle", price: 7400, priceMax: 12500, colors: ["Grey"], sizes: [], rating: 4.5, popularity: 58, images: [img.drivetrain, img.chain] },
];

/** URL slug for a product page, e.g. "Apex Headset Kit" -> "apex-headset-kit" */
export const productSlug = (p: Pick<ShopProduct, "name">) =>
  p.name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** The price a customer pays (sale price if on sale) — used for sorting and the price filter */
export const effectivePrice = (p: Pick<ShopProduct, "price" | "salePrice">) => p.salePrice ?? p.price;

/** Percent off the regular price (0 when not on sale) */
export const discountPercent = (p: Pick<ShopProduct, "price" | "salePrice">) =>
  p.salePrice === undefined ? 0 : Math.round((1 - p.salePrice / p.price) * 100);

export const isOnSale = (p: Pick<ShopProduct, "salePrice">) => p.salePrice !== undefined;
export const isInStock = (p: Pick<ShopProduct, "badge">) => p.badge !== "Sold";

export const sortOptions = [
  { value: "default", label: "Recommended" },
  { value: "popularity", label: "Most popular" },
  { value: "discount", label: "Biggest discount" },
  { value: "latest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;
export type SortOption = (typeof sortOptions)[number]["value"];

export const PRODUCTS_PER_PAGE = 12;
