'use strict';

const {nanoid} = require(`nanoid`);
const {Messages, StatusCode} = require(`./../constants`);

class CommentsService {
  constructor(offers) {
    this._offers = offers;
    this.getAll = this.getAll.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
  }

  getAll(offerId) {
    const offerIndex = this._offers.findIndex((elem) => offerId === elem.id);
    if (offerIndex === -1) {
      return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_OFFER};
    }
    return {status: StatusCode.OK, content: this._offers[offerIndex].comments};
  }

  add(commentData) {
    const {offerId, message} = commentData;
    const offerIndex = this._offers.findIndex((elem) => offerId === elem.id);
    if (offerIndex === -1) {
      return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_OFFER};
    }
    if (message.text) {
      this._offers[offerIndex].comments.push({
        text: message.text,
        id: nanoid(6)
      });
      return {status: StatusCode.CREATED, content: Messages.COMMENT_ADD};
    }
    return {status: StatusCode.BADREQUEST, content: Messages.BAD_REQUEST};
  }

  delete(requestData) {
    const {offerId, commentId} = requestData;
    const offerIndex = this._offers.findIndex((elem) => offerId === elem.id);
    if (offerIndex === -1) {
      return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_OFFER};
    }
    const commentIndex = this._offers[offerIndex].comments.findIndex((elem) => commentId === elem.id);
    if (commentIndex === -1) {
      return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_COMMENT};
    }
    this._offers[offerIndex].comments.splice(commentIndex, 1);
    return {status: StatusCode.OK, content: Messages.COMMENT_DELETE};
  }
}

module.exports = CommentsService;
