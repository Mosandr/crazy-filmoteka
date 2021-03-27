import './sass/main.css';
import header from './partials/header.html';
import footer from './partials/footer.html';

const bodyRef = document.querySelector('BODY');

bodyRef.insertAdjacentHTML('afterbegin', header);
bodyRef.insertAdjacentHTML('beforeend', footer);
