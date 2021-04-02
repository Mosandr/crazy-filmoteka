import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
export default class Auth {
  constructor() {
    this.refs = this.getRefs();
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  getRefs() {
    const refs = {
      signupForm: document.querySelector('#signup-form'),
      logout: document.querySelector('#logout'),
      loginForm: document.querySelector('#login-form'),
      loggedOutLink: document.querySelector('.logged-out'),
      loggedInLink: document.querySelector('.logged-in'),
      modalSignUp: document.querySelector('#modal-signup'),
      modalLogin: document.querySelector('#modal-login'),
    };

    return refs;
  }

  signUp(event) {
    event.preventDefault();
    const emailSignUp = this.refs.signupForm['signup-email'].value;
    const passwordSignUp = this.refs.signupForm['signup-password'].value;
    this.auth
      .createUserWithEmailAndPassword(emailSignUp, passwordSignUp)
      .then(cred => {
        //creating user collection
        return this.db.collection('users').doc(cred.user.uid).set({
          watched: [],
          queue: [],
        });
      })
      .then(() => {
        M.Modal.getInstance(this.refs.modalSignUp).close();
        this.refs.signupForm.reset();
        this.refs.signupForm.querySelector('.error').innerHTML = '';
      })
      .catch(err => {
        this.refs.signupForm.querySelector('.error').innerHTML = err.message;
      });
  }

  logout(event) {
    event.preventDefault();
    this.auth.signOut().then(() => {});
  }

  login(event) {
    event.preventDefault();
    const email = this.refs.loginForm['login-email'].value;
    const password = this.refs.loginForm['login-password'].value;
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        M.Modal.getInstance(this.refs.modalLogin).close();
        this.refs.loginForm.reset();
        this.refs.loginForm.querySelector('.error').innerHTML = '';
      })
      .catch(err => {
        this.refs.loginForm.querySelector('.error').innerHTML = err.message;
      });
  }

  setupUI(user) {
    if (user) {
      this.refs.loggedInLink.classList.add('is-hidden');
      this.refs.loggedOutLink.classList.remove('is-hidden');
    } else {
      this.refs.loggedInLink.classList.remove('is-hidden');
      this.refs.loggedOutLink.classList.add('is-hidden');
    }
  }

  init() {
    this.refs.signupForm.addEventListener('submit', this.signUp.bind(this));
    this.refs.logout.addEventListener('click', this.logout.bind(this));
    this.refs.loginForm.addEventListener('submit', this.login.bind(this));
  }
}

// firebase.initializeApp({
//   apiKey: 'AIzaSyDckuyQARNfaPXRs7Jiz4Xgr28aczvsv5w',
//   authDomain: 'crazy-filmoteka.firebaseapp.com',
//   projectId: 'crazy-filmoteka',
//   storageBucket: 'crazy-filmoteka.appspot.com',
//   messagingSenderId: '827169246677',
//   appId: '1:827169246677:web:2524211488e4048eb1c15c',
// });

// // listen for auth status changes
// export default function initFirebase() {
//   const auth = firebase.auth();
//   const db = firebase.firestore();
//   // Sign up
//   const signupForm = document.querySelector('#signup-form');

//   signupForm.addEventListener('submit', e => {
//     e.preventDefault();

//     const email = signupForm['signup-email'].value;
//     const password = signupForm['signup-password'].value;
//     auth
//       .createUserWithEmailAndPassword(email, password)
//       .then(cred => {
//         //creating user collection
//         return db.collection('users').doc(cred.user.uid).set({
//           watched: [],
//           queue: [],
//         });
//       })
//       .then(() => {
//         const modal = document.querySelector('#modal-signup');
//         M.Modal.getInstance(modal).close();
//         signupForm.reset();
//         signupForm.querySelector('.error').innerHTML = '';
//       })
//       .catch(err => {
//         signupForm.querySelector('.error').innerHTML = err.message;
//       });
//   });

//   // logout
//   const logout = document.querySelector('#logout');
//   logout.addEventListener('click', e => {
//     e.preventDefault();
//     auth.signOut().then(() => {});
//   });

//   // login
//   const loginForm = document.querySelector('#login-form');
//   loginForm.addEventListener('submit', e => {
//     e.preventDefault();

//     // get user info
//     const email = loginForm['login-email'].value;
//     const password = loginForm['login-password'].value;

//     // log the user in
//     auth
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         // close the signup modal & reset form
//         const modal = document.querySelector('#modal-login');
//         M.Modal.getInstance(modal).close();
//         loginForm.reset();
//         loginForm.querySelector('.error').innerHTML = '';
//       })
//       .catch(err => {
//         loginForm.querySelector('.error').innerHTML = err.message;
//       });
//   });

//   const getActualQueueLists = async user => {
//     //get info from user's collection
//     const list = await db.collection('users').doc(user.uid).get();
//     const actualListQueue = list.data().queue;
//     console.log(actualListQueue);
//   };
//   const getActualWatchedLists = async user => {
//     //get info from user's collection
//     const list = await db.collection('users').doc(user.uid).get();
//     const actualListWatched = list.data().watched;
//     console.log(actualListWatched);
//     // const btnWatchedRef = document.querySelector('[data-js="button-watch"]');
//     // btnWatchedRef.addEventListener('click', () => {
//     //   const galleryListRef = document.querySelector('[data-js="movie-gallery"]');
//     //   galleryListRef.insertAdjacentHTML(
//     //     'afterbegin',
//     //     watchedTemplate(actualListWatched),
//     //   );
//     // });
//   };

//   const addItemsToWattchedList = async user => {
//     const watchedList = await db.collection('users').doc(user.uid).get();
//     const newList = watchedList.data().watched;

//     newList.push({ film: 'scream' });
//     return newList;
//   };

//   const addItemsToQueueList = async user => {
//     const queueList = await db.collection('users').doc(user.uid).get();
//     const newList = queueList.data().queue;

//     newList.push({ film: 'horse' });
//     return newList;
//   };
//   const renewWatchedList = user => {
//     const watchedBtn = document.querySelector('.watched');
//     watchedBtn.addEventListener('click', e => {
//       e.preventDefault();

//       addItemsToWattchedList(user).then(data => {
//         db.collection('users').doc(user.uid).set(
//           {
//             watched: data,
//           },
//           { merge: true },
//         );
//       });
//     });
//   };

//   const renewQueueList = user => {
//     const queueBtn = document.querySelector('.queueBtn');
//     queueBtn.addEventListener('click', e => {
//       e.preventDefault();

//       addItemsToQueueList(user).then(data => {
//         db.collection('users').doc(user.uid).set(
//           {
//             queue: data,
//           },
//           { merge: true },
//         );
//       });
//     });
//   };
//   const loggedOutLink = document.querySelector('.logged-out');
//   const loggedInLink = document.querySelector('.logged-in');

//   const setupUI = async user => {
//     if (user) {
//       // toggle user UI elements
//       loggedInLink.classList.add('is-hidden');
//       loggedOutLink.classList.remove('is-hidden');
//     } else {
//       loggedInLink.classList.remove('is-hidden');
//       loggedOutLink.classList.add('is-hidden');
//     }
//   };
//   auth.onAuthStateChanged(user => {
//     if (user) {
//       setupUI(user);
//       renewQueueList(user);
//       renewWatchedList(user);
//       getActualQueueLists(user);
//       getActualWatchedLists(user);
//     } else {
//       setupUI();
//     }
//   });
// }
