// "How it works" demo: switches between mains power and a power cut (.is-on on the block; colours in _demo.scss).
import { reducedMotion } from '../core/env.js';
import { watchInView } from '../core/in-view.js';

const AUTO_INTERVAL = 9000; // ms between automatic switches until the visitor uses the switch

export function initDemo() {
  const demo = document.querySelector('.demo');
  if (!demo) return;
  const buttons = [...demo.querySelectorAll('.demo__switch-btn')];
  const whenOn = demo.querySelectorAll('.demo__when-on');
  const whenOff = demo.querySelectorAll('.demo__when-off');
  let isOn = demo.classList.contains('is-on');

  const setPower = (on) => {
    if (on === isOn) return;
    isOn = on;
    demo.classList.toggle('is-on', on);
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String((button.dataset.power === 'on') === on));
    });
    // Both texts stay in the DOM for the cross-fade; only the visible one is exposed to screen readers.
    whenOn.forEach((text) => text.setAttribute('aria-hidden', String(!on)));
    whenOff.forEach((text) => text.setAttribute('aria-hidden', String(on)));
  };

  // Auto-play runs only while the demo is on screen and stops for good once the visitor uses the switch.
  // No auto-play under reduced motion: the demo only changes when the visitor asks.
  let autoPlay = !reducedMotion.matches;
  let timer = 0;

  const pause = () => {
    window.clearInterval(timer);
    timer = 0;
  };

  const play = () => {
    if (autoPlay && !timer) timer = window.setInterval(() => setPower(!isOn), AUTO_INTERVAL);
  };

  if (autoPlay) watchInView(demo, (inView) => (inView ? play() : pause()));

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      autoPlay = false;
      pause();
      setPower(button.dataset.power === 'on');
    });
  });
}
