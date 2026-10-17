// Product / bike page behaviour: gallery + lightbox, option pickers, qty, add to cart, WhatsApp link, share, tabs.
import { addToCart, flyToCart, toast } from './cart';

/* ---------- Gallery ---------- */
document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((root) => {
  const imgs = Array.from(root.querySelectorAll<HTMLElement>('[data-g-img]'));
  const thumbs = Array.from(root.querySelectorAll<HTMLElement>('[data-g-thumb]'));
  const main = root.querySelector<HTMLElement>('[data-gallery-main]')!;
  const full: string[] = JSON.parse(root.dataset.full || '[]');
  let active = 0;
  const show = (i: number) => {
    active = (i + imgs.length) % imgs.length;
    imgs.forEach((m, n) => { m.classList.toggle('opacity-100', n === active); m.classList.toggle('opacity-0', n !== active); });
    thumbs.forEach((t) => t.setAttribute('aria-current', String(Number(t.dataset.i) === active)));
  };
  thumbs.forEach((t) => t.addEventListener('click', () => show(Number(t.dataset.i))));
  root.querySelector('[data-g-next]')?.addEventListener('click', () => show(active + 1));
  // hover zoom follows the cursor
  main.addEventListener('mousemove', (e) => {
    const r = main.getBoundingClientRect();
    const img = imgs[active];
    img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
    img.style.transform = 'scale(1.8)';
  });
  main.addEventListener('mouseleave', () => (imgs[active].style.transform = ''));

  // lightbox
  const lb = document.getElementById('lightbox')!;
  const lbImg = document.getElementById('lb-img') as HTMLImageElement;
  const count = document.getElementById('lb-count')!;
  const lbShow = (i: number) => { show(i); lbImg.src = full[active]; lbImg.alt = `${root.dataset.name} — image ${active + 1}`; count.textContent = `${String(active + 1).padStart(2, '0')} / ${String(full.length).padStart(2, '0')}`; };
  const close = () => { lb.classList.add('hidden'); document.body.style.overflow = ''; main.focus(); };
  main.addEventListener('click', () => { lb.classList.remove('hidden'); document.body.style.overflow = 'hidden'; lbShow(active); document.getElementById('lb-close')!.focus(); });
  document.getElementById('lb-close')!.addEventListener('click', close);
  document.getElementById('lb-prev')!.addEventListener('click', (e) => { e.stopPropagation(); lbShow(active - 1); });
  document.getElementById('lb-next')!.addEventListener('click', (e) => { e.stopPropagation(); lbShow(active + 1); });
  lb.addEventListener('click', (e) => { if (e.target === lb || (e.target as HTMLElement).parentElement?.classList.contains('inset-6')) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') lbShow(active + 1);
    if (e.key === 'ArrowLeft') lbShow(active - 1);
  });
});

/* ---------- Purchase box ---------- */
const box = document.querySelector<HTMLElement>('[data-purchase]');
if (box) {
  const d = box.dataset;
  let color = d.color || undefined, size = d.size || undefined, qty = 1;
  const qtyInput = box.querySelector<HTMLInputElement>('[data-qty-input]');
  const wa = box.querySelector<HTMLAnchorElement>('[data-wa]')!;
  const fmt = (n: number) => `Nu. ${n.toLocaleString('en-IN')}`;
  const priceLabel = d.pricelabel || fmt(Number(d.price));

  const msg = () => {
    const link = `${d.siteurl || location.origin}${d.path}`;
    return [
      'Hi Gangjung Traders,', '',
      `I’m interested in the *${d.name}*${d.bicycle === 'true' ? ' bicycle' : ''}.`, '',
      `- *Quantity:* ${qty}`,
      ...(color ? [`- *Color:* ${color}`] : []),
      ...(size ? [`- *Size:* ${size}`] : []),
      `- *Price:* ${qty > 1 ? `${priceLabel} each` : priceLabel}`,
      `- *Product Link:* ${link}`, '',
      'Could you please confirm the availability and let me know how I can place an order?', '', 'Thank you.',
    ].join('\n');
  };
  const refresh = () => { wa.href = `https://wa.me/${d.wa}?text=${encodeURIComponent(msg())}`; if (qtyInput) qtyInput.value = String(qty); };
  const setQty = (n: number) => { qty = Math.max(1, Math.min(99, Math.floor(n) || 1)); refresh(); };
  box.querySelector('[data-qty-minus]')?.addEventListener('click', () => setQty(qty - 1));
  box.querySelector('[data-qty-plus]')?.addEventListener('click', () => setQty(qty + 1));
  qtyInput?.addEventListener('input', () => setQty(Number(qtyInput.value)));

  const pick = (group: string, apply: (v: string) => void) => {
    box.querySelectorAll<HTMLButtonElement>(`[data-opt="${group}"]`).forEach((b) =>
      b.addEventListener('click', () => {
        box.querySelectorAll(`[data-opt="${group}"]`).forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
        apply(b.dataset.value!);
        const label = box.querySelector(`[data-opt-label="${group}"]`);
        if (label) label.textContent = b.dataset.value!;
        refresh();
      }),
    );
  };
  pick('color', (v) => (color = v));
  pick('size', (v) => (size = v));

  box.querySelector<HTMLElement>('[data-add-cart]')?.addEventListener('click', (e) => {
    addToCart({ id: d.id!, name: d.name!, image: d.image!, price: Number(d.price), href: d.path!, options: { color, size } }, qty);
    toast('Added to cart');
    flyToCart(e.currentTarget as HTMLElement);
  });
  refresh();
}

/* ---------- Share popover ---------- */
document.querySelectorAll<HTMLElement>('[data-share]').forEach((root) => {
  const btn = root.querySelector<HTMLButtonElement>('[data-share-btn]')!;
  const pop = root.querySelector<HTMLElement>('[data-share-pop]')!;
  const set = (open: boolean) => { pop.classList.toggle('hidden', !open); btn.setAttribute('aria-expanded', String(open)); };
  btn.addEventListener('click', () => set(pop.classList.contains('hidden')));
  document.addEventListener('mousedown', (e) => { if (!root.contains(e.target as Node)) set(false); });
  document.addEventListener('keydown', (e) => e.key === 'Escape' && set(false));
  const copy = root.querySelector<HTMLElement>('[data-share-copy]')!;
  copy.addEventListener('click', async () => { try { await navigator.clipboard.writeText(location.href); copy.lastChild!.textContent = ' Link copied!'; setTimeout(() => (copy.lastChild!.textContent = ' Copy link'), 2000); } catch {} });
  const mail = root.querySelector<HTMLAnchorElement>('[data-share-mail]')!;
  mail.href = `mailto:?subject=${encodeURIComponent(root.dataset.name || '')}&body=${encodeURIComponent(location.href)}`;
  const native = root.querySelector<HTMLElement>('[data-share-native]');
  if (native) { if (!('share' in navigator)) native.remove(); else native.addEventListener('click', () => navigator.share({ title: root.dataset.name, url: location.href }).catch(() => {})); }
});

/* ---------- Tabs (desktop tabs / mobile accordion) ---------- */
document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
  const tabs = Array.from(root.querySelectorAll<HTMLElement>('[role=tab]'));
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
  const accBtns = Array.from(root.querySelectorAll<HTMLElement>('[data-acc]'));
  const accPanels = Array.from(root.querySelectorAll<HTMLElement>('[data-acc-panel]'));
  const set = (id: string) => {
    tabs.forEach((t) => { const on = t.dataset.tab === id; t.setAttribute('aria-selected', String(on)); t.classList.toggle('border-black', on); t.classList.toggle('border-transparent', !on); t.classList.toggle('text-muted', !on); });
    panels.forEach((p) => (p.hidden = p.dataset.panel !== id));
    accBtns.forEach((b) => b.setAttribute('aria-expanded', String(b.dataset.acc === id)));
    accPanels.forEach((p) => (p.hidden = p.dataset.accPanel !== id));
  };
  tabs.forEach((t) => t.addEventListener('click', () => set(t.dataset.tab!)));
  accBtns.forEach((b) => b.addEventListener('click', () => set(b.dataset.acc!)));
  set(tabs[0]?.dataset.tab || 'description');
});
