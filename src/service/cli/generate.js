'use strict';

const fs = require(`fs`);
const {EXIT_CODE} = require(`./../constants`);
const {getRandomInt, shuffle} = require(`./../utils/utils`);

const FILENAME = `./../../mock.json`;
const DEFAULT_MOCK_COUNT = 1;
const MAX_MOCK_COUNT = 1000;

const NOT_WORKING_TEXT = `Не удалось сгенерировать данные, приложение завершит свою работу.`;
const MANY_ADS_TEXT = `Не больше 1000 объявлений`;
const SUCCESS_TEXT = `Данные сгенерированны. Новый файл создан.`;

const TITLE_AD = [
  `Продам книги Стивена Кинга.`,
  `Продам новую приставку Sony Playstation 5.`,
  `Продам отличную подборку фильмов на VHS.`,
  `Куплю антиквариат.`,
  `Куплю породистого кота.`,
  `Продам коллекцию журналов «Огонёк».`,
  `Отдам в хорошие руки подшивку «Мурзилка».`,
  `Продам советскую посуду. Почти не разбита.`,
  `Куплю детские санки.`
];

const DESCRIPTION_AD = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`
];
const DESCRIPTION_AD_MAX_COUNT = 5;

const PRICE_AD = {
  MIN: 1000,
  MAX: 100000
};

const CATEGORY_AD = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`
];

const PICTURE_AD_COUNT = 16;
const PICTURE_AD = new Array(PICTURE_AD_COUNT).fill(``).
  map((em, i) => `item${i + 1 < 10 ? `0${i + 1}` : i + 1}.jpg`);


const generateAd = () => ({
  type: CATEGORY_AD[getRandomInt(0, CATEGORY_AD.length - 1)],
  title: TITLE_AD[getRandomInt(0, TITLE_AD.length - 1)],
  description: shuffle(DESCRIPTION_AD).slice(0, getRandomInt(1, DESCRIPTION_AD_MAX_COUNT)).join(` `),
  sum: getRandomInt(PRICE_AD.MIN, PRICE_AD.MAX),
  picture: PICTURE_AD[getRandomInt(0, PICTURE_AD_COUNT - 1)],
  category: shuffle(CATEGORY_AD).slice(getRandomInt(0, CATEGORY_AD.length - 1)).join(` `)
});

const generateAds = (count) => {
  console.log(count);
  return JSON.stringify(new Array(count).fill({}).map(generateAd));
};

const writeMock = (data) => {
  fs.writeFile(FILENAME, data, (err) => {
    if (err) {
      console.error(NOT_WORKING_TEXT);
      process.exit(EXIT_CODE.ERROR);

    }
    console.info(SUCCESS_TEXT);
    process.exit(EXIT_CODE.SUCCESS);
  });
};

const createMockData = (param) => {
  const count = Number.parseInt(param, 10);
  if (Number.isNaN(count)) {
    const mock = generateAds(DEFAULT_MOCK_COUNT);
    writeMock(mock);
    return;
  }

  if (count > MAX_MOCK_COUNT) {
    console.error(MANY_ADS_TEXT);
    process.exit(EXIT_CODE.ERROR);
  }
  const mock = generateAds(count);
  writeMock(mock);
};

module.exports = {
  name: `--generate`,
  run: createMockData
};
