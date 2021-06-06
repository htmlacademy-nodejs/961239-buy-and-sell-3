'use strict';

const {StatusCode} = require(`../constants`);

class CategoryService {
  constructor(offers) {
    this._offers = offers;
    this.findAll = this.findAll.bind(this);
  }

  findAll() {
    const categories = [];
    this._offers.forEach((elem) => {
      elem.category.forEach((elemCategory) => {
        if (!categories.includes(elemCategory)) {
          categories.push(elemCategory);
        }
      });
    });
    return {status: StatusCode.OK, content: categories};
  }
}

module.exports = CategoryService;
