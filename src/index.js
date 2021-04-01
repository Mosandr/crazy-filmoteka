import './sass/styles.scss';
import UiService from './js/uiService';
import './js/auth.js';
import header from './partials/header.html';
import footer from './partials/footer.html';
import Preloader from './js/preloader-backdrop';

const bodyRef = document.querySelector('BODY');

bodyRef.insertAdjacentHTML('afterbegin', header);
bodyRef.insertAdjacentHTML('beforeend', footer);
bodyRef.insertAdjacentHTML('afterbegin', auth);

const ui = new UiService();

ui.init();

initFirebase();
initModal();
