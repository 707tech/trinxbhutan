// Tiny localStorage cart shared by every page (no backend: the cart becomes a WhatsApp message).
export type CartItem = {
  key: string;
  id: string;
  name: string;
  image: string;
  price: number;
  href: string;
  qty: number;
  options?: { color?: string; size?: string };
};

const KEY = 'trinx-cart-v1';
const MAX_QTY = 99;

export const readCart = (): CartItem[] => {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
};
const write = (items: CartItem[]) => {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  window.dispatchEvent(new CustomEvent('cart:change'));
};
const keyFor = (id: string, o?: CartItem['options']) => [id, o?.color, o?.size].filter(Boolean).join('|');

export function addToCart(p: Omit<CartItem, 'key' | 'qty'>, qty = 1) {
  const items = readCart();
  const key = keyFor(p.id, p.options);
  const found = items.find((i) => i.key === key);
  if (found) found.qty = Math.min(MAX_QTY, found.qty + qty);
  else items.push({ ...p, key, qty: Math.min(MAX_QTY, qty) });
  write(items);
}
export function setQty(key: string, qty: number) {
  const items = readCart();
  const it = items.find((i) => i.key === key);
  if (!it) return;
  it.qty = Math.max(1, Math.min(MAX_QTY, qty));
  write(items);
}
export const removeItem = (key: string) => write(readCart().filter((i) => i.key !== key));
export const clearCart = () => write([]);
export const cartCount = () => readCart().reduce((n, i) => n + i.qty, 0);
export const cartTotal = () => readCart().reduce((n, i) => n + i.qty * i.price, 0);

export const toast = (msg: string) => {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
  el.classList.add('flex');
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = 'toast-in 0.35s ease both';
  clearTimeout((el as any)._t);
  (el as any)._t = setTimeout(() => { el.classList.add('hidden'); el.classList.remove('flex'); }, 2400);
};

/** Blue ripple at the click point, then a blue dot flies from the product to the header cart, which pulses on arrival. */
export function flyToCart(from: HTMLElement) {
  const target = document.querySelector<HTMLElement>("[data-cart-target]");
  if (!target || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const a = from.getBoundingClientRect(), b = target.getBoundingClientRect();
  const sx = a.left + a.width / 2, sy = a.top + a.height / 2, ex = b.left + b.width / 2, ey = b.top + b.height / 2;
  const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-accent").trim() || "#0094de";
  const make = (size: number, x: number, y: number, css: string) => {
    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.cssText = "position:fixed;z-index:200;pointer-events:none;border-radius:9999px;left:" + (x - size / 2) + "px;top:" + (y - size / 2) + "px;width:" + size + "px;height:" + size + "px;" + css;
    document.body.appendChild(el);
    return el;
  };
  const ripple = make(60, sx, sy, "background:" + accent + ";opacity:.5");
  ripple.animate([{ transform: "scale(.2)", opacity: 0.6 }, { transform: "scale(2.2)", opacity: 0 }], { duration: 500, easing: "ease-out" }).onfinish = () => ripple.remove();
  const dot = make(22, sx, sy, "background:" + accent + ";box-shadow:0 0 0 4px " + accent + "55,0 6px 18px " + accent + "99");
  const dx = ex - sx, dy = ey - sy, lift = -Math.min(120, Math.abs(dy) * 0.4 + 60);
  dot.animate(
    [
      { transform: "translate(0,0) scale(1)", offset: 0 },
      { transform: "translate(" + dx * 0.5 + "px," + (dy * 0.5 + lift) + "px) scale(1.15)", offset: 0.5 },
      { transform: "translate(" + dx + "px," + dy + "px) scale(.35)", opacity: 0.9, offset: 1 },
    ],
    { duration: 800, easing: "cubic-bezier(.5,0,.3,1)" },
  ).onfinish = () => {
    dot.remove();
    target.animate(
      [{ transform: "scale(1)", backgroundColor: "transparent" }, { transform: "scale(1.18)", backgroundColor: accent, color: "#fff", offset: 0.4 }, { transform: "scale(1)" }],
      { duration: 450, easing: "ease-out" },
    );
  };
}

const paintBadges = () => document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((b) => (b.textContent = String(cartCount())));
paintBadges();
window.addEventListener('cart:change', paintBadges);
window.addEventListener('storage', paintBadges);

// Any element with data-add (id, name, image, price, href) adds one item to the cart.
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLElement>('[data-add]');
  if (!btn) return;
  e.preventDefault();
  const d = btn.dataset;
  addToCart({ id: d.id!, name: d.name!, image: d.image!, price: Number(d.price), href: d.href! });
  toast('Added to cart');
  flyToCart(btn);
});
