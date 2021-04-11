'use strict';

const fs = require(`fs`).promises;
const express = require(`express`);
const MOCK_DATA_PATH = `./../../mock.json`;
const PORT = 3000;

const NOT_FOUND_MESSAGE = `Not found`;
const URL = {
  MAIN: `/`
};

const StatusCode = {
  NOTFOUND: `404`
};

const app = express();
app.use(express.json());

app.get(`/offers`, async (request, response) => {
  const mockData = await fs.readFile(MOCK_DATA_PATH, `utf-8`);
  const mockDataArray = JSON.parse(mockData);
  response.json(mockDataArray);
});

app.use((request, response) => response
.status(StatusCode.NOTFOUND).send(NOT_FOUND_MESSAGE)
);


module.exports = {
  name: `--server`,
  run: (args) => parseInt(args, 10) ? app.listen(args) : app.listen(PORT)
};
