// Sticky buy bar: shown after the first screen, hidden again once the order section is on screen.
const SHOW_AFTER = 560; // px scrolled
const HIDE_AT = 0.75; // share of the viewport height the order section's top has to cross

export function initStickyBar() {
  const bar = document.querySelector('.sticky-bar');
  if (!bar) return;
  const buy = document.querySelector('.buy');

  const update = () => {
    const buyOnScreen = buy && buy.getBoundingClientRect().top < window.innerHeight * HIDE_AT;
    bar.classList.toggle('is-visible', window.scrollY > SHOW_AFTER && !buyOnScreen);
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}
