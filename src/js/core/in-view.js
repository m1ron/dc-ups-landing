// Tells a block when it enters and leaves the viewport, so timers run only while it can be seen.
export function watchInView(element, onChange) {
  const observer = new IntersectionObserver(([entry]) => onChange(entry.isIntersecting));
  observer.observe(element);
}
