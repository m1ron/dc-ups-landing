// Tech details tabs: sliding thumb and panel track (--specs-tab), WAI-ARIA tabs keyboard contract.
import { nextIndex } from '../core/keys.js';

export function initSpecs() {
  const specs = document.querySelector('.specs');
  if (!specs) return;
  const tabs = [...specs.querySelectorAll('.specs__tab')];
  const panels = [...specs.querySelectorAll('.specs__panel')];
  const thumb = specs.querySelector('.specs__thumb');
  const track = specs.querySelector('.specs__track');
  let current = tabs.findIndex((tab) => tab.classList.contains('is-active'));

  const setTab = (index) => {
    if (index === current) return;
    current = index;
    // Set on the two elements that consume it, not on the block.
    thumb.style.setProperty('--specs-tab', index);
    track.style.setProperty('--specs-tab', index);
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel, i) => {
      const active = i === index;
      panel.classList.toggle('is-active', active);
      panel.setAttribute('aria-hidden', String(!active));
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setTab(index));
    tab.addEventListener('keydown', (event) => {
      const next = nextIndex(event.key, index, tabs.length);
      if (next === -1) return;
      event.preventDefault();
      setTab(next);
      tabs[next].focus();
    });
  });
}
