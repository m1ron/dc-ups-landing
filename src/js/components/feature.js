// Feature cards: pointer spotlight on every card, voltage picker in the "5V / 9V / 12V" card.
import { canHover, reducedMotion } from '../core/env.js';

const AUTO_INTERVAL = 3000; // ms between automatic voltage changes until the visitor picks one
const FADE_OUT = 250; // ms, matches the .is-swapping transition in feature.css

const voltHint = (volt) => `Перевірте напругу на адаптері вашого роутера: ${volt} — оберіть вихід ${volt}.`;

function initSpotlight(card) {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--feature-spot-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--feature-spot-y', `${event.clientY - rect.top}px`);
  });
}

function initVoltPicker(card) {
  const buttons = [...card.querySelectorAll('.feature__volt')];
  const text = card.querySelector('.feature__text--volt');
  if (!buttons.length || !text) return;

  let current = buttons.findIndex((button) => button.classList.contains('is-active'));
  let pending = current;

  const apply = () => {
    current = pending;
    buttons.forEach((button, index) => {
      const active = index === current;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    text.textContent = voltHint(buttons[current].textContent.trim());
    text.classList.remove('is-swapping');
  };

  // A timer, not transitionend: transitions don't run in a hidden tab, and the swap must not wait for one.
  let swapTimer = 0;
  const select = (index) => {
    if (index === pending) return;
    pending = index;
    if (swapTimer) return;
    text.classList.add('is-swapping');
    swapTimer = window.setTimeout(() => {
      swapTimer = 0;
      apply();
    }, FADE_OUT);
  };

  let timer = reducedMotion.matches
    ? 0
    : window.setInterval(() => select((pending + 1) % buttons.length), AUTO_INTERVAL);

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      window.clearInterval(timer);
      timer = 0;
      select(index);
    });
  });
}

export function initFeatures() {
  document.querySelectorAll('.feature').forEach((card) => {
    if (canHover.matches) initSpotlight(card);
    if (card.classList.contains('feature--volt')) initVoltPicker(card);
  });
}
