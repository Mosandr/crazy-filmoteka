import './sass/styles.scss';
import UiService from './js/uiService';
import header from './partials/header.html';
import footer from './partials/footer.html';
import auth from './partials/modals.html';
import ServiceDB from './js/serviceDB.js';
import Auth from './js/auth.js';

// import Preloader from './js/preloader-backdrop';
import ModalCreate from './js/initCardModal';

const bodyRef = document.querySelector('BODY');

bodyRef.insertAdjacentHTML('afterbegin', header);
bodyRef.insertAdjacentHTML('beforeend', footer);
bodyRef.insertAdjacentHTML('afterbegin', auth);

const ui = new UiService();
const serviceDB = new ServiceDB();
const authorization = new Auth();
const modalCreate = new ModalCreate();

ui.init();

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
