// Product / bike card behaviour: ‹ › arrows browse the photos; hovering a card shows its 2nd photo.
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-card-step]');
  if (!btn) return;
  e.preventDefault();
  const card = btn.closest<HTMLElement>('[data-card]')!;
  const imgs = Array.from(card.querySelectorAll<HTMLElement>('[data-card-img]'));
  if (imgs.length < 2) return;
  let i = imgs.findIndex((m) => m.dataset.active === 'true');
  i = (i + Number(btn.dataset.cardStep) + imgs.length) % imgs.length;
  imgs.forEach((m, n) => { m.dataset.active = String(n === i); m.classList.toggle('opacity-0', n !== i); m.classList.toggle('opacity-100', n === i); });
  card.dataset.browsed = 'true';
});

document.querySelectorAll<HTMLElement>('[data-card]').forEach((card) => {
  const imgs = Array.from(card.querySelectorAll<HTMLElement>('[data-card-img]'));
  if (imgs.length < 2) return;
  const show = (i: number) => imgs.forEach((m, n) => { m.dataset.active = String(n === i); m.classList.toggle('opacity-0', n !== i); m.classList.toggle('opacity-100', n === i); });
  card.addEventListener('mouseenter', () => { if (card.dataset.browsed !== 'true') show(1); });
  card.addEventListener('mouseleave', () => { if (card.dataset.browsed !== 'true') show(0); });
});
