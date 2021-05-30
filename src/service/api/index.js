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

const requestHandler = (response, cb, requestData = null) => {
  const result = cb(requestData);
  return response.status(result.status).send(result.content);
};

(async () => {
  const readingData = await readData();

  category(app, new CategoryService(readingData), requestHandler);
  offers(app, new OffersService(readingData), new CommentsService(readingData), requestHandler);
  search(app, new SearchService(readingData), requestHandler);
})();

module.exports = app;
