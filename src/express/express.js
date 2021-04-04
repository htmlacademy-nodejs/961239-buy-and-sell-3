'use strict';

const express = require(`express`);
const path = require(`path`);
const {URL} = require(`./../service/constants`);
const offersRouter = require(`./routes/offersRouter`);
const mainRouter = require(`./routes/mainRouter`);
const myRouter = require(`./routes/myRouter`);
const PUBLIC_PATH = path.join(__dirname, `/public`);
const TEMPLATE_PATH = path.join(__dirname, `/templates`);

const PORT = 8080;

const app = express();

app.use(express.static(PUBLIC_PATH));
app.set(`views`, TEMPLATE_PATH);
app.set(`view engine`, `pug`);
app.use(URL.OFFERS, offersRouter);
app.use(URL.BASE, mainRouter);
app.use(URL.MY, myRouter);

app.use((req, res) => {
  res.status(404).render(`404`);
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).render(`500`);
});
app.listen(PORT);
