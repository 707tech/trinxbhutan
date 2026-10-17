// Header state, off-canvas menu, nav dropdown, search overlay, reveal-on-scroll.
import { url } from '../utils/url';
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends HTMLElement>(s: string) => document.querySelector<T>(s);

/* ---------- Header: overlay turns white on scroll; solid shrinks ---------- */
const header = $('#site-header');
if (header) {
  const overlay = header.dataset.variant === 'overlay';
  let state = false;
  const onScroll = () => {
    // hysteresis (on after 120px, off under 40px) stops the height change bouncing the threshold
    state = state ? window.scrollY > 40 : window.scrollY > 120;
    if (overlay) header.dataset.solid = String(state);
    else header.dataset.compact = String(state);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------- Off-canvas menu ---------- */
const menu = $('#offcanvas-menu');
const mOverlay = $('#menu-overlay');
const openBtn = $('#menu-open');
const setMenu = (open: boolean) => {
  if (!menu) return;
  menu.classList.toggle('is-open', open);
  mOverlay?.classList.toggle('is-open', open);
  menu.toggleAttribute('inert', !open);
  openBtn?.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
};
openBtn?.addEventListener('click', () => setMenu(true));
$('#menu-close')?.addEventListener('click', () => setMenu(false));
mOverlay?.addEventListener('click', () => setMenu(false));
menu?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
menu?.querySelectorAll<HTMLElement>('li[data-sub]').forEach((li) => {
  const grid = li.querySelector<HTMLElement>('.sub-grid > div');
  const set = (open: boolean) => {
    li.classList.toggle('is-open', open);
    grid?.toggleAttribute('inert', !open);
    li.querySelectorAll('[aria-expanded]').forEach((b) => b.setAttribute('aria-expanded', String(open)));
  };
  li.querySelectorAll('[data-sub-toggle]').forEach((b) => b.addEventListener('click', () => set(!li.classList.contains('is-open'))));
  li.addEventListener('pointerenter', (e) => { if ((e as PointerEvent).pointerType === 'mouse') { menu.querySelectorAll('li[data-sub]').forEach((o) => o !== li && o.classList.remove('is-open')); set(true); } });
});
menu?.addEventListener('pointerleave', (e) => { if ((e as PointerEvent).pointerType === 'mouse') menu.querySelectorAll('li[data-sub]').forEach((o) => o.classList.remove('is-open')); });

/* ---------- Desktop nav dropdown: keyboard + click ---------- */
document.querySelectorAll<HTMLElement>('.nav-dd').forEach((dd) => {
  const btn = dd.querySelector('button')!;
  btn.addEventListener('click', () => { const open = !dd.classList.contains('is-open'); dd.classList.toggle('is-open', open); btn.setAttribute('aria-expanded', String(open)); });
  document.addEventListener('click', (e) => { if (!dd.contains(e.target as Node)) { dd.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); } });
});

/* ---------- Search overlay ---------- */
type Hit = { t: string; k: string; u: string; x: string; p?: number };
let index: Hit[] | null = null;
const sOverlay = $('#search-overlay');
const sInput = $<HTMLInputElement>('#search-input');
const sResults = $('#search-results');
const fmt = (n: number) => `Nu. ${n.toLocaleString('en-IN')}`;
const loadIndex = async () => (index ??= await fetch(url('/search-index.json')).then((r) => r.json()));
export function searchHits(q: string, list: Hit[]) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  return list
    .map((h) => {
      const title = h.t.toLowerCase(), all = `${title} ${h.x.toLowerCase()} ${h.k.toLowerCase()}`;
      if (!words.every((w) => all.includes(w))) return null;
      return { h, s: words.reduce((n, w) => n + (title.startsWith(w) ? 4 : title.includes(w) ? 3 : 1), 0) };
    })
    .filter(Boolean)
    .sort((a, b) => b!.s - a!.s)
    .map((r) => r!.h);
}
const render = (hits: Hit[], q: string) => {
  if (!sResults) return;
  if (!q) { sResults.innerHTML = '<p class="p-4 text-[11px] text-muted uppercase">Start typing to search. Press Esc to close.</p>'; return; }
  if (!hits.length) { sResults.innerHTML = `<p class="p-4 text-[11px] text-muted uppercase">No results for “${q.replace(/</g, '&lt;')}”.</p>`; return; }
  sResults.innerHTML = hits.slice(0, 8).map((h) => `<a href="${h.u}" class="flex items-center justify-between gap-4 px-4 py-3 text-[12px] font-medium uppercase transition-colors hover:bg-card"><span>${h.t}<span class="ml-3 text-[10px] text-muted">${h.k}</span></span>${h.p ? `<span class="text-[11px]">${fmt(h.p)}</span>` : ''}</a>`).join('') + `<a href="${url(`/search?q=${encodeURIComponent(q)}`)}" class="mt-1 block px-4 py-3 text-[11px] font-semibold text-accent uppercase">See all results →</a>`;
};
const setSearch = async (open: boolean) => {
  if (!sOverlay) return;
  sOverlay.classList.toggle('hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) { sInput?.focus(); await loadIndex(); }
};
$('#search-open')?.addEventListener('click', () => setSearch(true));
$('#search-close')?.addEventListener('click', () => setSearch(false));
sOverlay?.addEventListener('click', (e) => { if (e.target === sOverlay) setSearch(false); });
sInput?.addEventListener('input', async () => { const q = sInput.value.trim(); render(q ? searchHits(q, await loadIndex()) : [], q); });
document.addEventListener('keydown', (e) => {
  const typing = (e.target as HTMLElement).closest?.('input, textarea, select, [contenteditable]');
  if ((e.key === '/' && !typing) || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) { e.preventDefault(); setSearch(true); }
  if (e.key === 'Escape') { setSearch(false); setMenu(false); }
});

/* ---------- Reveal on scroll ---------- */
const els = document.querySelectorAll<HTMLElement>('.reveal');
if (reduce || !('IntersectionObserver' in window)) els.forEach((e) => e.classList.add('is-visible'));
else {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach((e) => io.observe(e));
}

