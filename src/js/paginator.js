// класс который описывает функионал фзаимодействия с пащинацией
const pagination = require('pagination');

export default class Paginator {
  constructor() {}

  create(currentPage = 1, totalItems) {
    const paginator = pagination.create('search', {
      prelink: './',
      current: currentPage,
      rowsPerPage: 20,
      totalResult: totalItems,
    });

    const html = paginator.render();
    document.getElementById('paging').innerHTML = html;
  }
}
