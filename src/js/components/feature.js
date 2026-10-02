// Feature cards: pointer spotlight on every card, voltage picker in the "5V / 9V / 12V" card.
import { canHover, reducedMotion } from '../core/env.js';
import { watchInView } from '../core/in-view.js';

const AUTO_INTERVAL = 3000; // ms between automatic voltage changes until the visitor picks one
const FADE_OUT = 250; // ms, matches the .is-swapping transition in _feature.scss

const voltHint = (volt) => `Перевірте напругу на адаптері вашого роутера: ${volt} — оберіть вихід ${volt}.`;

function initSpotlight(card) {
  let pointerX = 0;
  let pointerY = 0;
  let scheduled = false;

  const draw = () => {
    scheduled = false;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--feature-spot-x', `${pointerX - rect.left}px`);
    card.style.setProperty('--feature-spot-y', `${pointerY - rect.top}px`);
  };

  // The pointer can move several times per frame: keep the last position and draw once per frame.
  card.addEventListener('mousemove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(draw);
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

  // Auto-play runs only while the card is on screen and stops for good once the visitor picks a voltage.
  let autoPlay = !reducedMotion.matches;
  let timer = 0;

  const pause = () => {
    window.clearInterval(timer);
    timer = 0;
  };

  const play = () => {
    if (autoPlay && !timer) timer = window.setInterval(() => select((pending + 1) % buttons.length), AUTO_INTERVAL);
  };

  if (autoPlay) watchInView(card, (inView) => (inView ? play() : pause()));

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      autoPlay = false;
      pause();
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
