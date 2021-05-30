'use strict';


const express = require(`express`);
const {URL, Messages, StatusCode} = require(`./../constants`);
const PORT = 3000;

const routes = require(`./../api`);

const app = express();
app.use(express.json());

app.use(URL.API.APIPREFFIX, routes);

app.use((request, response) => response
.status(StatusCode.NOTFOUND).send(Messages.NOT_FOUND)
);

// next добавляем для того, чтобы не вызывать дефолтный обработчик 500й
// eslint-disable-next-line
app.use((error, request, response, next) => {
  console.error(error.stack);
  return response.status(StatusCode.SERVERERROR).send(Messages.SERVER_ERROR);
});


module.exports = {
  name: `--server`,
  run: (portNumber) => parseInt(portNumber, 10) ? app.listen(portNumber) : app.listen(PORT)
};
