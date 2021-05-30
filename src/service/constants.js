'use strict';

const DEFAULT_COMMAND = `--version`;
const USER_ARVG_INDEX = 2;
const NOT_COMMAND_TEXT = `Команда не найдена. Приложение завершит свою работу.`;
const EXIT_CODE = {
  SUCCESS: 0,
  ERROR: 1
};

const Messages = {
  NOT_FOUND: `Not found`,
  NOT_FOUND_OFFER: `Offer not found`,
  NO_RESULT: `No result`,
  NOT_FOUND_COMMENT: `Comment not found`,
  BAD_REQUEST: `Invalid request params`,
  COMMENT_DELETE: `Comment deleted`,
  COMMENT_ADD: `Comment added`,
  OFFER_CREATE: `Offer created`,
  OFFER_EDIT: `Offer edited`,
  OFFER_DELETE: `Offer deleted`,
  SERVER_ERROR: `Something went wrong`
};

const StatusCode = {
  OK: `200`,
  CREATED: `201`,
  BADREQUEST: `400`,
  NOTFOUND: `404`,
  SERVERERROR: `500`
};

const URL = {
  BASE: `/`,
  REGISTER: `/register`,
  LOGIN: `/login`,
  MY: `/my`,
  SEARCH: `/search`,
  OFFERS: `/offers`,
  OFFERSURLS: {
    CATEGORY: `/category`,
    ID: `/:id`,
    ADD: `/add`,
    EDIT: `/edit`
  },
  MYURLS: {
    COMMENTS: `/comments`
  },
  API: {
    APIPREFFIX: `/api`,
    BASEROUTE: `/`,
    OFFERSROUTE: `/offers`,
    OFFERID: `/:offerId`,
    CATEGORIESROUTE: `/categories`,
    COMMENTS: `/:offerId/comments`,
    COMMENTID: `/:offerId/comments/:commentId`,
    SEARCHROUTE: `/search`,
  }
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARVG_INDEX,
  NOT_COMMAND_TEXT,
  EXIT_CODE,
  URL,
  Messages,
  StatusCode
};

