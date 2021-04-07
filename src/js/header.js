export default class Header {
  constructor() {
    this.refs = this.getRefs();
  }

  getRefs() {
    const refs = {
      linkHome: document.querySelector('[data-js="home-btn"]'),
      linkLib: document.querySelector('[data-js="lib-btn"]'),
      searcForm: document.querySelector('[data-js="search-form"]'),
      buttonWatch: document.querySelector('[data-js="button-watch"]'),
      buttonQueue: document.querySelector('[data-js="button-queue"]'),
      headerBackground: document.querySelector('[data-js="page-header"]'),
    };

    return refs;
  }

  init() {
    this.refs.linkHome.addEventListener(
      'click',
      this.onHomeLinkClick.bind(this),
    );
    this.refs.linkLib.addEventListener(
      'click',
      this.onMyLibraryLinkClick.bind(this),
    );

    this.refs.searcForm.addEventListener(
      'submit',
      this.onEmptySearchSubmit.bind(this),
    );
  }

  onMyLibraryLinkClick(event) {
    this.refs.linkHome.classList.remove('current');
    this.refs.linkLib.classList.add('current');
    this.refs.searcForm.classList.add('is-hidden');
    this.refs.buttonQueue.classList.remove('is-hidden');
    this.refs.buttonWatch.classList.remove('is-hidden');
    this.refs.headerBackground.classList.add('lib');
    this.initLibraryButtons();
    this.onWatchedClick();
  }

  onHomeLinkClick(event) {
    this.refs.linkHome.classList.add('current');
    this.refs.linkLib.classList.remove('current');
    this.refs.searcForm.classList.remove('is-hidden');
    this.refs.buttonQueue.classList.add('is-hidden');
    this.refs.buttonWatch.classList.add('is-hidden');
    this.refs.headerBackground.classList.remove('lib');
    this.disabelLibraryButtons();
  }

  initLibraryButtons() {
    this.refs.buttonWatch.addEventListener(
      'click',
      this.onWatchedClick.bind(this),
    );
    this.refs.buttonQueue.addEventListener(
      'click',
      this.onQueueClick.bind(this),
    );
  }

  onEmptySearchSubmit(event) {
    if (event.currentTarget.query.value.trim() === '') {
      event.preventDefault();
      event.currentTarget.querySelector('.search-form__error').textContent =
        'Search query was empty. Enter the movie name and try again';
    }
  }

  onWatchedClick() {
    this.refs.buttonWatch.classList.add('is-active');
    this.refs.buttonQueue.classList.remove('is-active');
  }

  onQueueClick() {
    this.refs.buttonQueue.classList.add('is-active');
    this.refs.buttonWatch.classList.remove('is-active');
  }

  disabelLibraryButtons() {
    this.refs.buttonQueue.removeEventListener(
      'click',
      this.onWatchedClick.bind(this),
    );
    this.refs.buttonWatch.removeEventListener(
      'click',
      this.onQueueClick.bind(this),
    );
  }
}
