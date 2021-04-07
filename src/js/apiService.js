//Class for fetch data from server API

import settings from './apiSettings';

export default class ApiServer {
  constructor() {
    this.settings = settings;
    this.page = 1;
    this.query = '';
  }

  fetchPopularFilms(page = this.page) {
    const url = `${this.settings.baseUrl}${this.settings.names.tranding}?api_key=${this.settings.key}&page=${page}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  fetchFilmsOnSearch(query, page = this.page) {
    const url = `${this.settings.baseUrl}${this.settings.names.search}?api_key=${this.settings.key}&language=en-US&query=${query}&include_adult=false&page=${page}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  fetchFilmById(id) {
    const url = `${this.settings.baseUrl}${this.settings.names.movie}${id}?api_key=${this.settings.key}&language=en-US`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  fetchGenresList(page = this.page) {
    const url = `${this.settings.baseUrl}${this.settings.names.genres}?api_key=${this.settings.key}&page=${page}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }
}
