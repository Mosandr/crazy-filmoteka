import initTeamModal from './initTeamModal';

export default class Footer {
  constructor() {
    this.refs = this.getRefs();
  }

  getRefs() {
    const refs = {
      teamLink: document.querySelector('[data-js="team-link"]'),
    };

    return refs;
  }

  init() {
    this.refs.teamLink.addEventListener(
      'click',
      this.onTeamLinkClick.bind(this),
    );
  }

  //   onTeamLinkClick(event) {
  //     //open team modal
  //     // console.log('Now team modal must be open');

  //     event.preventDefault();
  //     initTeamModal();
  //     modal.show();

  //     window.addEventListener('keydown', closeModalHandler);

  //     function closeModalHandler(e) {
  //       if (e.code === 'Escape') {
  //         modal.close();
  //         window.removeEventListener('keydown', closeModalHandler);
  //       }
  //     }

  //   }
}
