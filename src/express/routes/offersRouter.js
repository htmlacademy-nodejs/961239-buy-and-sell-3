'use strict';

const {Router} = require(`express`);
const {URL} = require(`./../../service/constants`);
const offersRouter = new Router();

offersRouter.get(`${URL.OFFERSURLS.CATEGORY}/:id`, (request, response) =>
  response.send(`${URL.OFFERS}${URL.OFFERSURLS.CATEGORY}/${Number.parseInt(request.params.id, 10)}`));
offersRouter.get(URL.OFFERSURLS.ADD, (request, response) => response.send(`${URL.OFFERS}${URL.OFFERSURLS.ADD}`));
offersRouter.get(`${URL.OFFERSURLS.EDIT}/:id`, (request, response) =>
  response.send(`${URL.OFFERS}${URL.OFFERSURLS.EDIT}/${Number.parseInt(request.params.id, 10)}`));

offersRouter.get(URL.OFFERSURLS.ID, (request, response) => response.send(`${URL.OFFERS}/${Number.parseInt(request.params.id, 10)}`));

module.exports = offersRouter;
