import movieCardTemplate from '../templates/gallery-card-tmp.hbs';

export default class MovieGallery {
  constructor() {
    this.galleryRef = document.querySelector('[data-js="movie-gallery"]');
  }

  render(moviesList) {
    const markup = moviesList.reduce(
      (acc, item) => acc + movieCardTemplate(item),
      '',
    );
    this.galleryRef.insertAdjacentHTML('afterbegin', markup);
  }
}
