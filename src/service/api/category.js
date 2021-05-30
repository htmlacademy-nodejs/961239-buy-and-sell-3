'use strict';

const {Router} = require(`express`);
const {URL} = require(`./../constants`);

const route = new Router();

module.exports = (app, service, reqHandler) => {
  app.use(URL.API.CATEGORIESROUTE, route);

  route.get(URL.API.BASEROUTE, (request, response) => reqHandler(response, service.findAll));
};
