'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const SearchService = require(`../data-service/search`);
const {StatusCode} = require(`./../constants`);

const mockData = [
  {
    "id": `IjlL7I`,
    "type": `Разное`,
    "title": `Куплю породистого кота.`,
    "description": `Мой дед не мог её сломать.`,
    "sum": 93639,
    "picture": `item09.jpg`,
    "category": [
      `Игры`,
      `Разное`
    ],
    "comments": [
      {
        "id": `xRC9bO`,
        "text": `Совсем немного...`
      },
      {
        "id": `-qXDiZ`,
        "text": `Вы что?! В магазине дешевле.`
      },
      {
        "id": `9MGWyZ`,
        "text": `А сколько игр в комплекте?`
      },
      {
        "id": `l1C0nY`,
        "text": `Неплохо, но дорого`
      },
      {
        "id": `02If5N`,
        "text": `А где блок питания?`
      },
      {
        "id": `bSQ8ef`,
        "text": `А где блок питания?`
      }
    ]
  },
  {
    "id": `KtjgmO`,
    "type": `Животные`,
    "title": `Куплю антиквариат.`,
    "description": `Если товар не понравится — верну всё до последней копейки. Если найдёте дешевле — сброшу цену. Кому нужен этот новый телефон, если тут такое...`,
    "sum": 58057,
    "picture": `item08.jpg`,
    "category": [
      `Журналы`,
      `Игры`,
      `Книги`,
      `Посуда`
    ],
    "comments": [
      {
        "id": `ftKxEr`,
        "text": `Оплата наличными или перевод на карту?`
      },
      {
        "id": `3PPXuT`,
        "text": `Совсем немного...`
      },
      {
        "id": `iSsdEE`,
        "text": `Неплохо, но дорого`
      },
      {
        "id": `qXzCLv`,
        "text": `Вы что?! В магазине дешевле.`
      },
      {
        "id": `m2yQrZ`,
        "text": `Совсем немного...`
      },
      {
        "id": `HMPF6z`,
        "text": `Оплата наличными или перевод на карту?`
      },
      {
        "id": `q_U02j`,
        "text": `А сколько игр в комплекте?`
      },
      {
        "id": `zx-1u0`,
        "text": `Неплохо, но дорого`
      }
    ]
  },
  {
    "id": `DhpOE9`,
    "type": `Животные`,
    "title": `Продам советскую посуду. Почти не разбита.`,
    "description": `Товар в отличном состоянии. Бонусом отдам все аксессуары. Не пытайтесь торговаться. Цену вещам я знаю.`,
    "sum": 56532,
    "picture": `item06.jpg`,
    "category": [
      `Животные`,
      `Игры`
    ],
    "comments": [
      {
        "id": `1Mhtqu`,
        "text": `С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `VbZeiF`,
        "text": `Неплохо, но дорого`
      },
      {
        "id": `2bfaRb`,
        "text": `Совсем немного...`
      },
      {
        "id": `z4wO0Y`,
        "text": `Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    "id": `6gU10n`,
    "type": `Посуда`,
    "title": `Продам книги Стивена Кинга.`,
    "description": `Продаю с болью в сердце... При покупке с меня бесплатная доставка в черте города.`,
    "sum": 65256,
    "picture": `item11.jpg`,
    "category": [
      `Книги`,
      `Разное`,
      `Животные`,
      `Игры`,
      `Журналы`,
      `Посуда`
    ],
    "comments": [
      {
        "id": `Yadv5K`,
        "text": `Оплата наличными или перевод на карту?`
      },
      {
        "id": `1Z8z0a`,
        "text": `Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `FP2SSm`,
        "text": `Совсем немного...`
      }
    ]
  },
  {
    "id": `mOKehX`,
    "type": `Разное`,
    "title": `Куплю породистого кота.`,
    "description": `Кому нужен этот новый телефон, если тут такое...`,
    "sum": 68429,
    "picture": `item12.jpg`,
    "category": [
      `Игры`,
      `Разное`
    ],
    "comments": [
    ]
  }
];

const app = express();
app.use(express.json());
search(app, new SearchService(mockData));


describe(`API returns offer based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
          .get(`/api/search`)
          .query({
            query: `Куплю`
          });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`KtjgmO`));
});

describe(`API returns offers based on search query`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
          .get(`/search`)
          .query({
            query: `Куплю`
          });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCode.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(3));
});

describe(`API returns no result based on search query which not match`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
          .get(`/search`)
          .query({
            query: `Продам антиквариат`
          });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(StatusCode.NOTFOUND));
});
