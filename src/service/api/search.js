'use strict';

const {Router} = require(`express`);
const {URL} = require(`./../constants`);
const {requestHandler} = require(`./../utils/utils`);

const route = new Router();

module.exports = (app, service) => {
  app.use(URL.API.SEARCHROUTE, route);

  route.get(URL.API.BASEROUTE, (request, response) => requestHandler(response, service.findOffers, request.query.query));
};
