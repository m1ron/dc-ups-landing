// Arrow-key navigation for single-select groups (tabs, radios): the WAI-ARIA roving tabindex contract.

/**
 * Returns the index the given key moves to, or -1 when the key is not a navigation key.
 * Arrows wrap around, Home / End jump to the ends.
 */
export function nextIndex(key, current, count) {
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return (current + 1) % count;
    case 'ArrowLeft':
    case 'ArrowUp':
      return (current - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return -1;
  }
}
