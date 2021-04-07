export default class Location {
  constructor() {}

  static getCurrentPage() {
    const url = location.href;

    if (!url.includes('page=')) return 1;

    let index = url.indexOf('page=') + String('page=').length;

    return url.slice(index);
  }

  static isMyLibraryPageOpen() {
    const url = location.href;
    if (url.includes('my-library')) return true;
    return false;
  }

  static isSearchSubmited() {
    const url = location.href;
    if (url.includes('query')) return true;
    return false;
  }
}
