//класс с методами работы с базой данных
// ======== Методы ========
//  - записать в список просмотреных фильмов
//  - записать в список очереди фильмов
//  - удалить из списка просмотреных фильмов
//  - удалить из списка очереди фильмов
//  - получить список просмотреных фильмов
//  - получить список очереди фильмов

import libraryGalleryCardTmp from '../templates/library-gallery-card-tmp.hbs';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyAeSUiQwnRQhecb5TJXGa2LZZdNP_oTZbw',
  authDomain: 'filmoteka-f9f0a.firebaseapp.com',
  projectId: 'filmoteka-f9f0a',
  storageBucket: 'filmoteka-f9f0a.appspot.com',
  messagingSenderId: '708883939185',
  appId: '1:708883939185:web:a8ff6f1cd495b364d180d0',
});

export default class ServiceDB {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.watchBtn = document.querySelector('.data__modal__film-add-to-watched');
    this.queueBtn = document.querySelector('.data__modal__film-add-to-queue');
    this.watchBtnHeader = document.querySelector('.watch');
    this.queueBtnHeader = document.querySelector('.queue');
    this.galleryListRef = document.querySelector('[data-js="movie-gallery"]');
    this.libraryBtn = document.querySelector('[data-js="lib-btn"]');
    this.pageFooter = document.querySelector('[data-js="page-footer"]');
  }

  async getActualQueueLists(user) {
    //get info from user's collection
    const list = await this.db.collection('users').doc(user.uid).get();
    const actualListQueue = list.data().queue;
    this.queueBtnHeader.addEventListener(
      'click',
      this.renderGalleryOnBtnClick.bind(this, actualListQueue),
    );
  }
  async getActualWatchedLists(user) {
    //get info from user's collection
    const list = await this.db.collection('users').doc(user.uid).get();
    const actualListWatched = list.data().watched;
    this.renderGalleryOnBtnClick(actualListWatched);

    if (actualListWatched.length === 0) {
      this.pageFooter.style.position = 'fixed';
    }

    this.watchBtnHeader.addEventListener(
      'click',
      this.renderGalleryOnBtnClick.bind(this, actualListWatched),
    );
  }

  renderGalleryOnBtnClick(actualItemsList) {
    this.galleryListRef.innerHTML = '';
    this.galleryListRef.insertAdjacentHTML(
      'afterbegin',
      libraryGalleryCardTmp(actualItemsList),
    );
    const genres = document.querySelectorAll('.card-genres');
    genres.forEach(el => {
      el.textContent = el.textContent.trim().split(' ').join(', ');
    });
    const years = document.querySelectorAll('.year-of-release');
    years.forEach(el => {
      el.textContent = el.textContent.trim().split('').splice(0, 4).join('');
    });
  }
  async changeWattchedList(user) {
    try {
      const watchedList = await this.db.collection('users').doc(user.uid).get();
      let newList = watchedList.data().watched;
      const newFilm = JSON.parse(this.watchBtn.dataset.ob);
      if (newList.some(e => e.id === newFilm.id)) {
        newList = newList.filter(e => e.id !== newFilm.id);
        this.watchBtn.textContent = 'ADD TO WATCHED';
        return newList;
      } else {
        newList.push(newFilm);
        this.watchBtn.textContent = 'REMOVE FROM WATCHED';
        return newList;
      }
    } catch (e) {
      console.log(e);
    }
  }
  async changeQueueList(user) {
    const queueList = await this.db.collection('users').doc(user.uid).get();
    let newList = queueList.data().queue;
    const newFilm = JSON.parse(this.queueBtn.dataset.ob);
    if (newList.find(e => e.id === newFilm.id)) {
      newList = newList.filter(e => e.id !== newFilm.id);
      this.queueBtn.textContent = 'ADD TO QUEUE';
      return newList;
    } else {
      newList.push(newFilm);
      this.queueBtn.textContent = 'REMOVE FROM QUEUE';
      return newList;
    }
  }

  renewWatchedList(user) {
    this.watchBtn.addEventListener(
      'click',
      this.handleWatchBtnClick.bind(this, user),
    );
  }
  handleWatchBtnClick(user) {
    this.changeWattchedList(user).then(data => {
      this.db.collection('users').doc(user.uid).set(
        {
          watched: data,
        },
        { merge: true },
      );
    });
  }

  renewQueueList(user) {
    this.queueBtn.addEventListener(
      'click',
      this.handleQueueBtnClick.bind(this, user),
    );
  }

  handleQueueBtnClick(user) {
    this.changeQueueList(user).then(data => {
      this.db.collection('users').doc(user.uid).set(
        {
          queue: data,
        },
        { merge: true },
      );
    });
  }

  loginMessage(user) {
    const loginMessage = document.querySelector('.login-message');
    if (user) {
      loginMessage.textContent = '';
    } else {
      loginMessage.textContent = 'Please Login to see your library';
    }
  }

  async dataForQueuePagination(user, page) {
    const filmList = await this.db.collection('users').doc(user.uid).get();
    const queueList = filmList.data().queue;
    const numberOfFilms = queueList.length;
    const paginationInfo = {};
    paginationInfo.num = numberOfFilms;

    if (Math.floor((numberOfFilms - 1) / 20) === 0) {
      paginationInfo.films = queueList;
      return paginationInfo;
    } else {
      const idxStart = (page - 1) * 20;
      const filmsForPage = queueList.splice(idxStart, 20);
      paginationInfo.films = filmsForPage;
      return paginationInfo;
    }
  }

  async dataForWatchedPagination(user, page) {
    const filmList = await this.db.collection('users').doc(user.uid).get();
    const watchedList = filmList.data().watched;
    const numberOfFilms = watchedList.length;
    const paginationInfo = {};
    paginationInfo.num = numberOfFilms;
    if (Math.floor((numberOfFilms - 1) / 20) === 0) {
      paginationInfo.films = watchedList;
      return paginationInfo;
    } else {
      const idxStart = (page - 1) * 20;
      const filmsForPage = watchedList.splice(idxStart, 20);
      paginationInfo.films = filmsForPage;
      return paginationInfo;
    }
  }
}
