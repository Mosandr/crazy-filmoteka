export default class Preloader {
    constructor() {
        this.refs = this.getRefs();
    }
    getRefs() {
        const refs = {
            backdropContainer: document.querySelector('.backdrop-container')
        };
        return refs;
        
    }
    openPreloader() {
        this.refs.backdropContainer.classList.remove('is-hidden');
    }
closePreloader(){
    this.refs.backdropContainer.classList.add('is-hidden');
    }
    
}
