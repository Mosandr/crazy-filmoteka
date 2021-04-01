//класс с методами работы с базой данных
// ======== Методы ========
//  - записать в список просмотреных фильмов
//  - записать в список очереди фильмов
//  - удалить из списка просмотреных фильмов
//  - удалить из списка очереди фильмов
//  - получить список просмотреных фильмов
//  - получить список очереди фильмов

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
export default class Server {
  constructor() {
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  async getActualQueueLists(user) {
    //get info from user's collection
    const list = await this.db.collection('users').doc(user.uid).get();
    const actualListQueue = list.data().queue;
    console.log(actualListQueue);
  }
  async getActualWatchedLists(user) {
    //get info from user's collection
    const list = await this.db.collection('users').doc(user.uid).get();
    const actualListWatched = list.data().watched;
    console.log(actualListWatched);
    // const btnWatchedRef = document.querySelector('[data-js="button-watch"]');
    // btnWatchedRef.addEventListener('click', () => {
    //   const galleryListRef = document.querySelector('[data-js="movie-gallery"]');
    //   galleryListRef.insertAdjacentHTML(
    //     'afterbegin',
    //     watchedTemplate(actualListWatched),
    //   );
    // });
  }
  async addItemsToWattchedList(user) {
    const watchedList = await this.db.collection('users').doc(user.uid).get();
    const newList = watchedList.data().watched;
    newList.push({ film: 'scream' });
    return newList;
  }
  async addItemsToQueueList(user) {
    const queueList = await this.db.collection('users').doc(user.uid).get();
    const newList = queueList.data().queue;

    newList.push({ film: 'horse' });
    return newList;
  }
  renewWatchedList(user) {
    const watchedBtn = document.querySelector('.watched');
    watchedBtn.addEventListener('click', e => {
      e.preventDefault();

      this.addItemsToWattchedList(user).then(data => {
        this.db.collection('users').doc(user.uid).set(
          {
            watched: data,
          },
          { merge: true },
        );
      });
    });
  }

  renewQueueList(user) {
    const queueBtn = document.querySelector('.queueBtn');
    queueBtn.addEventListener('click', e => {
      e.preventDefault();
      this.addItemsToQueueList(user).then(data => {
        this.db.collection('users').doc(user.uid).set(
          {
            queue: data,
          },
          { merge: true },
        );
      });
    });
  }
}
