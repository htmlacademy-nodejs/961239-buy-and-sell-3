'use strict';

const {Router} = require(`express`);
const {URL} = require(`./../constants`);

const route = new Router();

module.exports = (app, offersService, commentsService, reqHandler) => {
  app.use(URL.API.OFFERSROUTE, route);

  route.get(URL.API.BASEROUTE, (request, response) => reqHandler(response, offersService.getAll));

  route.get(URL.API.OFFERID, (request, response) => reqHandler(response, offersService.getOne, request.params.offerId));

  route.post(URL.API.BASEROUTE, (request, response) => reqHandler(response, offersService.add, request.body));

  route.put(URL.API.OFFERID, (request, response) =>
    reqHandler(response, offersService.edit, {data: request.body, offerId: request.params.offerId}));

  route.delete(URL.API.OFFERID, (request, response) =>reqHandler(response, offersService.delete, request.params.offerId));

  route.get(URL.API.COMMENTS, (request, response) => reqHandler(response, commentsService.getAll, request.params.id));

  route.post(URL.API.COMMENTS, (request, response) =>
    reqHandler(response, commentsService.add, {offerId: request.params.offerId, message: request.body}));

  route.delete(URL.API.COMMENTID, (request, response) =>
    reqHandler(response, commentsService.delete, {offerId: request.params.offerId, commentId: request.params.commentId}));
};
