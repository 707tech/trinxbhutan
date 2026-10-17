import { url } from '../utils/url';
// Everything the Shop page lists: Trinx bikes (bikes.ts) + parts & gear (shop.ts) in one item shape.
import { bikeCategoryList, bikes, type Bike } from './bikes';
import { discountPercent, effectivePrice, isInStock, isOnSale, productSlug, shopCategories, shopProducts, type ShopProduct } from './shop';

export type ShopItem = {
  key: string;
  kind: 'bike' | 'product';
  name: string;
  href: string;
  category: string;
  brand: string;
  price: number;
  onRequest: boolean; // no published price: shown as "Price on request"
  priceMax?: number;
  oldPrice?: number;
  discount: number;
  onSale: boolean;
  inStock: boolean;
  featured: boolean;
  popularity: number;
  order: number;
  badge?: 'New' | 'Sale' | 'Sold';
  images: string[];
  colors: string[]; // CSS backgrounds for the swatch dots
  colorNames: string[]; // filter families
  sizes: string[];
  bike?: Bike;
  product?: ShopProduct;
};

export const bikeShopCategory = (c: string) => `${c} Bikes`;

const colorHex: Record<string, string> = {
  Black: '#111111', White: '#f5f5f5', Grey: '#9ca3af', Orange: '#ff4e00', Red: '#dc2626', Blue: '#2563eb', Green: '#16a34a',
};
const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const families = Object.entries(colorHex).map(([name, hex]) => ({ name, rgb: rgb(hex) }));
const family = (hex: string) => {
  const c = rgb(hex);
  return families.reduce((a, f) => (f.rgb.reduce((d, v, i) => d + (v - c[i]) ** 2, 0) < a.rgb.reduce((d, v, i) => d + (v - c[i]) ** 2, 0) ? f : a)).name;
};
export const dot = (swatch: string[]) => (swatch[1] ? `linear-gradient(to bottom, ${swatch[0]} 50%, ${swatch[1]} 50%)` : swatch[0]);

const fromBike = (b: Bike, i: number): ShopItem => ({
  key: `trinx-${b.id}`, kind: 'bike', name: `Trinx ${b.name}`, href: url(`/bikes/${b.slug}`), category: bikeShopCategory(b.category), brand: 'Trinx',
  price: b.price.nu ?? 0, onRequest: b.price.nu === null, discount: 0, onSale: false, inStock: b.inStock, featured: false, popularity: 0, order: 1000 + i, images: b.images,
  colors: (b.colors ?? []).map((c) => dot(c.swatch)),
  colorNames: [...new Set((b.colors ?? []).flatMap((c) => c.swatch).map(family))],
  sizes: [...new Set((b.sizes ?? []).map((s) => s.split(' ')[0]))].filter((s) => ['S', 'M', 'L', 'XL'].includes(s)),
  bike: b,
});

const fromProduct = (p: ShopProduct): ShopItem => ({
  key: `shop-${p.id}`, kind: 'product', name: p.name, href: url(`/shop/${productSlug(p)}`), category: p.category, brand: p.brand,
  price: effectivePrice(p), onRequest: false, priceMax: p.priceMax, oldPrice: isOnSale(p) ? p.price : undefined, discount: discountPercent(p), onSale: isOnSale(p),
  inStock: isInStock(p), featured: !!p.featured, popularity: p.popularity, order: p.id, badge: p.badge, images: p.images,
  colors: p.colors.map((c) => colorHex[c]), colorNames: [...p.colors], sizes: [...p.sizes], product: p,
});

export const shopItems: ShopItem[] = [...bikes.map(fromBike), ...shopProducts.map(fromProduct)];
export const shopPriceMax = Math.ceil(Math.max(...shopItems.filter((i) => !i.onRequest).map((i) => i.priceMax ?? i.price)) / 1000) * 1000;
export const filterBrands = ['Trinx', 'Gangjung Gear'];
export const filterCategories: string[] = ['Featured', ...bikeCategoryList.map((c) => bikeShopCategory(c.name)), ...shopCategories.filter((c) => c !== 'Featured')];
export const filterColors = Object.keys(colorHex);
export const filterColorHex = colorHex;
