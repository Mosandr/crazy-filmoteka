refs = {
    linkHome: document.querySelector('.home-js'),
    linkLib: document.querySelector('.lib-js'),
    inputForm: document.querySelector('.search-form'),
    buttonWatch: document.querySelector('.button.watch'),
    buttonQueue: document.querySelector('.button.queue'),
    headerBcg: document.querySelector('.page-header'),
  };
  
  refs.linkHome.addEventListener('click', homeRender);
  
  refs.linkLibrary.addEventListener('click', libRender);
  
  function libRender (event) {
    refs.linkHome.classList.remove('current');
    refs.linkLib.classList.add('current');
    refs.inputForm.classList.add('is-hidden');
    refs.buttonQueue.classList.remove('is-hidden');
    refs.buttonWatch.classList.remove('is-hidden');
    refs.headerBcg.classList.add('lib');
  }
  
  function homeRender (event) {
    refs.linkHome.classList.add('current');
    refs.linkLib.classList.remove('current');
    refs.inputForm.classList.remove('is-hidden');
    refs.buttonQueue.classList.add('is-hidden');
    refs.buttonWatch.classList.add('is-hidden');
    refs.headerBcg.classList.remove('lib');
  }