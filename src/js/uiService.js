//Класс с полями-свойствами
// refs - объект в оплях которого ссылки на все основные елементы страницы:
// хедер, лого, строка поиска, кнопки хоум и библиотека, все кнопки хедера, галерея, футер
// Методы:
//

import Header from './header';
import Footer from './footer';
import MovieGallery from './movie-gallery';
import ModalCreate from './initCardModal';

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
      watchBtn: document.querySelector('.data__modal__film-add-to-watched'),
      queueBtn: document.querySelector('.data__modal__film-add-to-queue'),
    };
    return refs;
  }

  init() {
    const header = new Header();
    const footer = new Footer();

    header.init();
    footer.init();
    this.showPopularFilms();
    header.refs.searcForm.addEventListener(
      'click',
      this.onSearchBtnClick.bind(this),
    );

    this.refs.movieGallery.addEventListener(
      'click',
      this.onMovieItemClick.bind(this),
    );

    // вешаем слушатели на кнопки навигации
    // при нажатии на кнопку MyLibrary - вешаем слушатели на кнопки Watch и Queue
    // при нажатии на кнопку Home снимаем слушатели с кнопки Watch и Queue
  }

  async onSearchBtnClick(event) {
    if (event.target.nodeName !== 'BUTTON' && event.target.nodeName !== 'svg')
      return;
    const query = event.currentTarget.elements.query.value;
    const errorRef = event.currentTarget.querySelector('.search-form__error');
    errorRef.textContent = '';
    try {
      const data = await api.fetchFilmsOnSearch(query);
      const genresData = await api.fetchGenresList();
      const movieList = this.prepareDataForMarkup(
        data.results,
        genresData.genres,
      );
      if (data.results.length === 0) {
        throw error;
      }
      const movieGallery = new MovieGallery();
      movieGallery.render(movieList);
    } catch (e) {
      errorRef.textContent =
        'Search result not successful. Enter the correct movie name and try again';
    }

    // запрашиваем фильмы с сревера по запросу
    //api.fetchFilmsOnSearch(query)
    //обрабатываем данные и собираем их в масив объектов - movieList
    //рисуем галерею фильмов метод класса MovieGallery.render(movieList)
  }

  async onMovieItemClick(event) {
    if (event.target.nodeName === 'UL') return;
    const movieId = event.target.parentNode.dataset.id;
    this.refs.watchBtn.dataset.id = movieId;
    this.refs.queueBtn.dataset.id = movieId;
    console.log(this.refs.watchBtn);

    console.log(movieId);
    try {
      const data = await api.fetchFilmById(movieId);
      this.refs.watchBtn.dataset.ob = JSON.stringify(data);
      this.refs.queueBtn.dataset.ob = JSON.stringify(data);
      console.log(this.refs.watchBtn);

      // тут ренедрим модалку фильма по данным data
      const modalCreate = new ModalCreate();
      modalCreate.render(data);
      modalCreate.init();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  onHomeBtnClick(event) {}

  onMyLibraryBtnClick(event) {}

  onWatchedBtnClick(event) {}

  onQueueBtnClick(event) {}

  async showPopularFilms(page = 1) {
    try {
      const data = await api.fetchPopularFilms(page);
      const genresData = await api.fetchGenresList();
      const movieList = this.prepareDataForMarkup(
        data.results,
        genresData.genres,
      );
      const movieGallery = new MovieGallery();
      movieGallery.render(movieList);
    } catch (e) {
      console.log('error');
    }
  }

  prepareDataForMarkup(movieList, genres) {
    let genre = null;
    const preparedMovieList = movieList.map(movie => {
      const genresNames = movie.genre_ids.reduce((acc, id) => {
        genre = genres.find(item => item.id == id);
        acc.push(genre.name);
        return acc;
      }, []);

      movie.genres = genresNames.join(', ');
      movie.year = movie.release_date.slice(0, 4);

      return movie;
    });

    return preparedMovieList;
  }
}
