// FAQ accordion: one item open at a time; clicking the open item closes it.
export function initFaq() {
  const faq = document.querySelector('.faq');
  if (!faq) return;
  const items = [...faq.querySelectorAll('.faq__item')];
  const questions = items.map((item) => item.querySelector('.faq__question'));

  const setOpen = (openIndex) => {
    items.forEach((item, index) => {
      const open = index === openIndex;
      item.classList.toggle('is-open', open);
      questions[index].setAttribute('aria-expanded', String(open));
    });
  };

  questions.forEach((question, index) => {
    question.addEventListener('click', () => {
      setOpen(items[index].classList.contains('is-open') ? -1 : index);
    });
  });
}
