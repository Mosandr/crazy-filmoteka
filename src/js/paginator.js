// класс который описывает функионал фзаимодействия с пащинацией
const pagination = require('pagination');

export default class Paginator {
  constructor() {}

  create(currentPage = 1, totalItems, locationPage) {
    const paginator = pagination.create('search', {
      prelink: `./?${locationPage}`,
      current: currentPage,
      rowsPerPage: 20,
      totalResult: totalItems,
    });

    const html = paginator.render();
    document.getElementById('paging').innerHTML = html;
  }
}
