'use strict';

const express = require(`express`);
const {URL} = require(`./../service/constants`);
const offersRouter = require(`./routes/offersRouter`);
const mainRouter = require(`./routes/mainRouter`);
const myRouter = require(`./routes/myRouter`);

const PORT = 8080;

const app = express();

app.use(URL.OFFERS, offersRouter);
app.use(URL.BASE, mainRouter);
app.use(URL.MY, myRouter);

app.listen(PORT);
