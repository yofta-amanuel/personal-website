// 1. Dynamic greeting based on time of day
const hour = new Date().getHours();
const part = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
document.getElementById('greeting').textContent = part + ", I'm Amanuel.";

// 2. Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });

// 3. Dark/light theme, saved in localStorage
const themeBtn = document.getElementById('themeBtn');
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  themeBtn.textContent = t === 'dark' ? 'Light' : 'Dark';
}
applyTheme(localStorage.getItem('theme') || 'light');
themeBtn.addEventListener('click', () => {
  const t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', t);
  applyTheme(t);
});

// 4. Skill bars fill when scrolled into view
const bars = document.querySelectorAll('.fill');
const obs = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) { en.target.style.width = en.target.dataset.level + '%'; obs.unobserve(en.target); }
  });
}, { threshold: 0.4 });
bars.forEach(b => obs.observe(b));

// 5. Project filtering
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.card');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  cards.forEach(c => c.classList.toggle('hidden', btn.dataset.filter !== 'all' && c.dataset.category !== btn.dataset.filter));
}));

// 6. Project details modal
const modal = document.getElementById('modal');
document.querySelectorAll('.link-btn').forEach(b => b.addEventListener('click', () => {
  document.getElementById('modalTitle').textContent = b.dataset.title;
  document.getElementById('modalText').textContent = b.dataset.text;
  modal.showModal();
}));
document.getElementById('modalClose').addEventListener('click', () => modal.close());

// 7. Contact form validation
const form = document.getElementById('contactForm');
function check(id, test, msg) {
  const field = document.getElementById(id);
  const ok = test(field.value.trim());
  document.getElementById(id + 'Error').textContent = ok ? '' : msg;
  field.classList.toggle('invalid', !ok);
  return ok;
}
form.addEventListener('submit', e => {
  e.preventDefault();
  const a = check('name', v => v.length >= 3, 'Enter your full name (at least 3 characters).');
  const b = check('email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Enter a valid email, like name@example.com.');
  const c = check('message', v => v.length >= 10, 'Write at least 10 characters.');
  const status = document.getElementById('formStatus');
  if (a && b && c) { status.textContent = 'Thank you! Your message was validated (demo only, nothing is sent).'; form.reset(); }
  else status.textContent = '';
});
