import './sass/styles.scss';
import UiService from './js/uiService';
import './js/auth.js';
import header from './partials/header.html';
import footer from './partials/footer.html';
import auth from './partials/authModal.html';
import initFirebase from './js/auth.js';
import initModal from './js/initModal.js';

const bodyRef = document.querySelector('BODY');

bodyRef.insertAdjacentHTML('afterbegin', header);
bodyRef.insertAdjacentHTML('beforeend', footer);
bodyRef.insertAdjacentHTML('afterbegin', auth);

const ui = new UiService();

ui.init();

initFirebase();
initModal();
