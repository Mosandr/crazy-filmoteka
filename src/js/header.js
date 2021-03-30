class Header {

    constructor() {
        this.refs = this.getRefs();
    };

    getRefs() {
    const refs = {
        linkHome: document.querySelector('[data-js="home-btn"]'),
        linkLib: document.querySelector('[data-js="lib-btn"]'),
        inputForm: document.querySelector('[data-js="search-form"]'),
        buttonWatch: document.querySelector('[data-js="button-watch"]'),
        buttonQueue: document.querySelector('[data-js="button-queue"]'),
        headerBcg: document.querySelector('[data-js="page-header"]'),

        }
    }
    
    function init () {
        refs.linkHome.addEventListener('click', onHomeLinkClick);
        refs.linkLibrary.addEventListener('click', onMyLibraryLinkClick);
      }
      
    function onMyLibraryLinkClick (event) {
        refs.linkHome.classList.remove('current');
        refs.linkLib.classList.add('current');
        refs.inputForm.classList.add('is-hidden');
        refs.buttonQueue.classList.remove('is-hidden');
        refs.buttonWatch.classList.remove('is-hidden');
        refs.headerBcg.classList.add('lib');
      }
      
    function onHomeLinkClick (event) {
        refs.linkHome.classList.add('current');
        refs.linkLib.classList.remove('current');
        refs.inputForm.classList.remove('is-hidden');
        refs.buttonQueue.classList.add('is-hidden');
        refs.buttonWatch.classList.add('is-hidden');
        refs.headerBcg.classList.remove('lib');
      }
    }
    
    
    const header = new Header();
    
    export default header;