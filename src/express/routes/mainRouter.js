'use strict';

const {Router} = require(`express`);
const {URL} = require(`./../../service/constants`);
const mainRouter = new Router();

mainRouter.get(URL.BASE, (request, response) => response.render(`main`));
mainRouter.get(URL.LOGIN, (request, response) => response.render(`login`));
mainRouter.get(URL.REGISTER, (request, response) => response.render(`sign-up`));
mainRouter.get(URL.MY, (request, response) => response.render(`my-tickets`));
mainRouter.get(URL.SEARCH, (request, response) => response.render(`search-result`));

module.exports = mainRouter;
