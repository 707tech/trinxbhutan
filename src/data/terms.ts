// Terms & Conditions content. PLACEHOLDER WORDING — have it reviewed for your business before going live.

export const termsUpdated = "2026-10-05";

export type TermsSection = { id: string; title: string; paragraphs: string[]; list?: string[] };

export const termsSections: TermsSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      "These terms apply to your use of the Gangjung Traders website and to any products or services you buy from us, online enquiry or in store. By using the website or placing an order, you agree to these terms.",
      "“We”, “us” and “our” mean Gangjung Traders, Norzin Lam, Thimphu, Bhutan. “You” means the person using the website or buying from us.",
    ],
  },
  {
    id: "website",
    title: "Using our website",
    paragraphs: [
      "You may browse the website and use it to enquire about and order products for your personal use. Please don't misuse the site, attempt to access it in ways we haven't intended, or copy its content for commercial purposes.",
      "We work hard to keep product details, photos and prices accurate, but occasional errors can happen. Product photos are for illustration and colours may vary slightly on screen.",
    ],
  },
  {
    id: "pricing",
    title: "Products & pricing",
    paragraphs: [
      "All prices are in Bhutanese Ngultrum (Nu.). Prices and availability can change without notice. We always confirm the final price and availability with you before you pay.",
      "If a product is listed at an obviously incorrect price, we're not obliged to sell it at that price, and we'll contact you before going ahead.",
    ],
  },
  {
    id: "orders",
    title: "Orders & enquiries",
    paragraphs: [
      "Sending an enquiry through the cart, a “Buy on WhatsApp” button, our contact form, phone or email is a request to buy — not a completed order. An order is confirmed only when we confirm it with you and payment has been arranged.",
      "We may decline an order, for example if a product is out of stock or a price was listed in error. If we've already received payment for an order we can't fulfil, we'll refund it in full.",
    ],
  },
  {
    id: "payment",
    title: "Payment",
    paragraphs: ["We'll tell you the accepted payment methods when we confirm your order. These currently include:"],
    list: ["Bank transfer or mobile banking", "Cash or card in store"],
  },
  {
    id: "delivery",
    title: "Delivery & collection",
    paragraphs: [
      "We deliver within Bhutan. Delivery cost and estimated timing are confirmed with your order. Delivery times are estimates and can be affected by weather, road conditions and other events outside our control.",
      "Please check your items when they arrive and tell us within 48 hours about any damage or missing parts. You're also welcome to collect your order from our Thimphu shop at no charge.",
    ],
  },
  {
    id: "returns",
    title: "Returns & exchanges",
    paragraphs: [
      "Unused clothing, helmets and accessories in their original packaging may be returned or exchanged within 30 days with proof of purchase.",
      "Bikes that have been ridden, items built or adjusted to your size, and parts that have been fitted can't be returned unless they're faulty. This doesn't affect any rights you have under applicable law.",
    ],
  },
  {
    id: "warranty",
    title: "Warranty",
    paragraphs: ["Products are covered by the manufacturer's warranty against defects in materials and workmanship. The warranty doesn't cover:"],
    list: [
      "Normal wear and tear, such as tyres, brake pads, chains and cassettes",
      "Damage from crashes, accidents, misuse or incorrect assembly by others",
      "Modifications or repairs not carried out by us or an authorised service centre",
    ],
  },
  {
    id: "service",
    title: "Servicing & repairs",
    paragraphs: [
      "We'll give you an estimate before starting any service or repair, and contact you before doing additional work that would increase the cost.",
      "Please collect your bike within 30 days of us telling you the work is complete. We may charge a storage fee for bikes left longer.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      "Cycling carries risk. Always wear a helmet, ride within your ability and follow local traffic rules. To the extent permitted by law, we're not liable for indirect or consequential losses arising from use of our products, services or website.",
      "Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    id: "privacy",
    title: "Your information",
    paragraphs: [
      "We use the details you send us — such as your name, phone number, email and order details — only to respond to you, process your order and provide service. We don't sell your information.",
      "Your cart is saved in your own browser so it's there when you come back; you can clear it at any time by emptying the cart or your browser storage.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: ["We may update these terms from time to time. The version on this page, with the date shown at the top, is the one that applies."],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: ["Questions about these terms? Contact us using the details below or on our Contact page."],
  },
];
