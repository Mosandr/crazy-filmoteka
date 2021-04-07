import './sass/styles.scss';

import header from './partials/header.html';
import footer from './partials/footer.html';
import auth from './partials/modals.html';

import UiService from './js/uiService';
import ServiceDB from './js/serviceDB.js';
import Auth from './js/auth.js';
import ModalCreate from './js/initCardModal.js';
import Location from './js/location';

const bodyRef = document.querySelector('BODY');
const mainRef = document.querySelector('MAIN');

bodyRef.insertAdjacentHTML('afterbegin', auth);
bodyRef.insertAdjacentHTML('afterbegin', header);
mainRef.insertAdjacentHTML('afterend', footer);

const ui = new UiService();
const serviceDB = new ServiceDB();
const authorization = new Auth();
const modalCreate = new ModalCreate();

ui.init();

authorization.init();

modalCreate.modalTeamCross();

serviceDB.auth.onAuthStateChanged(user => {
  if (user) {
    authorization.setupUI(user);
    serviceDB.renewQueueList(user);
    serviceDB.renewWatchedList(user);
    serviceDB.getActualQueueLists(user);
    serviceDB.loginMessage(user);
    if (Location.isMyLibraryPageOpen()) {
      serviceDB.getActualWatchedLists(user);
      serviceDB.dataForQueuePagination(user, 2);
      serviceDB.dataForWatchedPagination(user, 2);
    }
  } else {
    authorization.setupUI();
    if (Location.isMyLibraryPageOpen()) {
      serviceDB.loginMessage();
      ui.refs.pageFooter.style.position = 'fixed';
    }
  }
});
