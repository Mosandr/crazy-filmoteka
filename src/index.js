import './sass/styles.scss';
import Header from './js/header';
import './js/auth.js';

import header from './partials/header.html';
import footer from './partials/footer.html';

const bodyRef = document.querySelector('BODY');

bodyRef.insertAdjacentHTML('afterbegin', header);
bodyRef.insertAdjacentHTML('beforeend', footer);

const headerUi = new Header();

console.log(headerUi.refs.linkHome);

headerUi.init();

import ApiServer from './js/apiService.js';
const api = new ApiServer();

/* API TEST*/
// // api.fetchPopularFilms().then(onSucces).catch(onError);
// // api.fetchFilmsOnSearch('green mile', 1).then(onSucces).catch(onError);

// api.fetchFilmById(497).then(onSucces).catch(onError);

// function onSucces(data) {
//   console.dir(data);
// }

// function onError(e) {
//   console.dir(e);
// }
