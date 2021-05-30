'use strict';

const {nanoid} = require(`nanoid`);
const {Messages, StatusCode} = require(`./../constants`);

class OffersService {
  constructor(offers) {
    this._offers = offers;
    this.getAll = this.getAll.bind(this);
    this.getOne = this.getOne.bind(this);
    this.add = this.add.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }

  getAll() {
    return {status: StatusCode.OK, content: this._offers};
  }

  getOne(id) {
    const offer = this._offers.find((elem) => id === elem.id);
    if (offer) {
      return {status: StatusCode.OK, content: offer};
    }
    return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_OFFER};
  }

  add(offerData) {
    if (this._checkOffersData(offerData)) {
      this._offers.push({
        id: nanoid(6),
        type: offerData.type,
        title: offerData.title,
        description: offerData.description ? offerData.description : null,
        sum: offerData.sum,
        picture: offerData.picture ? offerData.picture : null,
        category: offerData.category,
        comments: []
      });
      return {status: StatusCode.CREATED, content: Messages.OFFER_CREATE};
    }
    return {status: StatusCode.BADREQUEST, content: Messages.BAD_REQUEST};
  }

  edit(offerData) {
    const {data, offerId} = offerData;
    const offerIndex = this._offers.findIndex((elem) => offerId === elem.id);
    if (offerIndex === -1) {
      return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_OFFER};
    }
    if (!this._checkOffersData(data)) {
      return {status: StatusCode.BADREQUEST, content: Messages.BAD_REQUEST};
    }
    this._offers[offerIndex] = {...this._offers[offerIndex],
      type: data.type,
      title: data.title,
      description: data.description,
      sum: data.sum,
      picture: data.picture,
      category: data.category
    };
    return {status: StatusCode.OK, content: Messages.OFFER_EDIT};
  }

  delete(id) {
    const offerIndex = this._offers.findIndex((elem) => id === elem.id);
    if (offerIndex === -1) {
      return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_OFFER};
    }
    this._offers.splice(offerIndex, 1);
    return {status: StatusCode.OK, content: Messages.OFFER_DELETE};
  }

  _checkOffersData(offerData) {
    return (offerData.category) && (offerData.title) && (offerData.sum) && (offerData.type);
  }
}

module.exports = OffersService;
