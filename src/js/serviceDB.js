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
  apiKey: 'AIzaSyDckuyQARNfaPXRs7Jiz4Xgr28aczvsv5w',
  authDomain: 'crazy-filmoteka.firebaseapp.com',
  projectId: 'crazy-filmoteka',
  storageBucket: 'crazy-filmoteka.appspot.com',
  messagingSenderId: '827169246677',
  appId: '1:827169246677:web:2524211488e4048eb1c15c',
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
  }

  async getActualQueueLists(user) {
    //get info from user's collection
    const list = await this.db.collection('users').doc(user.uid).get();
    const actualListQueue = list.data().queue;
    console.log(actualListQueue);
    this.queueBtnHeader.addEventListener(
      'click',
      this.renderGalleryOnBtnClick.bind(this, actualListQueue),
    );
  }
  async getActualWatchedLists(user) {
    //get info from user's collection
    const list = await this.db.collection('users').doc(user.uid).get();
    const actualListWatched = list.data().watched;
    this.galleryListRef.innerHTML = '';
    this.galleryListRef.insertAdjacentHTML(
      'afterbegin',
      libraryGalleryCardTmp(actualListWatched),
    );
    const genres = document.querySelectorAll('.card-genres');
    genres.forEach(el => {
      el.textContent = el.textContent.trim().split(' ').join(', ');
    });
    const years = document.querySelectorAll('.year-of-release');
    years.forEach(el => {
      el.textContent = el.textContent.trim().split('').splice(0, 4).join('');
    });
    console.log(actualListWatched);
    this.libraryBtn.addEventListener(
      'click',
      this.renderGalleryOnBtnClick.bind(this, actualListWatched),
    );
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
  async addItemsToWattchedList(user) {
    try {
      const watchedList = await this.db.collection('users').doc(user.uid).get();
      const newList = watchedList.data().watched;
      const newFilm = JSON.parse(this.watchBtn.dataset.ob);
      if (newList.some(e => e.id === newFilm.id)) {
        alert('Already add');
        return newList;
      } else {
        newList.push(newFilm);
        return newList;
      }
    } catch (e) {
      console.log(e);
    }
  }
  async addItemsToQueueList(user) {
    const queueList = await this.db.collection('users').doc(user.uid).get();
    const newList = queueList.data().queue;
    const newFilm = JSON.parse(this.queueBtn.dataset.ob);
    if (newList.some(e => e.id === newFilm.id)) {
      alert('Already add');
      return newList;
    } else {
      newList.push(newFilm);
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
    this.addItemsToWattchedList(user).then(data => {
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
    this.addItemsToQueueList(user).then(data => {
      this.db.collection('users').doc(user.uid).set(
        {
          queue: data,
        },
        { merge: true },
      );
    });
  }
}

// =====

// export default class ServerActive {
//   constructor() {
//     this.auth = firebase.auth();
//     this.db = firebase.firestore();
//     this.watchBtn = document.querySelector('.data__modal__film-add-to-watched');
//     this.queueBtn = document.querySelector('.data__modal__film-add-to-queue');
//   }

//   async getActualQueueLists(user) {
//     //get info from user's collection
//     const list = await this.db.collection('users').doc(user.uid).get();
//     const actualListQueue = list.data().queue;
//     console.log(actualListQueue);
//     this.queueBtnHeader.addEventListener(
//       'click',  e => {
//         e.preventDefault();

//       this.matchMovieQueue.bind(this),
//     );
//   }
// }

//   async getActualWatchedLists(user) {
//     //get info from user's collection
//     const list = await this.db.collection('users').doc(user.uid).get();
//     const actualListWatched = list.data().watched;
//     console.log(actualListWatched);
//     this.watchBtnHeader.addEventListener(
//       'click',  e => {
//         e.preventDefault();

//       this.matchMovieWatched.bind(this),
//     );
//   }
// }

//   matchMovieWatched () {
//       const movieWatched = getActualWatchedLists();
//       const findWatchedById = movieWatched.id.find(item => intem === id);

//       if (findWatchedById) {
//         watchBtn.classList.add('is-clicked');
//       }
//     }

//   matchMovieQueue () {
//      const movieQueue = getActualQueueLists();
//      const findQueueById = movieQueue.id.find(item => intem === id)

//      if (findQueuedById) {
//      queueBtn.classList.add('is-clicked');
//      }
//    }

// }
