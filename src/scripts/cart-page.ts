// Cart page: renders the localStorage cart, qty/remove, totals and the WhatsApp enquiry link.
import { readCart, removeItem, setQty } from './cart';

const root = document.querySelector<HTMLElement>('[data-cart-page]');
if (root) {
  const fmt = (n: number) => `Nu. ${n.toLocaleString('en-IN')}`;
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
  const $ = <T extends HTMLElement>(s: string) => root.querySelector<T>(s)!;

  const render = () => {
    const items = readCart();
    $('[data-loading]').hidden = true;
    $('[data-empty]').hidden = items.length > 0;
    $('[data-full]').hidden = items.length === 0;
    if (!items.length) return;

    $('[data-rows]').innerHTML = items.map((it) => {
      const opts = [it.options?.color, it.options?.size].filter(Boolean).join(' / ');
      return `<tr data-key="${esc(it.key)}" class="relative grid grid-cols-[64px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-b border-neutral-200 py-5 transition-opacity duration-300 md:table-row md:h-[95px] md:py-0">
        <td class="absolute top-5 right-0 md:static md:table-cell md:align-middle"><button type="button" data-remove aria-label="Remove ${esc(it.name)} from cart" class="flex h-7 w-7 items-center justify-center text-muted transition-colors duration-300 hover:text-accent">✕</button></td>
        <td class="md:table-cell md:align-middle"><div class="h-[60px] w-[60px] overflow-hidden border border-neutral-200 bg-card"><img src="${esc(it.image)}" alt="" width="60" height="60" class="h-full w-full object-cover" /></div></td>
        <td class="pr-8 md:table-cell md:pr-4 md:align-middle"><a href="${esc(it.href)}" class="text-[12px] leading-snug font-semibold uppercase transition-colors duration-300 hover:text-accent">${esc(it.name)}</a>${opts ? `<p class="mt-1 text-[10px] text-muted uppercase">${esc(opts)}</p>` : ''}</td>
        <td class="col-span-2 flex items-center justify-between md:table-cell md:text-center md:align-middle"><span class="text-[10px] font-semibold uppercase md:hidden">Price</span><span class="text-[14px] font-semibold">${fmt(it.price)}</span></td>
        <td class="col-span-2 flex items-center justify-between md:table-cell md:align-middle"><span class="text-[10px] font-semibold uppercase md:hidden">Quantity</span>
          <div class="flex h-11 w-[150px] items-center justify-between rounded-full border border-neutral-300 px-2 text-[14px] md:mx-auto"><button type="button" data-minus aria-label="Decrease quantity" class="h-full w-9 hover:text-accent">−</button><input data-qty type="number" min="1" value="${it.qty}" aria-label="Quantity for ${esc(it.name)}" class="w-10 [appearance:textfield] bg-transparent text-center focus:outline-none [&::-webkit-inner-spin-button]:appearance-none" /><button type="button" data-plus aria-label="Increase quantity" class="h-full w-9 hover:text-accent">+</button></div></td>
        <td class="col-span-2 flex items-center justify-between md:table-cell md:text-right md:align-middle"><span class="text-[10px] font-semibold uppercase md:hidden">Subtotal</span><span class="text-[14px] font-semibold">${fmt(it.qty * it.price)}</span></td>
      </tr>`;
    }).join('');

    const total = items.reduce((n, i) => n + i.qty * i.price, 0);
    $('[data-subtotal]').textContent = fmt(total);
    $('[data-total]').textContent = fmt(total);
    const msg = ["Hi Gangjung Traders, I'd like to enquire about these items:", ...items.map((i, n) => { const o = [i.options?.color, i.options?.size].filter(Boolean); return `${n + 1}. ${i.name}${o.length ? ` (${o.join(', ')})` : ''} – Qty ${i.qty} – ${fmt(i.qty * i.price)}`; }), `Total: ${fmt(total)}`].join('\n');
    $<HTMLAnchorElement>('[data-wa-link]').href = `https://wa.me/${root.dataset.wa}?text=${encodeURIComponent(msg)}`;
  };

  root.addEventListener('click', (e) => {
    const row = (e.target as HTMLElement).closest<HTMLElement>('tr[data-key]');
    if (!row) return;
    const key = row.dataset.key!;
    const cur = readCart().find((i) => i.key === key);
    const t = e.target as HTMLElement;
    if (t.closest('[data-remove]')) { row.classList.add('opacity-0'); setTimeout(() => removeItem(key), 300); }
    else if (t.closest('[data-plus]') && cur) setQty(key, cur.qty + 1);
    else if (t.closest('[data-minus]') && cur) setQty(key, cur.qty - 1);
  });
  root.addEventListener('change', (e) => {
    const input = (e.target as HTMLElement).closest<HTMLInputElement>('[data-qty]');
    const row = input?.closest<HTMLElement>('tr[data-key]');
    if (input && row) setQty(row.dataset.key!, Math.floor(Number(input.value)) || 1);
  });
  window.addEventListener('cart:change', render);
  window.addEventListener('storage', render);
  render();
}
