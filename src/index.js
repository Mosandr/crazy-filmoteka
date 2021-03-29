import './sass/styles.scss';
import './js/auth.js';

import header from './partials/header.html';
import footer from './partials/footer.html';

const bodyRef = document.querySelector('BODY');

bodyRef.insertAdjacentHTML('afterbegin', header);
bodyRef.insertAdjacentHTML('beforeend', footer);
