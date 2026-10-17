// Team members (placeholder people — replace names, roles and add photos when ready).
// `photo` is optional: when empty, cards show a monogram tile in the site style.

export type TeamMember = {
  slug: string;
  name: string;
  firstName: string;
  role: string;
  short: string; // one or two lines for cards
  tone: "black" | "orange" | "grey"; // monogram tile colour
  photo?: string; // Unsplash id or future /public path
};

export const team: TeamMember[] = [
  {
    slug: "ugen-tenzin",
    name: "Ugen Tenzin",
    firstName: "Ugen",
    role: "Founder & CEO",
    short: "Off-road blogger and YouTuber who founded Gangjung Traders to put more riders on the trails.",
    tone: "black",
    photo: "ugen tenzin",
  },
  {
    slug: "pema-choden",
    name: "Pema Choden",
    firstName: "Pema",
    role: "Head Mechanic",
    short: "Drivetrains, hydraulic brakes and suspension — if it clicks or squeaks, Pema fixes it.",
    tone: "orange",
  },
  {
    slug: "sonam-tenzin",
    name: "Sonam Tenzin",
    firstName: "Sonam",
    role: "Ride Leader & Guide",
    short: "Leads our Saturday group rides and makes sure nobody gets left behind.",
    tone: "grey",
  },
  {
    slug: "tashi-lhamo",
    name: "Tashi Lhamo",
    firstName: "Tashi",
    role: "Bike Fitter",
    short: "Saddle height, reach and comfort — Tashi makes sure your bike fits you, not the other way round.",
    tone: "black",
  },
  {
    slug: "dechen-yangzom",
    name: "Dechen Yangzom",
    firstName: "Dechen",
    role: "Store Manager",
    short: "Keeps the shop running, the shelves stocked and every order on track.",
    tone: "orange",
  },
  {
    slug: "ugyen-norbu",
    name: "Ugyen Norbu",
    firstName: "Ugyen",
    role: "Sales & Product Specialist",
    short: "Our go-to for choosing between models, sizes and finding the right bike for your commute.",
    tone: "grey",
  },
];

export const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
