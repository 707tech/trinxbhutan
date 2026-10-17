// Builds the single product object that drives a product detail page.
// Shop products are parts & gear (Trek bikes have their own pages under /bikes); text is generated from the category.
import { url } from "../utils/url";
import { bikeCategoryList } from "./bikes";
import { productSlug, shopCategories, shopProducts, type ShopCategory, type ShopProduct } from "./shop";

export type ProductDetail = Omit<ShopProduct, "images"> & {
  slug: string;
  shortDesc: string;
  description: string[]; // paragraphs
  specs: { label: string; value: string }[];
  sku: string;
  categoryPath: string[]; // breadcrumb trail between "Shop" and the product
  tags: string[];
  images: string[]; // gallery (main + thumbnails)
  related: ShopProduct[];
};

type Group = "parts" | "gear";

const groupOf = (c: ShopCategory): Group =>
  ["Helmets", "Clothing", "Headwear"].includes(c) ? "gear" : "parts";

const groupLabel: Record<Group, string> = { parts: "Parts", gear: "Gear" };

// Template copy per product group
const copy: Record<Group, { short: string; description: string[] }> = {
  parts: {
    short: "A reliable upgrade or replacement part, checked for compatibility by our mechanics so it fits your bike the first time.",
    description: [
      "We stock parts we use on our own workshop bikes. Not sure it fits? Send us your bike model and we will confirm compatibility before you order.",
      "Fitting is available in store, usually same day for most components.",
    ],
  },
  gear: {
    short: "Riding gear made for changing mountain weather: breathable on the climb, protective on the way down, and comfortable all day.",
    description: [
      "Designed for real riding conditions with durable fabrics, sensible fits and reflective details for early mornings and late evenings.",
      "Unsure about sizing? Try it on in store or check our size guide; exchanges are free within 30 days.",
    ],
  },
};

// Deterministic pseudo values from the product id, so pages are stable between builds
const weightFor = (p: ShopProduct, g: Group) =>
  g === "gear" ? `${180 + (p.id % 5) * 60} g` : `${120 + (p.id % 9) * 85} g`;

function specsFor(p: ShopProduct, g: Group) {
  const color = p.colors.join(", ");
  if (g === "gear")
    return [
      { label: "Weight", value: weightFor(p, g) },
      { label: "Sizes", value: p.sizes.join(", ") || "One size" },
      { label: "Material", value: p.category === "Helmets" ? "In-mould EPS, polycarbonate shell" : "Recycled polyester blend" },
      { label: "Color", value: color },
    ];
  return [
    { label: "Weight", value: weightFor(p, g) },
    { label: "Material", value: p.price > 10000 ? "Alloy / carbon" : "Alloy" },
    { label: "Compatibility", value: "Most road, trail and city bikes — ask us to confirm" },
    { label: "Color", value: color },
  ];
}

// Gallery: the product's own photos first, then photos from similar products (up to 6)
function galleryFor(p: ShopProduct, g: Group) {
  const similar = shopProducts.filter((o) => o.id !== p.id && o.category === p.category).flatMap((o) => o.images);
  const sameGroup = shopProducts.filter((o) => o.id !== p.id && groupOf(o.category) === g).flatMap((o) => o.images);
  return [...new Set([...p.images, ...similar, ...sameGroup])].slice(0, 6);
}

// Related: same category first, then the same group
function relatedFor(p: ShopProduct, g: Group) {
  const others = shopProducts.filter((o) => o.id !== p.id);
  const sameCat = others.filter((o) => o.category === p.category);
  const sameGroup = others.filter((o) => o.category !== p.category && groupOf(o.category) === g);
  return [...sameCat, ...sameGroup].slice(0, 4);
}

export function getAllProductSlugs() {
  return shopProducts.map((p) => productSlug(p));
}

export function getProductDetail(slug: string): ProductDetail | undefined {
  const p = shopProducts.find((o) => productSlug(o) === slug);
  if (!p) return undefined;
  const g = groupOf(p.category);

  const generated: ProductDetail = {
    ...p,
    slug,
    shortDesc: copy[g].short,
    description: copy[g].description,
    specs: specsFor(p, g),
    sku: `GT-${p.category.slice(0, 3).toUpperCase()}-${String(p.id).padStart(3, "0")}`,
    categoryPath: [groupLabel[g], p.category],
    tags: [groupLabel[g], p.category],
    images: galleryFor(p, g),
    related: relatedFor(p, g),
  };

  return generated;
}

/** Link for a breadcrumb/meta value: bike categories open their tab on /bikes, other real categories filter the shop */
export const categoryHref = (name: string) => {
  const bikeCategory = bikeCategoryList.find((c) => `${c.name} Bikes` === name);
  return name === "Bikes"
    ? url("/bikes")
    : bikeCategory
      ? url(`/bikes?type=${bikeCategory.slug}`)
      : (shopCategories as readonly string[]).includes(name)
        ? url(`/shop?category=${encodeURIComponent(name)}`)
        : url("/shop");
};
