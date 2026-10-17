// Build-time search index used by the search overlay and the /search page.
import type { APIRoute } from 'astro';
import { shopItems } from '../data/catalogue';
import { bikeCategoryList } from '../data/bikes';

export const GET: APIRoute = () => {
  const items = [
    ...shopItems.map((i) => ({ t: i.name, k: i.kind === 'bike' ? 'Bike' : 'Product', u: i.href, x: `${i.category} ${i.brand}`, p: i.onRequest ? undefined : i.price })),
    ...bikeCategoryList.map((c) => ({ t: c.label, k: 'Category', u: `/bikes?type=${c.slug}`, x: c.name })),
    ...[
      ['Bike servicing', '/service', 'repair tune-up workshop booking'],
      ['Bike Finder', '/bike-finder', 'quiz size budget find my bike'],
      ['About us', '/about', 'story history vision'],
      ['Our team', '/team', 'staff mechanics'],
      ['FAQ', '/faq', 'questions delivery payment warranty'],
      ['Contact', '/contact', 'phone email address map whatsapp'],
      ['Terms & conditions', '/terms', 'privacy returns warranty'],
      ['Cart', '/cart', 'basket order'],
    ].map(([t, u, x]) => ({ t, k: 'Page', u, x })),
  ];
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
};
