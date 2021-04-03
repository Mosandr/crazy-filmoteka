import filmCardModalTmp from '../templates/film-card-modal-tmp.hbs';

export default class ModalCreate {
  constructor() {
    this.modalInsert = document.querySelector('.card-data-insert');
    this.closeBtn = document.querySelector('.data__modal__film-close-btn');
    this.modal = document.querySelector('#modal-card');
  }

  render(modalInsertObj) {
    this.clear();
    const arr = [];
    arr.push(modalInsertObj);
    const markup = filmCardModalTmp(arr);
    this.modalInsert.insertAdjacentHTML('afterbegin', markup);
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
}
