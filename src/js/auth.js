import 'materialize-css/dist/js/materialize.min.js';
import authen from '../partials/auth.html';
const bodyRef = document.querySelector('BODY');
bodyRef.insertAdjacentHTML('afterbegin', authen);

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);
});

firebase.initializeApp({
  apiKey: 'AIzaSyDckuyQARNfaPXRs7Jiz4Xgr28aczvsv5w',
  authDomain: 'crazy-filmoteka.firebaseapp.com',
  projectId: 'crazy-filmoteka',
  storageBucket: 'crazy-filmoteka.appspot.com',
  messagingSenderId: '827169246677',
  appId: '1:827169246677:web:2524211488e4048eb1c15c',
});
const auth = firebase.auth();
const db = firebase.firestore();

// Sign up
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      //creating user collection
      return db.collection('users').doc(cred.user.uid).set({
        watched: [],
        queue: [],
      });
    })
    .then(() => {
      const modal = document.querySelector('#modal-signup');
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector('.error').innerHTML = '';
    })
    .catch(err => {
      signupForm.querySelector('.error').innerHTML = err.message;
    });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
  e.preventDefault();
  auth.signOut().then(() => {});
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      // close the signup modal & reset form
      const modal = document.querySelector('#modal-login');
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      loginForm.querySelector('.error').innerHTML = '';
    })
    .catch(err => {
      loginForm.querySelector('.error').innerHTML = err.message;
    });
});

// close modal-login while opening modal-signup

const signUpBtn = document.querySelector('[data-target="modal-signup"]');
signUpBtn.addEventListener('click', () => {
  const modal = document.querySelector('#modal-login');
  M.Modal.getInstance(modal).close();
});

//hide button login/logout
const loggedOutLink = document.querySelector('.logged-out');
const loggedInLink = document.querySelector('.logged-in');

const setupUI = user => {
  if (user) {
    //get info from user's collection
    db.collection('users')
      .doc(user.uid)
      .get()
      .then(doc => {
        console.log(doc.data().watched);
        console.log(doc.data().queue);
      });
    // toggle user UI elements
    loggedInLink.classList.add('is-hidden');
    loggedOutLink.classList.remove('is-hidden');
  } else {
    loggedInLink.classList.remove('is-hidden');
    loggedOutLink.classList.add('is-hidden');
  }
};

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    setupUI(user);
  } else {
    setupUI();
  }
});

// import ApiServer from './apiService.js';
// const apiServ = new ApiServer();
// const f = apiServ.fetchPopularFilms().then(data => {
//   console.log(data.results);
// });
