import 'materialize-css/dist/js/materialize.min.js';

export default function initModal() {
  document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  });

  // close modal-login while opening modal-signup

  const signUpBtn = document.querySelector('[data-target="modal-signup"]');
  signUpBtn.addEventListener('click', () => {
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
  });
}
