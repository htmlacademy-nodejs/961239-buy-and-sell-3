'use strict';

const {Router} = require(`express`);
const {URL} = require(`./../../service/constants`);
const offersRouter = new Router();

offersRouter.get(`${URL.OFFERSURLS.CATEGORY}/:id`, (request, response) =>
  response.render(`category`));
offersRouter.get(URL.OFFERSURLS.ADD, (request, response) => response.render(`new-ticket`));
offersRouter.get(`${URL.OFFERSURLS.EDIT}/:id`, (request, response) =>
  response.render(`ticket-edit`));

offersRouter.get(URL.OFFERSURLS.ID, (request, response) => response.render(`ticket`));

module.exports = offersRouter;
