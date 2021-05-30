'use strict';

const {Messages, StatusCode} = require(`./../constants`);

class SearchService {
  constructor(offers) {
    this._offers = offers;
    this.findOffers = this.findOffers.bind(this);
  }

  findOffers(query) {
    const foundOffers = this._offers.filter((elem) => elem.title.indexOf(query) !== -1);
    return foundOffers.length ? {status: StatusCode.OK, content: foundOffers} :
      {status: StatusCode.NOTFOUND, content: Messages.NO_RESULT};
  }
}

module.exports = SearchService;
