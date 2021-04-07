import 'materialize-css/dist/js/materialize.min.js';

export default function initModal() {
  document.addEventListener('DOMContentLoaded', function () {
    const authModals = document.querySelectorAll('.auth-modal');
    M.Modal.init(authModals);
    const cardModals = document.querySelectorAll('.data__modal__film');
    const options = {
      onCloseEnd: function () {
        const over = document.querySelector('.over');
        over.classList.remove('is-shown');

        // location.reload();
      },
    };
    M.Modal.init(cardModals, options);
    const teamModals = document.querySelectorAll('.modal-team-container');
    const optionsTeam = {
      onCloseEnd: function () {
        const overTeam = document.querySelector('.team-overlay');
        overTeam.classList.remove('is-shown-team');
      },
    };
    M.Modal.init(teamModals, optionsTeam);
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
  const modalTeam = document.querySelector('[data-target="modal-team"]');

  modalTeam.addEventListener('click', () => {
    const overTeam = document.querySelector('.team-overlay');
    overTeam.classList.add('is-shown-team');
  });
}
