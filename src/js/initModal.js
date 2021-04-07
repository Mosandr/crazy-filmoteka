import 'materialize-css/dist/js/materialize.min.js';

export default function initModal() {
  document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('.modal');
    const options = {
      onCloseEnd: function () {
        const over = document.querySelector('.over');
        over.classList.remove('is-shown');
      },
    };
    M.Modal.init(elems, options);
  });

  // close modal-login while opening modal-signup

  const signUpBtn = document.querySelector('[data-target="modal-signup"]');
  signUpBtn.addEventListener('click', () => {
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
  });

  const modalTriger = document.querySelector('.gallery__list');

  modalTriger.addEventListener('click', event => {
    if (event.target.nodeName === 'UL') return;
    const over = document.querySelector('.over');
    over.classList.add('is-shown');
  });
}
