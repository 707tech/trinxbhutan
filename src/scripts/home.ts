// Homepage behaviour: hero slider, "Simply Explore" tabs, bike-type slider, sale countdown.
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- "Simply Explore" filter tabs ---------- */
document.querySelectorAll<HTMLElement>('[data-explore]').forEach((root) => {
  const cells = Array.from(root.querySelectorAll<HTMLElement>('[data-cell]'));
  root.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((b) =>
    b.addEventListener('click', () => {
      const f = b.dataset.filter!;
      root.querySelectorAll('[data-filter]').forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
      cells.forEach((c) => (c.hidden = !(f === 'All' || (f === 'Bikes' ? c.dataset.kind === 'bike' : c.dataset.category === f))));
    }),
  );
});

/* ---------- Bike-type slider ---------- */
document.querySelectorAll<HTMLElement>('[data-slider-section]').forEach((root) => {
  const track = root.querySelector<HTMLElement>('[data-slider-track]')!;
  const prev = root.querySelector<HTMLButtonElement>('[data-slider-prev]')!;
  const next = root.querySelector<HTMLButtonElement>('[data-slider-next]')!;
  const update = () => { prev.disabled = track.scrollLeft <= 2; next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2; };
  const step = (d: number) => track.scrollBy({ left: d * ((track.firstElementChild as HTMLElement)?.offsetWidth ?? 300), behavior: reduce ? 'auto' : 'smooth' });
  prev.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});

/* ---------- Sale countdown ---------- */
document.querySelectorAll<HTMLElement>('[data-countdown]').forEach((root) => {
  const end = new Date(root.dataset.countdown!).getTime();
  const pad = (n: number) => String(n).padStart(2, '0');
  const set = (k: string, v: string) => (root.querySelector(`[data-cd="${k}"]`)!.textContent = v);
  const tick = () => {
    const left = Math.max(0, Math.floor((end - Date.now()) / 1000));
    set('days', pad(Math.floor(left / 86400)));
    set('hours', pad(Math.floor((left % 86400) / 3600)));
    set('mins', pad(Math.floor((left % 3600) / 60)));
    set('secs', pad(left % 60));
    if (left === 0) {
      root.querySelector('[data-cd-label]')!.textContent = 'This deal has closed';
      root.querySelector('[data-cd-dot]')?.classList.remove('animate-pulse', 'bg-accent');
      root.querySelector('[data-cd-dot]')?.classList.add('bg-muted');
      root.querySelector('[data-cd-until]')!.textContent = 'Ended';
      clearInterval(id);
    }
  };
  const id = window.setInterval(tick, 1000);
  tick();
});
