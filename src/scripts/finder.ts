// Bike Finder quiz: terrain → height → budget, then ranks the bikes (port of findBikes in data/bikeFinder.ts).
type Bike = { id: number; slug: string; name: string; category: string; price: number | null; sizes: string[]; inStock: boolean };
const fmt = (n: number) => `Nu. ${n.toLocaleString('en-IN')}`;

document.querySelectorAll<HTMLElement>('[data-finder]').forEach((root) => {
  const data = JSON.parse(root.querySelector('#finder-data')!.textContent!);
  const steps = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
  const segs = Array.from(root.querySelectorAll<HTMLElement>('[data-progress] li'));
  const label = root.querySelector('[data-step-label]')!;
  const results = root.querySelector<HTMLElement>('[data-results]')!;
  const pool = Array.from(root.querySelectorAll<HTMLElement>('[data-pool] > li'));
  const answers: Record<string, string> = {};
  let step = 0, init = true;
  const top = () => root.querySelector('#finder-top')!.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const show = (n: number) => {
    step = n;
    steps.forEach((s, i) => (s.hidden = i !== n));
    results.hidden = n < steps.length;
    segs.forEach((s, i) => { s.className = `h-1 flex-1 transition-colors duration-500 ${i < n ? 'bg-accent' : i === n ? 'bg-black' : 'bg-neutral-200'}`; });
    label.textContent = n >= steps.length ? 'Your matches' : `Step ${n + 1} of ${steps.length}`;
    steps.forEach((s, i) => s.querySelectorAll<HTMLElement>('[data-choose]').forEach((b) => b.setAttribute('aria-pressed', String(answers[b.dataset.choose!] === b.dataset.value && i <= n))));
    if (n >= steps.length) renderResults();
    if (!init) top();
  };

  const letters = (b: Bike) => b.sizes.map((s) => s.split(' ')[0]).filter((s) => /^[A-Z]+$/.test(s));
  const find = () => {
    const ride = data.ride.find((o: any) => o.value === answers.ride);
    const size = data.height.find((o: any) => o.value === answers.height).size as string;
    const bud = data.budget.find((o: any) => o.value === answers.budget); // undefined when no prices are published
    const [min, max] = bud ? [bud.range[0], bud.range[1] ?? Infinity] : [0, Infinity];
    const matches = (data.bikes as Bike[]).map((b, i) => {
      const rideMatch = b.category === ride.category;
      const l = letters(b);
      const sizeMatch = l.length ? l.includes(size) : null;
      const inBudget = b.price === null ? true : b.price >= min && b.price <= max;
      const overBy = b.price === null ? 0 : Math.max(0, b.price - max);
      const score = (rideMatch ? 10 : 0) + (sizeMatch === true ? 4 : sizeMatch === null ? 2 : 0) + (inBudget ? 4 : overBy && overBy <= max * 0.2 ? 2 : 0) + (b.inStock ? 2 : -20) - i / 1000;
      return { b, score, rideMatch, sizeMatch, inBudget, overBy };
    });
    const ranked = matches.filter((m) => m.score > 0).sort((a, b) => b.score - a.score);
    const best = ranked.filter((m) => m.rideMatch).slice(0, 3);
    const more = ranked.filter((m) => !best.includes(m) && (m.sizeMatch !== false || m.inBudget)).slice(0, 3);
    return { best, more, size, ride, bud };
  };

  const grid = (list: ReturnType<typeof find>['best'], size: string) => {
    const ul = document.createElement('ul');
    ul.className = 'grid grid-cols-1 border-t border-l border-neutral-200 min-[480px]:grid-cols-2 lg:grid-cols-3';
    list.forEach((m) => {
      const li = pool.find((p) => Number(p.dataset.id) === m.b.id)!.cloneNode(true) as HTMLElement;
      const notes = [
        m.sizeMatch === null ? [false, 'Numbered frame sizes — we’ll check your fit'] : m.sizeMatch ? [true, `Comes in size ${size}`] : [false, `Not in size ${size}`],
        ...(bud ? [m.inBudget ? [true, 'Within budget'] : m.overBy ? [false, `${fmt(m.overBy)} over budget`] : [false, 'Below your range']] : []),
      ] as [boolean, string][];
      const ul2 = document.createElement('ul');
      ul2.className = 'flex flex-wrap gap-x-4 gap-y-1 border-t border-neutral-200 px-5 py-3 text-[10px] uppercase';
      ul2.innerHTML = notes.map(([ok, t]) => `<li class="flex items-center gap-1.5 ${ok ? 'text-black' : 'text-muted'}"><span class="h-1.5 w-1.5 rounded-full ${ok ? 'bg-accent' : 'bg-neutral-300'}" aria-hidden="true"></span>${t}</li>`).join('');
      li.appendChild(ul2);
      ul.appendChild(li);
    });
    return ul;
  };

  const renderResults = () => {
    const { best, more, size, ride, bud } = find();
    const height = data.height.find((o: any) => o.value === answers.height);
    results.querySelector('[data-results-title]')!.textContent = best.length ? 'Bikes for you' : 'Closest matches';
    const sum = results.querySelector<HTMLElement>('[data-summary]')!;
    sum.innerHTML = '';
    [[ride.label, 0], [`${height.label} · Size ${size}`, 1], ...(bud ? [[bud.label, 2]] : [])].forEach(([t, s]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = String(t); b.setAttribute('aria-label', `Change answer: ${t}`);
      b.className = 'rounded-[17px] border-[1.5px] border-neutral-300 px-4 py-2 text-[10px] font-medium uppercase transition-colors duration-300 hover:border-accent hover:text-accent';
      b.addEventListener('click', () => show(Number(s)));
      sum.appendChild(b);
    });
    const bestEl = results.querySelector<HTMLElement>('[data-best]')!;
    bestEl.innerHTML = '';
    if (best.length) bestEl.appendChild(grid(best, size));
    else bestEl.innerHTML = '<div class="border border-neutral-200 p-8"><p class="t-h5">No exact match right now.</p><p class="mt-3 max-w-xl font-sans text-[14px] leading-6 text-neutral-600">We don’t have a bike that fits all your answers in stock. Message us — we can often order one in, or suggest an alternative below.</p></div>';
    const moreWrap = results.querySelector<HTMLElement>('[data-more-wrap]')!;
    const moreEl = results.querySelector<HTMLElement>('[data-more]')!;
    moreEl.innerHTML = '';
    moreWrap.hidden = more.length === 0;
    if (more.length) moreEl.appendChild(grid(more, size));
    const topBike = (best[0] ?? more[0])?.b;
    const msg = ['Hi Gangjung Traders, I used the Bike Finder on your website.', `I ride: ${ride.label}`, `Height: ${height.label} (size ${size})`, ...(bud ? [`Budget: ${bud.label}`] : []), topBike ? `I'd like to book a test ride of the Trinx ${topBike.name}.` : 'Could you suggest a bike for me?'].join('\n');
    results.querySelector<HTMLAnchorElement>('[data-wa]')!.href = `https://wa.me/${data.wa}?text=${encodeURIComponent(msg)}`;
  };

  root.querySelectorAll<HTMLElement>('[data-choose]').forEach((b) => b.addEventListener('click', () => { answers[b.dataset.choose!] = b.dataset.value!; show(step + 1); }));
  root.querySelectorAll('[data-back]').forEach((b) => b.addEventListener('click', () => show(step - 1)));
  root.querySelector('[data-restart]')!.addEventListener('click', () => { Object.keys(answers).forEach((k) => delete answers[k]); show(0); });
  show(0);
  init = false;
});
