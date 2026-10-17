// Service booking form → WhatsApp; contact form → the visitor's email app. No server needed.
const val = (d: FormData, k: string) => String(d.get(k) ?? '').trim();

document.querySelectorAll<HTMLFormElement>('[data-service-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const f = { service: val(d, 'service'), centre: val(d, 'centre'), date: val(d, 'date'), name: val(d, 'name'), phone: val(d, 'phone'), bike: val(d, 'bike'), notes: val(d, 'notes') };
    const errs: Record<string, string> = {};
    if (!f.name) errs.name = 'Please enter your name.';
    if (f.phone.replace(/\D/g, '').length < 8) errs.phone = 'Please enter a phone number we can reach you on.';
    if (!f.bike) errs.bike = 'Please tell us which bike (make / type).';
    form.querySelectorAll<HTMLElement>('[data-err]').forEach((p) => (p.textContent = errs[p.dataset.err!] || ''));
    const first = Object.keys(errs)[0];
    if (first) { form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    const msg = ['Hi Gangjung Traders, I\'d like to book a service.', '', `- *Service:* ${f.service}`, `- *Service centre:* ${f.centre}`, ...(f.date ? [`- *Preferred date:* ${f.date}`] : []), `- *Bike:* ${f.bike}`, `- *Name:* ${f.name}`, `- *Phone:* ${f.phone}`, ...(f.notes ? ['', `*Notes:* ${f.notes}`] : []), '', 'Please confirm a time. Thank you.'].join('\n');
    window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
    status.textContent = 'WhatsApp opened in a new tab — press send there to request your booking.';
  });
});

document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const f = { name: val(d, 'name'), email: val(d, 'email'), phone: val(d, 'phone'), subject: val(d, 'subject'), message: val(d, 'message') };
    const errs: Record<string, string> = {};
    if (!f.name) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errs.email = 'Please enter a valid email address.';
    if (f.message.length < 10) errs.message = 'Please write a message (at least 10 characters).';
    form.querySelectorAll<HTMLElement>('[data-err]').forEach((p) => (p.textContent = errs[p.dataset.err!] || ''));
    const first = Object.keys(errs)[0];
    if (first) { form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    const subject = `${f.subject} — website enquiry from ${f.name}`;
    const body = ['Hi Gangjung Traders,', '', f.message, '', '—', `Name: ${f.name}`, `Email: ${f.email}`, ...(f.phone ? [`Phone: ${f.phone}`] : []), `Subject: ${f.subject}`, 'Sent from the Gangjung Traders website contact form'].join('\n');
    window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email app should now be open — press send there to deliver your message.';
  });
});
