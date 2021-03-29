// import 'materialize-css/sass/components/_variables.scss';
// import 'materialize-css/sass/components/_modal.scss';
// import 'materialize-css/sass/components/_buttons.scss';

// import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import authen from '../partials/auth.html';
const bodyRef = document.querySelector('BODY');

bodyRef.insertAdjacentHTML('afterbegin', authen);

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);
});

var app = firebase.initializeApp({
  apiKey: 'AIzaSyDckuyQARNfaPXRs7Jiz4Xgr28aczvsv5w',
  authDomain: 'crazy-filmoteka.firebaseapp.com',
  projectId: 'crazy-filmoteka',
  storageBucket: 'crazy-filmoteka.appspot.com',
  messagingSenderId: '827169246677',
  appId: '1:827169246677:web:2524211488e4048eb1c15c',
});
const auth = firebase.auth();
const db = firebase.firestore();
// DOM elements
const guideList = document.querySelector('.guides');

// setup guides
// const setupGuides = (data) => {

//   let html = '';
//   data.forEach(doc => {
//     const guide = doc.data();
//     const li = `
//       <li>
//         <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
//         <div class="collapsible-body white"> ${guide.content} </div>
//       </li>
//     `;
//     html += li;
//   });
//   guideList.innerHTML = html

// };
// get data from firebase
// db.collection('guides')
//   .get()
//   .then(snapshot => {
//     setupGuides(snapshot.docs);
//   });

// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
  } else {
    console.log('user logged out');
  }
});

// Sign up
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', e => {
  e.preventDefault();

  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
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
  auth.signInWithEmailAndPassword(email, password).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});

const signUpBtn = document.querySelector('[data-target="modal-signup"]');
signUpBtn.addEventListener('click', () => {
  const modal = document.querySelector('#modal-login');
  M.Modal.getInstance(modal).close();
});
