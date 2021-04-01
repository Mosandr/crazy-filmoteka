export default class Preloader {
    constructor() {
        this.refs = this.getRefs();
    }
    getRefs() {
    const refs = {
      preloaderBackdrop: document.querySelector('.backdrop-container')
    }

    return refs;
    }
    openPreloader() {
        this.refs.preloaderBackdrop.classList.remove('.is-hidden');
    }
    closePreloader() {
        this.refs.preloaderBackdrop.classList.add('.is-hidden');
    }
}