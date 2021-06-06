'use strict';

const {Router} = require(`express`);
const {
  CategoryService,
  OffersService,
  CommentsService,
  SearchService} = require(`./../data-service`);
const {readData} = require(`./../lib/get-mock-data`);
const category = require(`./category`);
const offers = require(`./offers`);
const search = require(`./search`);

const app = new Router();

(async () => {
  const readingData = await readData();

  category(app, new CategoryService(readingData));
  offers(app, new OffersService(readingData), new CommentsService(readingData));
  search(app, new SearchService(readingData));
})();

module.exports = app;
