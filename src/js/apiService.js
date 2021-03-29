//Class for fetch data from server API

import settings from './apiSettings';

export default class ApiServer {
  constructor() {
    this.settings = settings;
  }

  fetchPopularFilms(page = 1) {
    const url = `${this.settings.baseUrl}${this.settings.names.tranding}?api_key=${this.settings.key}&page=${page}`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  fetchFilmsOnSearch(query, page = 1) {
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
}
