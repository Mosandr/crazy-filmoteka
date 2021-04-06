import './sass/styles.scss';

import header from './partials/header.html';
import footer from './partials/footer.html';
import auth from './partials/modals.html';

import UiService from './js/uiService';
import ServiceDB from './js/serviceDB.js';
import Auth from './js/auth.js';

import ModalCreate from './js/initCardModal';

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
ui.btnDisabledChange();

// modalCreate.modalTeamCross();

authorization.init();

serviceDB.auth.onAuthStateChanged(user => {
  if (user) {
    authorization.setupUI(user);
    serviceDB.renewQueueList(user);
    serviceDB.renewWatchedList(user);
    serviceDB.getActualQueueLists(user);
    if (ui.isMyLibraryPageOpen()) {
      serviceDB.getActualWatchedLists(user);
    }
  } else {
    authorization.setupUI();
  }
});
