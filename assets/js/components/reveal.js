// Scroll reveal: adds .is-revealed to .reveal elements when they enter the viewport (styles in reveal.css).
const ROOT_MARGIN = '0px 0px -8% 0px'; // reveal a little after the element's top edge enters

export function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: ROOT_MARGIN });

  items.forEach((item) => observer.observe(item));
}
