// /shop: filters (availability, category, brand, colour, size, price), sorting, chips and pagination.
// URL params: ?category=Helmets  ?brand=Trinx  ?deals=1  (read once on load).
const PER_PAGE = 12;
const fmt = (n: number) => `Nu. ${n.toLocaleString('en-IN')}`;

document.querySelectorAll<HTMLElement>('[data-shop]').forEach((root) => {
  const max = Number(root.dataset.max);
  const grid = root.querySelector<HTMLElement>('[data-grid]')!;
  const cells = Array.from(grid.querySelectorAll<HTMLElement>('[data-cell]'));
  const pagination = root.querySelector<HTMLElement>('[data-pagination]')!;
  const chips = root.querySelector<HTMLElement>('[data-chips]')!;
  const range = root.querySelector('[data-range]')!;
  const empty = root.querySelector<HTMLElement>('[data-empty]')!;
  const sortEl = root.querySelector<HTMLSelectElement>('[data-sort]')!;
  const pmin = root.querySelector<HTMLInputElement>('[data-pmin]')!;
  const pmax = root.querySelector<HTMLInputElement>('[data-pmax]')!;

  const state = { category: null as string | null, brands: [] as string[], colors: [] as string[], sizes: [] as string[], price: [0, max] as [number, number], onSale: false, inStock: false };
  let sort = 'default', page = 1;

  const q = new URLSearchParams(location.search);
  if (q.get('category')) state.category = q.get('category');
  if (q.get('brand')) state.brands = [q.get('brand')!];
  if (q.get('deals')) state.onSale = true;

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const matches = (c: HTMLElement) => {
    const d = c.dataset;
    if (state.category === 'Featured' ? d.featured !== 'true' : state.category && d.category !== state.category) return false;
    if (state.onSale && d.onsale !== 'true') return false;
    if (state.inStock && d.instock !== 'true') return false;
    if (state.brands.length && !state.brands.includes(d.brand!)) return false;
    if (state.colors.length && !(d.colors || '').split(',').some((x) => state.colors.includes(x))) return false;
    if (state.sizes.length && !(d.sizes || '').split(',').some((x) => state.sizes.includes(x))) return false;
    if (d.onreq === 'true') return true; // no published price: never filtered out by price
    return Number(d.pricemax) >= state.price[0] && Number(d.price) <= state.price[1];
  };
  const keys: Record<string, (c: HTMLElement) => number> = {
    popularity: (c) => -Number(c.dataset.popularity), discount: (c) => -Number(c.dataset.discount), latest: (c) => -Number(c.dataset.order),
    'price-asc': (c) => (c.dataset.onreq === 'true' ? 1e12 : Number(c.dataset.price)), 'price-desc': (c) => (c.dataset.onreq === 'true' ? 1e12 : -Number(c.dataset.price)), default: (c) => cells.indexOf(c),
  };

  const pageList = (cur: number, total: number): (number | '…')[] => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    const s = [...new Set([1, total, cur - 1, cur, cur + 1].filter((p) => p >= 1 && p <= total))].sort((a, b) => a - b);
    const out: (number | '…')[] = [];
    s.forEach((p, i) => { if (i && p - s[i - 1] > 1) out.push('…'); out.push(p); });
    return out;
  };
  const box = 'flex h-10 min-w-10 items-center justify-center rounded-full border-[1.5px] px-2 text-[12px] font-medium transition-colors duration-300';

  const syncUI = () => {
    root.querySelectorAll<HTMLElement>('[data-cat]').forEach((b) => b.setAttribute('aria-pressed', String(state.category === b.dataset.cat)));
    root.querySelectorAll<HTMLInputElement>('[data-brand]').forEach((i) => (i.checked = state.brands.includes(i.dataset.brand!)));
    root.querySelectorAll<HTMLElement>('[data-color]').forEach((b) => b.setAttribute('aria-pressed', String(state.colors.includes(b.dataset.color!))));
    root.querySelectorAll<HTMLElement>('[data-size]').forEach((b) => b.setAttribute('aria-pressed', String(state.sizes.includes(b.dataset.size!))));
    (root.querySelector('[data-f="onsale"]') as HTMLInputElement).checked = state.onSale;
    (root.querySelector('[data-f="instock"]') as HTMLInputElement).checked = state.inStock;
    pmin.value = String(state.price[0]); pmax.value = String(state.price[1]);
    paintSlider();
  };
  const paintSlider = () => {
    const lo = Number(pmin.value), hi = Number(pmax.value);
    const track = root.querySelector<HTMLElement>('[data-track]')!;
    track.style.left = `${(lo / max) * 100}%`; track.style.right = `${100 - (hi / max) * 100}%`;
    root.querySelector('[data-pmin-label]')!.textContent = fmt(lo);
    root.querySelector('[data-pmax-label]')!.textContent = fmt(hi);
  };

  const render = () => {
    const list = cells.filter(matches).sort((a, b) => keys[sort](a) - keys[sort](b));
    const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    page = Math.min(page, pages);
    const start = (page - 1) * PER_PAGE;
    cells.forEach((c) => (c.hidden = true));
    list.slice(start, start + PER_PAGE).forEach((c) => { c.hidden = false; grid.appendChild(c); });
    range.textContent = list.length ? `Showing ${start + 1}–${Math.min(start + PER_PAGE, list.length)} of ${list.length} results` : 'Showing 0 results';
    grid.hidden = list.length === 0; empty.hidden = list.length !== 0;
    root.querySelectorAll('[data-show-results]').forEach((b) => (b.textContent = `Show ${list.length} results`));

    // chips
    const chipDefs: [string, () => void][] = [
      ...(state.onSale ? [['On sale', () => (state.onSale = false)] as [string, () => void]] : []),
      ...(state.inStock ? [['In stock', () => (state.inStock = false)] as [string, () => void]] : []),
      ...(state.category ? [[state.category, () => (state.category = null)] as [string, () => void]] : []),
      ...state.brands.map((b) => [b, () => (state.brands = state.brands.filter((x) => x !== b))] as [string, () => void]),
      ...state.colors.map((c) => [c, () => (state.colors = state.colors.filter((x) => x !== c))] as [string, () => void]),
      ...state.sizes.map((s) => [`Size ${s}`, () => (state.sizes = state.sizes.filter((x) => `Size ${x}` !== `Size ${s}`))] as [string, () => void]),
      ...(state.price[0] > 0 || state.price[1] < max ? [[`${fmt(state.price[0])} – ${fmt(state.price[1])}`, () => (state.price = [0, max])] as [string, () => void]] : []),
    ];
    chips.innerHTML = '';
    chipDefs.forEach(([label, remove]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', `Remove filter: ${label}`);
      b.className = 'flex h-9 items-center gap-2 rounded-full bg-black px-4 text-[10px] font-medium text-white uppercase transition-colors duration-300 hover:bg-accent';
      b.innerHTML = `${label} <span aria-hidden="true">×</span>`;
      b.addEventListener('click', () => { remove(); page = 1; syncUI(); render(); });
      chips.appendChild(b);
    });
    if (chipDefs.length) {
      const all = document.createElement('button');
      all.type = 'button'; all.textContent = 'Clear all'; all.className = 'px-2 text-[10px] font-semibold uppercase underline underline-offset-4 hover:text-accent';
      all.addEventListener('click', reset);
      chips.appendChild(all);
    }

    // pagination
    pagination.innerHTML = '';
    if (pages > 1) {
      pageList(page, pages).forEach((p) => {
        if (p === '…') { const s = document.createElement('span'); s.className = 'px-2 text-[12px] text-muted'; s.textContent = '…'; pagination.appendChild(s); return; }
        const b = document.createElement('button');
        b.type = 'button'; b.textContent = String(p).padStart(2, '0'); b.setAttribute('aria-label', `Page ${p}`);
        if (p === page) b.setAttribute('aria-current', 'page');
        b.className = `${box} ${p === page ? 'border-black bg-black text-white' : 'border-transparent bg-white hover:text-accent'}`;
        b.addEventListener('click', () => { page = p; render(); document.getElementById('shop-top')?.scrollIntoView({ behavior: 'smooth' }); });
        pagination.appendChild(b);
      });
      const next = document.createElement('button');
      next.type = 'button'; next.textContent = '→'; next.setAttribute('aria-label', 'Next page'); next.disabled = page === pages;
      next.className = `${box} border-transparent bg-white hover:text-accent disabled:pointer-events-none disabled:opacity-30`;
      next.addEventListener('click', () => { page++; render(); });
      pagination.appendChild(next);
    }
  };
  const change = () => { page = 1; syncUI(); render(); };
  const reset = () => { state.category = null; state.brands = []; state.colors = []; state.sizes = []; state.price = [0, max]; state.onSale = false; state.inStock = false; change(); };

  root.querySelectorAll<HTMLElement>('[data-cat]').forEach((b) => b.addEventListener('click', () => { state.category = state.category === b.dataset.cat ? null : b.dataset.cat!; change(); }));
  root.querySelectorAll<HTMLInputElement>('[data-brand]').forEach((i) => i.addEventListener('change', () => { state.brands = toggle(state.brands, i.dataset.brand!); change(); }));
  root.querySelectorAll<HTMLElement>('[data-color]').forEach((b) => b.addEventListener('click', () => { state.colors = toggle(state.colors, b.dataset.color!); change(); }));
  root.querySelectorAll<HTMLElement>('[data-size]').forEach((b) => b.addEventListener('click', () => { state.sizes = toggle(state.sizes, b.dataset.size!); change(); }));
  (root.querySelector('[data-f="onsale"]') as HTMLInputElement).addEventListener('change', (e) => { state.onSale = (e.target as HTMLInputElement).checked; change(); });
  (root.querySelector('[data-f="instock"]') as HTMLInputElement).addEventListener('change', (e) => { state.inStock = (e.target as HTMLInputElement).checked; change(); });
  const step = 500;
  pmin.addEventListener('input', () => { pmin.value = String(Math.min(Number(pmin.value), Number(pmax.value) - step)); paintSlider(); });
  pmax.addEventListener('input', () => { pmax.value = String(Math.max(Number(pmax.value), Number(pmin.value) + step)); paintSlider(); });
  root.querySelector('[data-apply-price]')!.addEventListener('click', () => { state.price = [Number(pmin.value), Number(pmax.value)]; change(); });
  root.querySelectorAll('[data-reset]').forEach((b) => b.addEventListener('click', reset));
  sortEl.addEventListener('change', () => { sort = sortEl.value; page = 1; render(); });

  // mobile filter drawer
  const drawer = root.querySelector<HTMLElement>('#filter-drawer')!;
  const overlay = root.querySelector<HTMLElement>('[data-filter-overlay]')!;
  const setDrawer = (open: boolean) => { drawer.dataset.open = String(open); overlay.classList.toggle('opacity-0', !open); overlay.classList.toggle('pointer-events-none', !open); document.body.style.overflow = open ? 'hidden' : ''; };
  root.querySelector('[data-open-filters]')?.addEventListener('click', () => setDrawer(true));
  root.querySelectorAll('[data-close-filters]').forEach((b) => b.addEventListener('click', () => setDrawer(false)));
  overlay.addEventListener('click', () => setDrawer(false));

  syncUI();
  render();
});
