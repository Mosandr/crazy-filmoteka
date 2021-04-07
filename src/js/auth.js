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
        location.reload();
      })
      .catch(err => {
        this.refs.signupForm.querySelector('.error').innerHTML = err.message;
      });
  }

  logout(event) {
    event.preventDefault();
    this.auth.signOut().then(() => {
      location.reload();
    });
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
        location.reload();
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
