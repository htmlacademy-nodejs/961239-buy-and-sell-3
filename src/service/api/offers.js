'use strict';

const {Router} = require(`express`);
const {URL} = require(`./../constants`);
const {requestHandler} = require(`./../utils/utils`);

const route = new Router();

module.exports = (app, offersService, commentsService) => {
  app.use(URL.API.OFFERSROUTE, route);

  route.get(URL.API.BASEROUTE, (request, response) => requestHandler(response, offersService.getAll));

  route.get(URL.API.OFFERID, (request, response) => requestHandler(response, offersService.getOne, request.params.offerId));

  route.post(URL.API.BASEROUTE, (request, response) => requestHandler(response, offersService.add, request.body));

  route.put(URL.API.OFFERID, (request, response) =>
    requestHandler(response, offersService.edit, {data: request.body, offerId: request.params.offerId}));

  route.delete(URL.API.OFFERID, (request, response) => requestHandler(response, offersService.delete, request.params.offerId));

  route.get(URL.API.COMMENTS, (request, response) => requestHandler(response, commentsService.getAll, request.params.offerId));

  route.post(URL.API.COMMENTS, (request, response) =>
    requestHandler(response, commentsService.add, {offerId: request.params.offerId, message: request.body}));

  route.delete(URL.API.COMMENTID, (request, response) =>
    requestHandler(response, commentsService.delete, {offerId: request.params.offerId, commentId: request.params.commentId}));
};
