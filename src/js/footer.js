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

  onTeamLinkClick(event) {
    //open team modal
    console.log('Now team modal must be open');
  }
}
