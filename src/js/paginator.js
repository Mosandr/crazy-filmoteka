// класс который описывает функионал фзаимодействия с пащинацией

const pagination = require('pagination');

export default class Paginator {
  constructor() {}

  create(currentPage = 1, totalItems, locationPage) {
    const paginator = new pagination.TemplatePaginator({
      prelink: `./?${locationPage}`,
      current: currentPage,
      rowsPerPage: 20,
      totalResult: totalItems,
      slashSeparator: false,
      template: document.getElementById('pagination-template').innerHTML,
    });
    const html = paginator.render();
    document.getElementById('movie-pagination').innerHTML = html;
  }
}
