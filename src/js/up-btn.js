//Get the button:

const throttle = require('lodash.throttle');

export default class UpButton {
  constructor() {
    this.ref = document.getElementById('myBtn');
    this.rootElement = document.documentElement;
  }

  init() {
    window.addEventListener(
      'scroll',
      throttle(this.trackScroll.bind(this), 300),
    );

    this.ref.addEventListener('click', this.scrollToTop.bind(this));
  }

  trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      this.ref.style.display = 'block';
    }
    if (scrolled < coords) {
      this.ref.style.display = 'none';
    }
  }

  scrollToTop() {
    // Scroll to top logic
    this.rootElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
