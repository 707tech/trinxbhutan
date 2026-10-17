// Bike Finder quiz: questions, answers and the matching logic that ranks the Trinx bikes for a rider.
import type { BikeCategory } from "./bikes";
import type { ShopSize } from "./shop";

export type Ride = "road" | "mountain" | "gravel" | "city";
export type Height = "xs" | "s" | "m" | "l" | "xl";
export type Budget = "under-100" | "100-200" | "200-400" | "over-400" | "any";

export type Answers = { ride: Ride; height: Height; budget: Budget };

type Option<T> = { value: T; label: string; hint: string };

export const rideOptions: (Option<Ride> & { category: BikeCategory })[] = [
  { value: "road", label: "Road & tarmac", hint: "Fast rides and long climbs like Dochula", category: "Road" },
  { value: "mountain", label: "Mountain trails", hint: "Singletrack, rocks and steep descents", category: "Mountain" },
  { value: "gravel", label: "Gravel & touring", hint: "Farm roads, valleys and multi-day trips", category: "Gravel" },
  { value: "city", label: "Town & commuting", hint: "Daily rides around Thimphu or Paro", category: "City" },
];

export const heightOptions: (Option<Height> & { size: ShopSize })[] = [
  { value: "xs", label: "Under 160 cm", hint: "Under 5′3″", size: "S" },
  { value: "s", label: "160 – 170 cm", hint: "5′3″ – 5′7″", size: "M" },
  { value: "m", label: "170 – 180 cm", hint: "5′7″ – 5′11″", size: "L" },
  { value: "l", label: "180 – 190 cm", hint: "5′11″ – 6′3″", size: "XL" },
  { value: "xl", label: "Over 190 cm", hint: "Over 6′3″", size: "XL" },
];

// Ranges follow the Trinx prices in Nu. (about 11,000 to 59,000)
export const budgetOptions: (Option<Budget> & { range: [number, number] })[] = [
  { value: "under-100", label: "Under Nu. 25,000", hint: "Great first bikes", range: [0, 25000] },
  { value: "100-200", label: "Nu. 25,000 – 35,000", hint: "Most popular range", range: [25000, 35000] },
  { value: "200-400", label: "Nu. 35,000 – 50,000", hint: "Lighter, better parts", range: [35000, 50000] },
  { value: "over-400", label: "Over Nu. 50,000", hint: "Top spec models", range: [50000, Infinity] },
  { value: "any", label: "No fixed budget", hint: "Show me the best fit", range: [0, Infinity] },
];

export type Match = {
  bike: Bike;
  score: number;
  rideMatch: boolean;
  sizeMatch: boolean | null; // null = numbered frame sizes (road bikes) — fit needs a quick check with us
  inBudget: boolean;
  overBy: number; // Nu. over the top of the budget (0 when within)
};

