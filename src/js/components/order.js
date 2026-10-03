// Order dialog: open / close and the "order accepted" state.
// The form does not send anything yet: submitting only shows the confirmation.
export function initOrder() {
  const order = document.querySelector('.order');
  if (!order) return;
  const card = order.querySelector('.order__card');
  const form = order.querySelector('.order__form');
  const success = order.querySelector('.order__success');
  let opener = null;

  const open = (event) => {
    event.preventDefault();
    opener = event.currentTarget;
    form.reset();
    order.classList.remove('is-sent');
    order.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    card.focus({ preventScroll: true });
  };

  const close = () => {
    if (!order.classList.contains('is-open')) return;
    order.classList.remove('is-open');
    document.body.style.overflow = '';
    if (opener) opener.focus({ preventScroll: true });
  };

  // Buy buttons live in other blocks (header, hero, order section, sticky bar).
  document.querySelectorAll('[data-order-open]').forEach((trigger) => trigger.addEventListener('click', open));
  order.querySelectorAll('.order__backdrop, .order__close, .order__done').forEach((control) => {
    control.addEventListener('click', close);
  });

  order.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      close();
      return;
    }
    if (event.key !== 'Tab') return;
    // Keep Tab inside the dialog while it is open.
    const focusable = [...card.querySelectorAll('button, input, a[href]')].filter((el) => el.offsetParent !== null && el.tabIndex !== -1);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && (document.activeElement === first || document.activeElement === card)) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    order.classList.add('is-sent');
    // The form is gone now: move focus to the confirmation so it is read out and Tab stays in the dialog.
    success.focus({ preventScroll: true });
  });
}
