'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {EXIT_CODE} = require(`./../constants`);
const {getRandomInt, shuffle} = require(`../utils/dev-utils`);

const FILENAME = `./../../mock.json`;
const TITLES_PATH = `./../data/titles.txt`;
const CATEGORIES_PATH = `./../data/categories.txt`;
const DESCRIPTIONS_PATH = `./../data/sentences.txt`;
const COMMENTS_PATH = `./../data/comments.txt`;

const DEFAULT_MOCK_COUNT = 1;
const MAX_MOCK_COUNT = 1000;

const NOT_WORKING_TEXT = `Не удалось сгенерировать данные, приложение завершит свою работу.`;
const MANY_ADS_TEXT = `Не больше 1000 объявлений`;
const SUCCESS_TEXT = `Данные сгенерированны. Новый файл создан.`;

const DESCRIPTION_AD_MAX_COUNT = 5;

const PRICE_AD = {
  MIN: 1000,
  MAX: 100000
};

const PICTURE_AD_COUNT = 16;
const PICTURE_AD = new Array(PICTURE_AD_COUNT).fill(``).
  map((em, i) => `item${i + 1 < 10 ? `0${i + 1}` : i + 1}.jpg`);

const generateMockAdComments = (commentsList, count) => {
  const emptyComments = new Array(count).fill(`temp`);
  const comments = emptyComments.map(() => ({
    id: nanoid(6),
    text: commentsList[getRandomInt(0, commentsList.length - 1)]
  }));
  return comments;
};

const readAdMockData = async (path) => {
  const adMockData = await fs.readFile(path, `utf-8`);
  return adMockData.split(`\n`);
};

const generateAd = (TITLE_AD, CATEGORY_AD, DESCRIPTION_AD, COMMENTS_AD) => ({
  id: nanoid(6),
  type: CATEGORY_AD[getRandomInt(0, CATEGORY_AD.length - 1)],
  title: TITLE_AD[getRandomInt(0, TITLE_AD.length - 1)],
  description: shuffle(DESCRIPTION_AD).slice(0, getRandomInt(1, DESCRIPTION_AD_MAX_COUNT)).join(` `),
  sum: getRandomInt(PRICE_AD.MIN, PRICE_AD.MAX),
  picture: PICTURE_AD[getRandomInt(0, PICTURE_AD_COUNT - 1)],
  category: shuffle(CATEGORY_AD).slice(getRandomInt(0, CATEGORY_AD.length - 1)),
  comments: generateMockAdComments(COMMENTS_AD, getRandomInt(0, COMMENTS_AD.length - 1))
});

const generateAds = async (count) => {
  const TITLE_AD = await readAdMockData(TITLES_PATH);
  const CATEGORY_AD = await readAdMockData(CATEGORIES_PATH);
  const DESCRIPTION_AD = await readAdMockData(DESCRIPTIONS_PATH);
  const COMMENTS_AD = await readAdMockData(COMMENTS_PATH);
  return JSON.stringify(new Array(count).fill({}).map(() => generateAd(TITLE_AD, CATEGORY_AD, DESCRIPTION_AD, COMMENTS_AD)));
};

const writeMock = async (data) => {
  try {
    await fs.writeFile(FILENAME, data);
    console.info(chalk.green(SUCCESS_TEXT));
    process.exit(EXIT_CODE.SUCCESS);
  } catch (err) {
    console.error(chalk.red(NOT_WORKING_TEXT, err));
    process.exit(EXIT_CODE.ERROR);
  }
};

const createMockData = async (param) => {
  const count = Number.parseInt(param, 10);
  if (Number.isNaN(count)) {
    const mock = await generateAds(DEFAULT_MOCK_COUNT);
    writeMock(mock);
    return;
  }

  if (count > MAX_MOCK_COUNT) {
    console.error(chalk.red(MANY_ADS_TEXT));
    process.exit(EXIT_CODE.ERROR);
  }
  const mock = await generateAds(count);
  writeMock(mock);
};

module.exports = {
  name: `--generate`,
  run: createMockData
};
