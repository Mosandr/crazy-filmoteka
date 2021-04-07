import Header from './header';
import MovieGallery from './movie-gallery';
import initModal from './initModal.js';
import ModalCreate from './initCardModal';
import ServiceDB from './serviceDB.js';
import Location from './location';

const serviceDB = new ServiceDB();

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

  async init() {
    this.btnDisabledChange();
    const header = new Header();
    initModal();
    header.init();

    this.refs.homeBtn.addEventListener(
      'click',
      this.showPopularFilms.bind(this, 1),
    );

    this.refs.movieGallery.addEventListener(
      'click',
      this.onMovieItemClick.bind(this),
    );

    if (Location.isMyLibraryPageOpen()) {
      header.onMyLibraryLinkClick();

      // рисуем просмотренные фильмы в галерею
      return;
    }

    if (Location.isSearchSubmited()) {
      const query = location.search.slice(7).split('&')[0];
      const page = Location.getCurrentPage();
      this.showSearchFilms(query, page);
      return;
    }

    this.showPopularFilms(Location.getCurrentPage());
  }

  async onMovieItemClick(event) {
    if (event.target.nodeName === 'UL') return;
    const movieId = event.target.parentNode.dataset.id;
    this.refs.watchBtn.dataset.id = movieId;
    this.refs.queueBtn.dataset.id = movieId;

    try {
      const data = await api.fetchFilmById(movieId);
      this.refs.watchBtn.dataset.ob = JSON.stringify(data);
      this.refs.queueBtn.dataset.ob = JSON.stringify(data);

      // тут ренедрим модалку фильма по данным data
      const modalCreate = new ModalCreate();
      modalCreate.renderPhoto(data);
      modalCreate.render(data);
      const genresModal = document.querySelector('.genres-modal');
      genresModal.textContent = genresModal.textContent
        .trim()
        .split(' ')
        .join(', ');
      modalCreate.init();
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
      paginator.create(Location.getCurrentPage(), data.total_results, 'home');
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
          Location.getCurrentPage(),
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

  btnDisabledChange() {
    serviceDB.auth.onAuthStateChanged(user => {
      if (user) {
        this.refs.movieGallery.addEventListener('click', async event => {
          if (event.target.nodeName === 'UL') return;
          const movieId = event.target.parentNode.dataset.id;
          const list = await serviceDB.db
            .collection('users')
            .doc(user.uid)
            .get();
          let newList = list.data().watched;
          newList = newList.map(el => el.id);

          if (newList.some(el => el === +movieId)) {
            this.refs.watchBtn.textContent = 'REMOVE FROM WATCHED';
          } else {
            this.refs.watchBtn.textContent = 'ADD TO WATCHED';
          }
          let newListQue = list.data().queue;
          newListQue = newListQue.map(el => el.id);

          if (newListQue.some(el => el === +movieId)) {
            this.refs.queueBtn.textContent = 'REMOVE FROM QUEUE';
          } else {
            this.refs.queueBtn.textContent = 'ADD TO QUEUE';
          }
        });
      } else {
        this.refs.queueBtn.disabled = true;
        this.refs.queueBtn.classList.add('disabled');
        this.refs.queueBtn.textContent = 'Login to add to queue';
        this.refs.watchBtn.disabled = true;
        this.refs.watchBtn.classList.add('disabled');
        this.refs.watchBtn.textContent = 'Login to add to watched';
      }
    });
  }
}
