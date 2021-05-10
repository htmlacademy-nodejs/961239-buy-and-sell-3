'use strict';

const DEFAULT_COMMAND = `--version`;
const USER_ARVG_INDEX = 2;
const NOT_COMMAND_TEXT = `Команда не найдена. Приложение завершит свою работу.`;
const EXIT_CODE = {
  SUCCESS: 0,
  ERROR: 1
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
    OFFERS: `/api/offers`,
    OFFERID: `/api/offers/:offerId`,
    CATEGORIES: `/api/categories`,
    COMMENTS: `/api/offers/:offerId/comments`,
    COMMENTID: `/api/offers/:offerId/comments/:commentId`,
    SEARCH: `/api/search`
  }
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARVG_INDEX,
  NOT_COMMAND_TEXT,
  EXIT_CODE,
  URL
};

