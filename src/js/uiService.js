//Класс с полями-свойствами
// refs - объект в оплях которого ссылки на все основные елементы страницы:
// хедер, лого, строка поиска, кнопки хоум и библиотека, все кнопки хедера, галерея, футер
// Методы:
//

import Header from './header';
import Footer from './footer';
import MovieGallery from './movie-gallery';
import ApiService from './apiService';
const api = new ApiService();

export default class UiService {
  constructor() {
    this.refs = this.getGefs();
  }

  getGefs() {
    const refs = {
      pageHeader: document.querySelector('[data-js="page-header"]'),
      movieGallery: document.querySelector('[data-js="movie-gallery"]'),
      pageFooter: document.querySelector('[data-js="page-footer"]'),
    };
    return refs;
  }

  init() {
    const header = new Header();
    const footer = new Footer();
    header.init();
    footer.init();
    this.showPopularFilms();

    // вешаем слушатели на кнопку поиска
    // вешаем слушатели на кнопки навигации
    // при нажатии на кнопку MyLibrary - вешаем слушатели на кнопки Watch и Queue
    // при нажатии на кнопку Home снимаем слушатели с кнопки Watch и Queue
  }

  onSearchBtnClick(event) {
    // запрашиваем фильмы с сревера по запросу
    //api.fetchFilmsOnSearch(query)
    //обрабатываем данные и собираем их в масив объектов - movieList
    //рисуем галерею фильмов метод класса MovieGallery.render(movieList)
  }

  onHomeBtnClick(event) {}

  onMyLibraryBtnClick(event) {}

  onWatchedBtnClick(event) {}

  onQueueBtnClick(event) {}

  async showPopularFilms(page = 1) {
    try {
      const data = await api.fetchPopularFilms(page);
      const movieGallery = new MovieGallery();
      movieGallery.render(data.results);
    } catch (e) {}
  }
}

/* API TEST*/
// api.fetchPopularFilms().then(onSucces).catch(onError);
// api.fetchFilmsOnSearch('green mile', 1).then(onSucces).catch(onError);

// api.fetchFilmById(497).then(onSucces).catch(onError);

// function onSucces(data) {
//   console.dir(data);
// }

// function onError(e) {
//   console.dir(e);
// }
