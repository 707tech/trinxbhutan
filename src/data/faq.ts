// Frequently asked questions, grouped by topic. Answers are plain text (a blank line starts a new paragraph).

export type FaqGroup = { id: string; title: string; items: { q: string; a: string }[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "orders",
    title: "Orders & payment",
    items: [
      {
        q: "How do I place an order?",
        a: "Add the items you want to your cart, open the Cart page and tap “Enquire on WhatsApp”. Your full order — items, colours, sizes, quantities and total — is sent to us. We'll confirm availability and the final price, then explain how to pay. You can also use “Buy on WhatsApp” on any product page, call us or visit the shop.",
      },
      {
        q: "Can I pay online on the website?",
        a: "Not yet. To keep things simple and personal, we confirm every order with you first. Once confirmed, you can pay by bank transfer or mobile banking, or in person at the shop by cash or card.",
      },
      {
        q: "Are the prices on the website final?",
        a: "Prices are shown in Ngultrum (Nu.) and are kept up to date, but stock and supplier prices can change. We always confirm the final price with you before you pay.",
      },
      {
        q: "Can I reserve a bike?",
        a: "Yes. Message us on WhatsApp with the bike, size and colour. We can usually hold a bike for 48 hours while you arrange payment or a test ride.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery & collection",
    items: [
      {
        q: "Do you deliver outside Thimphu?",
        a: "Yes, we deliver across Bhutan. Bikes are fully assembled and tuned before they leave the workshop. Delivery time and cost depend on the dzongkhag — we'll confirm both when we confirm your order.",
      },
      {
        q: "Can I collect from the shop instead?",
        a: "Of course. Collection from our Norzin Lam shop in Thimphu is free, and it's the best way to get a bike fit and a quick walkthrough of your new bike.",
      },
    ],
  },
  {
    id: "bikes",
    title: "Bikes, sizing & test rides",
    items: [
      {
        q: "How do I know which size to buy?",
        a: "Size depends on your height, leg length and riding style. Every bike we sell includes a basic fit — saddle height, reach and bar position. If you're buying for delivery, send us your height and inside-leg measurement and we'll recommend a size.",
      },
      {
        q: "Can I test ride a bike?",
        a: "Yes — most bikes in stock can be test ridden at the shop. Bring a valid ID. For mountain bikes, ask Ugyen to take you up a proper hill so you can feel the gearing and brakes.",
      },
      {
        q: "Which type of bike is right for me?",
        a: "It depends on where you'll ride. Message us with where and how you ride and we'll suggest options.",
      },
    ],
  },
  {
    id: "service",
    title: "Service & repairs",
    items: [
      {
        q: "Is the first service really free?",
        a: "Yes. Every new bike includes a free first service after about 300 km or two months, whichever comes first. New cables and brakes settle in, and we re-adjust everything so it keeps running smoothly.",
      },
      {
        q: "Do you repair bikes bought elsewhere?",
        a: "Absolutely. We service and repair all makes of bicycle. Small jobs like punctures and brake adjustments are often done the same day.",
      },
      {
        q: "How do I book a service?",
        a: "Message us on WhatsApp or call the shop with your bike and what it needs. We'll give you a drop-off time and an estimate before starting any work.",
      },
    ],
  },
  {
    id: "returns",
    title: "Returns & warranty",
    items: [
      {
        q: "Can I return or exchange an item?",
        a: "Unused clothing, helmets and accessories in their original packaging can be exchanged or returned within 30 days with proof of purchase. Bikes that have been ridden, or built to your size, can't be returned — but we'll always help put things right.",
      },
      {
        q: "What warranty do bikes come with?",
        a: "Frames and components carry the manufacturer's warranty against defects. Normal wear (tyres, brake pads, chains), crash damage and incorrect use aren't covered. If something goes wrong, bring the bike in and we'll handle the claim for you.",
      },
    ],
  },
];
