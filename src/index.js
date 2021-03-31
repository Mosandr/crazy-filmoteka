import './sass/styles.scss';
import UiService from './js/uiService';
import './js/auth.js';
import header from './partials/header.html';
import footer from './partials/footer.html';

const bodyRef = document.querySelector('BODY');

bodyRef.insertAdjacentHTML('afterbegin', header);
bodyRef.insertAdjacentHTML('beforeend', footer);

const ui = new UiService();

ui.init();
