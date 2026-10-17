// Bike servicing content. PRICES ARE PLACEHOLDERS — set your real prices before going live.

export type ServicePackage = {
  slug: string;
  name: string;
  price: number; // Nu., labour only
  time: string;
  summary: string;
  includes: string[];
  popular?: boolean;
};

export const servicePackages: ServicePackage[] = [
  {
    slug: "safety-check",
    name: "Safety Check",
    price: 500,
    time: "About 30 min",
    summary: "A quick once-over before a big ride or after a knock.",
    includes: ["Brake check & adjustment", "Gear adjustment", "Tyre pressure & condition", "Bolt torque check", "Quick test ride"],
  },
  {
    slug: "tune-up",
    name: "Standard Tune-Up",
    price: 1500,
    time: "Same day",
    summary: "Our most popular service — keeps a well-used bike running smoothly.",
    includes: ["Everything in Safety Check", "Drivetrain clean & lube", "Wheel truing", "Headset & bottom bracket check", "Cable tension & frame clean"],
    popular: true,
  },
  {
    slug: "full-service",
    name: "Full Service",
    price: 3500,
    time: "1–2 days",
    summary: "A complete strip-down and rebuild for bikes that work hard.",
    includes: ["Everything in Tune-Up", "Full drivetrain degrease", "Hub, headset & BB bearing service", "New cables & housing fitted*", "Brake pads & rotors inspected"],
  },
  {
    slug: "kids-bike-check",
    name: "Kids Bike Check",
    price: 400,
    time: "About 30 min",
    summary: "A safety check and adjustment so a growing rider stays comfortable.",
    includes: ["Saddle & bar height adjustment", "Brake check", "Chain lube", "Tyre pressure", "Training-wheel fit or removal"],
  },
];

export const repairPrices: { item: string; price: string }[] = [
  { item: "Puncture repair", price: "Nu. 200" },
  { item: "Tube or tyre fitting", price: "Nu. 150 + parts" },
  { item: "Brake pad fitting (per wheel)", price: "Nu. 300" },
  { item: "Hydraulic brake bleed (per brake)", price: "Nu. 800" },
  { item: "Gear indexing", price: "Nu. 300" },
  { item: "Wheel truing", price: "Nu. 400" },
  { item: "Chain replacement", price: "Nu. 250 + parts" },
  { item: "Suspension fork lower service", price: "Nu. 1,800" },
  { item: "Bike fit (free with every new bike)", price: "Nu. 1,000" },
];

export const serviceSteps = [
  { title: "Book", text: "Choose a service and centre below, or message us on WhatsApp." },
  { title: "Drop off", text: "Bring your bike in at your booked time. We check it with you." },
  { title: "Quote & fix", text: "We confirm the price before any extra work, then get to it." },
  { title: "Ride away", text: "Collect a clean, tuned bike — usually the same day." },
];
