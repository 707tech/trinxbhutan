// Chat bubble: opens a small panel, shows a typing animation, then the greeting; messages are sent on WhatsApp.
const wrap = document.getElementById('chat-widget');
if (wrap) {
  const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
  const panel = $('chat-panel'), toggle = $('chat-toggle'), typing = $('chat-typing'), msg = $('chat-msg'), form = $<HTMLFormElement>('chat-form'), input = $<HTMLInputElement>('chat-input');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = 0, greeted = false;

  const reveal = () => { typing.hidden = true; msg.hidden = false; form.hidden = false; greeted = true; };
  const open = () => {
    panel.hidden = false; toggle.setAttribute('aria-expanded', 'true');
    panel.classList.remove('is-closing'); void panel.offsetWidth; panel.classList.add('is-open');
    if (greeted) return input.focus();
    if (reduce) { reveal(); return; }
    timer = window.setTimeout(() => { reveal(); input.focus({ preventScroll: true }); }, 1400);
  };
  const close = () => {
    clearTimeout(timer); toggle.setAttribute('aria-expanded', 'false'); panel.classList.remove('is-open');
    if (!greeted) { typing.hidden = false; }
    panel.hidden = true; toggle.focus();
  };
  toggle.addEventListener('click', () => (panel.hidden ? open() : close()));
  $('chat-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) close(); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim() || 'I have a question: ';
    window.open(`https://wa.me/${wrap.dataset.wa}?text=${encodeURIComponent(`Hi Gangjung Traders, ${text}`)}`, '_blank', 'noopener');
    input.value = '';
  });
}
