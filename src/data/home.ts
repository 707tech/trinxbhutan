import { url } from '../utils/url';
// Homepage content + navigation. Photo values are ids of files in src/assets/photos.
import { shopItems, type ShopItem } from './catalogue';
import { bikeCategoryList, bikes } from './bikes';

type NavLink = { label: string; href: string };
export type NavItem = { label: string; menuOnly?: boolean } & ({ href: string; children?: NavLink[] } | { href?: undefined; children: NavLink[] });

export const homeNav: NavItem[] = [
  { label: 'Home', href: url('/') },
  { label: 'About', href: url('/about'), children: [{ label: 'About Us', href: url('/about') }, { label: 'Our Team', href: url('/team') }, { label: 'FAQ', href: url('/faq') }, { label: 'Terms & Conditions', href: url('/terms') }] },
  { label: 'Shop', href: url('/shop') },
  { label: 'Bikes', children: [{ label: 'Bikes', href: url('/bikes') }, { label: 'Bike Finder', href: url('/bike-finder') }] },
  { label: 'Servicing', href: url('/service') },
  { label: 'Vlogs', href: url('/vlogs') },
  { label: 'Contact', href: url('/contact') },
];

export type CategoryTile = { eyebrow: string; title: [string, string]; image: string; theme: 'grey' | 'orange' | 'black' | 'photo'; href: string; cta?: string };
export const categoryTiles: CategoryTile[] = [
  { eyebrow: 'All bike types', title: ['Our', 'Bikes'], image: '1532298229144-0ec0c57515c7', theme: 'grey', href: url('/bikes') },
  { eyebrow: 'Workshop', title: ['Bike', 'Servicing'], image: '1687203627800-da3fb4db92eb', theme: 'orange', href: url('/service'), cta: 'Book a Service' },
  { eyebrow: 'Protection', title: ['Helmets', '& Gear'], image: '1603903824200-2c6927fd4b03', theme: 'black', href: url('/shop?category=Helmets') },
  { eyebrow: 'Components', title: ['Bike', 'Parts'], image: '1684166472907-e17eec7e9475', theme: 'photo', href: url('/shop') },
];

export const bikeTypeCards: { slug: string; tagline: string; image?: string; imageAlt?: string }[] = [
  { slug: 'mountain', tagline: 'Trail · Hardtail · Cross-country', image: '1508789454646-bef72439f197', imageAlt: 'Mountain biker looking out over alpine peaks' },
  { slug: 'road', tagline: 'Tarmac · Endurance · Fitness', image: '1471506480208-91b3a4cc78be', imageAlt: 'Cyclist riding a winding mountain road' },
  { slug: 'gravel', tagline: 'Gravel · Adventure · Touring', image: '1576435728678-68d0fbf94e91', imageAlt: 'Gravel bike leaning on a wooden wall' },
  { slug: 'city', tagline: 'Commute · Fitness · Touring', image: '1559348349-86f1f65817fe', imageAlt: 'City bike against a concrete wall' },
  { slug: 'kids', tagline: 'First bikes · Ages 4–9' },
];

export const productFilters = ['All', 'Bikes', 'Headsets', 'Clothing'] as const;

const byKey = (k: string) => {
  const i = shopItems.find((s) => s.key === k);
  if (!i) throw new Error(`Homepage item ${k} missing`);
  return i;
};
export const exploreProducts: ShopItem[] = ['shop-20', 'trinx-1', 'shop-38', 'trinx-4', 'shop-44', 'trinx-10', 'shop-39', 'trinx-7'].map(byKey);
export const saleProducts: ShopItem[] = ['shop-35', 'shop-18', 'shop-15', 'shop-28'].map(byKey);

/** When the "On Sale" deals close (Bhutan time, UTC+6). Change this to run a new sale. */
export const SALE_ENDS_AT = '2026-12-31T23:59:59+06:00';

export const typeStats = bikeCategoryList.map((c) => {
  const list = bikes.filter((b) => b.category === c.name);
  const inStock = list.filter((b) => b.inStock);
  const prices = (inStock.length ? inStock : list).map((b) => b.price.nu).filter((p) => p !== null);
  return { slug: c.slug, name: c.name, label: c.label, count: list.length, from: prices.length ? Math.min(...(prices as number[])) : null };
});

export const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  { title: "Explore", links: [{ label: "Bikes", href: url("/bikes") }, { label: "Bike Finder", href: url("/bike-finder") }, { label: "Shop", href: url("/shop") }, { label: "Servicing", href: url("/service") }, { label: "Vlogs", href: url("/vlogs") }] },
  { title: "Company", links: [{ label: "About Us", href: url("/about") }, { label: "Our Team", href: url("/team") }, { label: "FAQ", href: url("/faq") }, { label: "Terms & Conditions", href: url("/terms") }, { label: "Contact", href: url("/contact") }] },
];
