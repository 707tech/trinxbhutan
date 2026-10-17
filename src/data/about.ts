// Placeholder content for the About page. Images are Unsplash photo ids (see unsplash() in lib/format.ts).

export const aboutBanner = {
  title: "About Us",
  image: "1508789454646-bef72439f197",
};

export type IntroItem = {
  icon: "bike" | "chain" | "jersey";
  title: string;
  text: string;
};

export const aboutIntro: IntroItem[] = [
  {
    icon: "bike",
    title: "Our Vision",
    text: "A bike for every rider in the valleys and passes — and the know-how to keep it rolling for years.",
  },
  {
    icon: "chain",
    title: "What We Do",
    text: "We sell, fit and service Trinx mountain, road, gravel, city and kids' bikes, plus the parts and gear around them.",
  },
  {
    icon: "jersey",
    title: "Our History",
    text: "Started as a small repair bench in Thimphu, we have grown with a riding community that keeps getting bigger.",
  },
];

export const splitRows = {
  newest: {
    eyebrow: "Browse",
    title: ["The Newest", "Products"] as const,
    text: "Fresh frames, lighter wheels and riding gear built for long climbs and fast descents.",
    image: "1541625602330-2277a4c46182",
    imageAlt: "Two cyclists in helmets riding road bikes along the coast",
  },
  limited: {
    eyebrow: "Search",
    title: ["New Limited", "Edition"] as const,
    text: "Small-batch builds in colours you will not see on every street corner.",
    historyTitle: "Company History",
    historyText:
      "What began with one workbench and a box of spare tubes is now a full workshop and showroom. We still test every bike on local roads before it leaves the shop.",
    image: "1508507282632-7ae0a31b8f62",
    imageAlt: "BMX rider flipping backwards over a skatepark ramp",
  },
};

// Made-up partner marks (not real brands), rendered as monochrome text logos
export const partnerLogos: { name: string; mark: "circle" | "triangle" | "square" | "wave" | "diamond" | "bolt" | "ring" }[] = [
  { name: "Lungta", mark: "wave" },
  { name: "Kora Gear", mark: "circle" },
  { name: "Peak & Pine", mark: "triangle" },
  { name: "Norbu", mark: "diamond" },
  { name: "Haa Forge", mark: "square" },
  { name: "Drakpa", mark: "bolt" },
  { name: "Tashi Works", mark: "ring" },
];
