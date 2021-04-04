//Класс с полями-свойствами
// refs - объект в оплях которого ссылки на все основные елементы страницы:
// хедер, лого, строка поиска, кнопки хоум и библиотека, все кнопки хедера, галерея, футер
// Методы:
//

import Header from './header';
import Footer from './footer';
import MovieGallery from './movie-gallery';
import initModal from './initModal.js';
import ModalCreate from './initCardModal';

// import MovieCardModal from './movieCardModal';
import Paginator from './paginator';

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
      homeBtn: document.querySelector('[data-js="home-btn"]'),
    };
    return refs;
  }

  getCurrentPage() {
    const url = location.href;

    if (!url.includes('page=')) return 1;

    let index = url.indexOf('page=') + String('page=').length;

    return url.slice(index);
  }

  isMyLibraryPageOpen() {
    const url = location.href;
    if (url.includes('my-library')) return true;
    return false;
  }

  isSearchSubmited() {
    const url = location.href;
    if (url.includes('query')) return true;
    return false;
  }

  onSearchSubmit(event) {
    if (event.currentTarget.query.value.trim() === '') {
      event.preventDefault();
      event.currentTarget.querySelector('.search-form__error').textContent =
        'Search query was empty. Enter the movie name and try again';
    }
  }

  async init() {
    const header = new Header();
    const footer = new Footer();
    initModal();
    header.init();
    footer.init();

    this.refs.homeBtn.addEventListener(
      'click',
      this.showPopularFilms.bind(this, 1),
    );

    this.refs.movieGallery.addEventListener(
      'click',
      this.onMovieItemClick.bind(this),
    );

    this.refs.pageHeader
      .querySelector('.search-form')
      .addEventListener('submit', this.onSearchSubmit);

    if (this.isMyLibraryPageOpen()) {
      header.onMyLibraryLinkClick();
      // рисуем просмотренные фильмы в галерею
      return;
    }

    if (this.isSearchSubmited()) {
      const query = location.search.slice(7).split('&')[0];
      console.log('Query: ', query);
      const page = this.getCurrentPage();
      console.log('Page: ', page);
      this.showSearchFilms(query, page);
      return;
    }

    this.showPopularFilms(this.getCurrentPage());

    // вешаем слушатели на кнопки навигации
    // при нажатии на кнопку MyLibrary - вешаем слушатели на кнопки Watch и Queue
    // при нажатии на кнопку Home снимаем слушатели с кнопки Watch и Queue
  }

  async onMovieItemClick(event) {
    if (event.target.nodeName === 'UL') return;
    const movieId = event.target.parentNode.dataset.id;
    this.refs.watchBtn.dataset.id = movieId;
    this.refs.queueBtn.dataset.id = movieId;

    console.log(movieId);
    try {
      const data = await api.fetchFilmById(movieId);
      this.refs.watchBtn.dataset.ob = JSON.stringify(data);
      this.refs.queueBtn.dataset.ob = JSON.stringify(data);

      // тут ренедрим модалку фильма по данным data
      const modalCreate = new ModalCreate();
      modalCreate.render(data);
      modalCreate.init();
      console.log(data);

      //       const movieModal = new MovieCardModal();
      //       movieModal.renderMovieModal(data);
    } catch (e) {
      console.log(e);
    }
  }

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

      const paginator = new Paginator();
      paginator.create(this.getCurrentPage(), data.total_results, 'home');
    } catch (e) {
      console.log('error');
    }
  }

  async showSearchFilms(query, page = 1) {
    try {
      const data = await api.fetchFilmsOnSearch(query, page);
      const genresData = await api.fetchGenresList();
      if (!data.total_results > 0) throw error;

      const movieList = this.prepareDataForMarkup(
        data.results,
        genresData.genres,
      );

      const movieGallery = new MovieGallery();
      movieGallery.render(movieList);

      if (data.total_results / 20 > 1) {
        const paginator = new Paginator();
        paginator.create(
          this.getCurrentPage(),
          data.total_results,
          `query=${query}`,
        );
      }
      this.refs.pageHeader.querySelector('.search-form-input').value = query;
    } catch (e) {
      this.refs.pageHeader.querySelector('.search-form__error').textContent =
        'Search result not successful. Enter the correct movie name and try again';
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
      movie.year = movie.release_date ? movie.release_date.slice(0, 4) : '';

      return movie;
    });

    return preparedMovieList;
  }
}
