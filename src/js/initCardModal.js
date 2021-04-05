import filmCardModalTmp from '../templates/film-card-modal-tmp.hbs';
import filmCardModalImgTmp from '../templates/film-card-img-modal-tmp.hbs';

export default class ModalCreate {
  constructor() {
    this.modalInsert = document.querySelector('.card-data-insert');
    this.modalInsertImg = document.querySelector('.description-insert');
    this.closeBtn = document.querySelector('.data__modal__film-close-btn');
    this.modal = document.querySelector('#modal-card');
    this.teamLink = document.querySelector('[data-js="team-link"]');
    this.teamCloseBtn = document.querySelector('.team-close-btn');
    this.modalTeam = document.querySelector('#modal-team');
  }

  render(modalInsertObj) {
    this.clear();
    const arr = [];
    arr.push(modalInsertObj);
    const markup = filmCardModalImgTmp(arr);
    this.modalInsert.insertAdjacentHTML('afterbegin', markup);
  }
  renderPhoto(modalInsertObj) {
    this.clear();
    const arr = [];
    arr.push(modalInsertObj);
    const markup = filmCardModalTmp(arr);
    this.modalInsertImg.insertAdjacentHTML('afterbegin', markup);
  }

  clear() {
    this.modalInsert.innerHTML = '';
  }
  closeByCross() {
    M.Modal.getInstance(this.modal).close();
  }
  init() {
    this.closeBtn.addEventListener('click', this.closeByCross.bind(this));
  }
  modalTeamCross() {
    this.teamCloseBtn.addEventListener('click', () => {
      M.Modal.getInstance(this.modalTeam).close();
    });
  }
}
