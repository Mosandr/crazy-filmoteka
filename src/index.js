import './sass/styles.scss';
import UiService from './js/uiService';
import header from './partials/header.html';
import footer from './partials/footer.html';
import auth from './partials/authModal.html';
import Server from './js/serviceDB.js';
import Auth from './js/auth.js';

import initModal from './js/initModal.js';

const bodyRef = document.querySelector('BODY');

bodyRef.insertAdjacentHTML('afterbegin', header);
bodyRef.insertAdjacentHTML('beforeend', footer);
bodyRef.insertAdjacentHTML('afterbegin', auth);

const ui = new UiService();
const server = new Server();
const authorization = new Auth();

ui.init();

initModal();

authorization.init();

server.auth.onAuthStateChanged(user => {
  if (user) {
    authorization.setupUI(user);
    server.renewQueueList(user);
    server.renewWatchedList(user);
    server.getActualQueueLists(user);
    server.getActualWatchedLists(user);
  } else {
    authorization.setupUI();
  }
});
