const menu = document.querySelector<HTMLDetailsElement>('[data-mobile-navigation]');
const summary = menu?.querySelector('summary');
menu?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.open) {
    menu.open = false;
    summary?.focus();
  }
});
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.open = false;
  const target = document.querySelector<HTMLElement>(link.hash);
  target?.setAttribute('tabindex', '-1');
  target?.focus({ preventScroll: true });
}));
document.addEventListener('click', (event) => {
  if (menu?.open && event.target instanceof Node && !menu.contains(event.target)) menu.open = false;
});
const desktop = window.matchMedia('(min-width: 1024px)');
desktop.addEventListener('change', () => { if (desktop.matches && menu) menu.open = false; });

function syncLanguageLinks() {
  document.querySelectorAll<HTMLAnchorElement>('[data-language-link]').forEach((link) => { link.hash = window.location.hash; });
}
syncLanguageLinks();
window.addEventListener('hashchange', syncLanguageLinks);

const motionButton = document.querySelector<HTMLButtonElement>('[data-motion-toggle]');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
function syncMotionPreference() {
  if (motionButton) motionButton.hidden = motionPreference.matches;
  document.documentElement.classList.toggle('motion-ready', !motionPreference.matches);
}
syncMotionPreference();
motionPreference.addEventListener('change', syncMotionPreference);
motionButton?.addEventListener('click', () => {
  const paused = document.documentElement.classList.toggle('motion-paused');
  motionButton.setAttribute('aria-pressed', String(paused));
  motionButton.textContent = (paused ? motionButton.dataset.resume : motionButton.dataset.pause) ?? '';
});
