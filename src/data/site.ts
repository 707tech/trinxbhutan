// Site-wide settings. Phone and email are real; address and social links are still placeholders.

export const SITE_NAME = 'Gangjung Traders';
export const SITE_SHORT = 'Gangjung Traders';
export const SITE_BY = 'Gangjung Traders';

/** Shop WhatsApp number, international format, digits only (placeholder). */
export const WHATSAPP_NUMBER = '97577122221';

/** Public website address (used in WhatsApp product links and the sitemap). */
export const SITE_URL = 'https://trinx.example.com';

export const CONTACT = {
  phoneDisplay: '+975 77 122 221',
  phoneHref: 'tel:+97577122221',
  email: 'gang_jung@yahoo.com',
  address: 'Thimphu, Bhutan',
  hours: [
    { days: 'Monday – Saturday', time: '9:00 – 19:00' },
    { days: 'Sunday', time: 'Closed' },
  ],
  mapQuery: 'Thimphu, Bhutan',
};

export type Location = {
  slug: string; city: string; name: string; address: string; phoneDisplay: string; phoneHref: string; email: string;
  hours: { days: string; time: string }[]; mapQuery: string; note: string;
};

/** Shops & service centres (footer + Service page). Add more entries for more branches. */
export const LOCATIONS: Location[] = [
  {
    slug: 'thimphu',
    city: 'Thimphu',
    name: 'Thimphu Showroom & Workshop',
    address: CONTACT.address,
    phoneDisplay: CONTACT.phoneDisplay,
    phoneHref: CONTACT.phoneHref,
    email: CONTACT.email,
    hours: CONTACT.hours,
    mapQuery: CONTACT.mapQuery,
    note: 'Showroom · full servicing, repairs & bike fitting',
  },
];

export const SOCIAL_LINKS = [
  { name: 'YouTube', href: 'https://www.youtube.com/@GManBhutan' },
] as const;

/** WhatsApp link with a pre-filled message. */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type Enquiry = { name: string; isBicycle: boolean; quantity: number; color?: string; size?: string; price: string; link: string };
export type CartLine = { name: string; qty: number; lineTotal: string; options?: string[] };

/** mailto: link that opens the visitor's email app with the shop address, subject and body filled in */
export function mailtoLink(subject: string, body: string): string {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function contactEmail(f: { name: string; email: string; phone?: string; subject: string; message: string }) {
  return {
    subject: `${f.subject} — website enquiry from ${f.name}`,
    body: ['Hi Gangjung Traders,', '', f.message, '', '—', `Name: ${f.name}`, `Email: ${f.email}`, ...(f.phone ? [`Phone: ${f.phone}`] : []), `Subject: ${f.subject}`, 'Sent from the Gangjung Traders website contact form'].join('\n'),
  };
}

export function cartEnquiryMessage(lines: CartLine[], total: string): string {
  return [
    "Hi Gangjung Traders, I'd like to enquire about these items:",
    ...lines.map((l, i) => {
      const o = (l.options ?? []).filter(Boolean);
      return `${i + 1}. ${l.name}${o.length ? ` (${o.join(', ')})` : ''} – Qty ${l.qty} – ${l.lineTotal}`;
    }),
    `Total: ${total}`,
  ].join('\n');
}

export function enquiryMessage({ name, isBicycle, quantity, color, size, price, link }: Enquiry): string {
  return [
    'Hi Gangjung Traders,',
    '',
    `I’m interested in the *${name}*${isBicycle ? ' bicycle' : ''}.`,
    '',
    `- *Quantity:* ${quantity}`,
    ...(color ? [`- *Color:* ${color}`] : []),
    ...(size ? [`- *Size:* ${size}`] : []),
    `- *Price:* ${price}`,
    `- *Product Link:* ${link}`,
    '',
    'Could you please confirm the availability and let me know how I can place an order?',
    '',
    'Thank you.',
  ].join('\n');
}
