// Order dialog: open / close, payment choice, and the "order accepted" state.
// The form does not send anything yet: submitting only shows the confirmation.
import { nextIndex } from '../core/keys.js';

const SUBMIT_LABELS = ['Перейти до оплати', 'Підтвердити замовлення']; // by payment option: card, cash on delivery

export function initOrder() {
  const order = document.querySelector('.order');
  if (!order) return;
  const card = order.querySelector('.order__card');
  const form = order.querySelector('.order__form');
  const pays = [...order.querySelectorAll('.order__pay')];
  const submitLabel = order.querySelector('.order__submit-label');
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

  const setPay = (index) => {
    pays.forEach((pay, i) => {
      const selected = i === index;
      pay.classList.toggle('is-selected', selected);
      pay.setAttribute('aria-checked', String(selected));
      pay.tabIndex = selected ? 0 : -1;
    });
    submitLabel.textContent = SUBMIT_LABELS[index];
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

  pays.forEach((pay, index) => {
    pay.addEventListener('click', () => setPay(index));
    pay.addEventListener('keydown', (event) => {
      const next = nextIndex(event.key, index, pays.length);
      if (next === -1) return;
      event.preventDefault();
      setPay(next);
      pays[next].focus();
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    order.classList.add('is-sent');
  });
}
