// /bikes page: category tabs (?type=slug), sorting and result count.
document.querySelectorAll<HTMLElement>('[data-bikes]').forEach((root) => {
  const grid = root.querySelector<HTMLElement>('[data-grid]')!;
  const cells = Array.from(grid.querySelectorAll<HTMLElement>('[data-cell]'));
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-type]')).filter((b) => b.tagName === 'BUTTON');
  const sortEl = root.querySelector<HTMLSelectElement>('[data-sort]')!;
  const count = root.querySelector('[data-count]')!;
  let type = new URLSearchParams(location.search).get('type') || 'all';
  if (!tabs.some((t) => t.dataset.type === type)) type = 'all';

  const apply = () => {
    tabs.forEach((t) => t.setAttribute('aria-pressed', String(t.dataset.type === type)));
    const sort = sortEl.value;
    const list = cells.filter((c) => type === 'all' || c.dataset.type === type);
    cells.forEach((c) => (c.hidden = !list.includes(c)));
    const key = (c: HTMLElement) => (c.dataset.price === '' ? 1e12 : Number(c.dataset.price)); // no price: last
    const keyD = (c: HTMLElement) => (c.dataset.price === '' ? 1e12 : -Number(c.dataset.price));
    [...cells]
      .sort((a, b) => (sort === 'price-asc' ? key(a) - key(b) : sort === 'price-desc' ? keyD(a) - keyD(b) : Number(a.dataset.order) - Number(b.dataset.order)))
      .forEach((c) => grid.appendChild(c));
    count.textContent = `Showing ${list.length} bike${list.length === 1 ? '' : 's'}`;
  };
  tabs.forEach((t) => t.addEventListener('click', () => { type = t.dataset.type!; apply(); }));
  sortEl.addEventListener('change', apply);
  apply();
});
