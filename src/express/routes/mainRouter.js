'use strict';

const {Router} = require(`express`);
const {URL} = require(`./../../service/constants`);
const mainRouter = new Router();

mainRouter.get(URL.BASE, (request, response) => response.send(URL.BASE));
mainRouter.get(URL.LOGIN, (request, response) => response.send(URL.LOGIN));
mainRouter.get(URL.REGISTER, (request, response) => response.send(URL.REGISTER));
mainRouter.get(URL.MY, (request, response) => response.send(URL.MY));
mainRouter.get(URL.SEARCH, (request, response) => response.send(URL.SEARCH));

module.exports = mainRouter;
