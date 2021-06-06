'use strict';

const express = require(`express`);
const request = require(`supertest`);

const offers = require(`./offers`);
const OffersService = require(`./../data-service/offers`);
const CommentsService = require(`./../data-service/comments`);
const {StatusCode, Messages} = require(`./../constants`);


const firstId = `IjlL7I`;
const secondId = `KtjgmO`;
const thirdId = `DhpOE9`;
const commentId = `1Mhtqu`;
const mockData = [
  {
    "id": firstId,
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
    "id": secondId,
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
    "id": thirdId,
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
        "id": commentId,
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
offers(app, new OffersService(mockData), new CommentsService(mockData));


describe(`Return all offers`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(parseInt(StatusCode.OK, 10)));
  test(`All offers found`, () => expect(response.body).toEqual(mockData));
});

describe(`Find specific order`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/${firstId}`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(parseInt(StatusCode.OK, 10)));
  test(`Offer found`, () => expect(response.body).toEqual(mockData[0]));
});

describe(`Find non-existing order`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/testid`);
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(parseInt(StatusCode.NOTFOUND, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.NOT_FOUND_OFFER));
});

describe(`Create new offer with correct data`, () => {
  let response;
  let listResponse;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send({
        title: `Продам тестовый предмет.`,
        type: `Тест`,
        description: `Некоторое описание`,
        sum: 21,
        picture: `item09.jpg`,
        category: [
          `Тестовая категория`
        ]
      });
    listResponse = await request(app)
    .get(`/offers`);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(parseInt(StatusCode.CREATED, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.OFFER_CREATE));
  test(`Offer found in offers list`, () => expect(listResponse.body[5]).toMatchObject({
    title: `Продам тестовый предмет.`,
    type: `Тест`,
    description: `Некоторое описание`,
    sum: 21,
    picture: `item09.jpg`,
    category: [
      `Тестовая категория`
    ]
  }));
});

describe(`Create order without required parameters`, () => {
  let response;
  let offersListResponse;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send({
        type: `Тест`,
        description: `Некоторое описание`,
        sum: 21,
        picture: `item09.jpg`,
        category: [
          `Тестовая категория`
        ]
      });
    offersListResponse = await request(app)
      .get(`/offers`);
  });

  test(`Status code 401`, () => expect(response.statusCode).toBe(parseInt(StatusCode.BADREQUEST, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.BAD_REQUEST));
  test(`Offer didn't create`, () => expect(offersListResponse.body).toHaveLength(6));
});

describe(`Edit offer with correct data`, () => {
  let response;
  let offerDataResponse;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/${firstId}`)
      .send({
        "id": secondId,
        "type": `Тестовый тип`,
        "title": `Продам собаку.`,
        "description": `Это измененное описание`,
        "sum": 9292,
        "picture": `test.jpg`,
        "test": true,
        "category": [
          `Вещи`,
          `Продукты`
        ],
        "comments": [
          {
            "id": `newnew`,
            "text": `Ошибочный коммент`
          }
        ]
      });
    offerDataResponse = await request(app)
      .get(`/offers/${firstId}`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(parseInt(StatusCode.OK, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.OFFER_EDIT));
  test(`Offer edited`, async () => expect(offerDataResponse.body).toMatchObject({
    id: firstId,
    title: `Продам собаку.`,
    type: `Тестовый тип`,
    description: `Это измененное описание`,
    sum: 9292,
    category: [
      `Вещи`,
      `Продукты`
    ],
    comments: [
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
  })
  );
  test(`Wrong parameter didn't add`, () => expect(offerDataResponse.body).not.toMatchObject({test: true}));
});


describe(`Edit non-existing offer`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/nonexistid`)
      .send({
        "type": `Тестовый тип`,
        "title": `Продам собаку.`,
        "description": `Это измененное описание`,
        "sum": 9292,
        "picture": `test.jpg`,
        "test": true,
        "category": [
          `Вещи`,
          `Продукты`
        ]
      });
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(parseInt(StatusCode.NOTFOUND, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.NOT_FOUND_OFFER));
});

describe(`Edit offer without require data`, () => {
  let response;
  let offerDataResponse;

  beforeAll(async () => {
    response = await request(app)
      .put(`/offers/${secondId}`)
      .send({});
    offerDataResponse = await request(app)
      .get(`/offers/${secondId}`);
  });

  test(`Status code 401`, () => expect(response.statusCode).toBe(parseInt(StatusCode.BADREQUEST, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.BAD_REQUEST));
  test(`Offer didn't edited`, () => expect(offerDataResponse.body).toEqual(mockData[1]));
});


describe(`Delete offer`, () => {
  let response;
  let offerDataResponse;
  let offersListResponse;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/${secondId}`);
    offerDataResponse = await request(app)
      .get(`/offers/${secondId}`);
    offersListResponse = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(parseInt(StatusCode.OK, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.OFFER_DELETE));
  test(`Offer doesn't exist anymore`, () => expect(offerDataResponse.statusCode).toBe(parseInt(StatusCode.NOTFOUND, 10)));
  test(`Offer isn't in the offers list`, () => expect(offersListResponse.body).toHaveLength(5));
});

describe(`Return comments list`, () => {
  let response;
  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/${thirdId}/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(parseInt(StatusCode.OK, 10)));
  test(`Get comments`, () => expect(response.body).toEqual(mockData[mockData.findIndex((elem) => elem.id === thirdId)].comments));
});

describe(`Add new comment`, () => {
  let response;
  let commentsListResponse;
  beforeAll(async () => {
    response = await request(app)
      .post(`/offers/${thirdId}/comments`)
      .send({
        "test": true,
        "id": `testtesttest`,
        "text": `New comment`
      });
    commentsListResponse = await request(app)
      .get(`/offers/${thirdId}/comments`);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(parseInt(StatusCode.CREATED, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.COMMENT_ADD));
  test(`New comment added`, () => expect(commentsListResponse.body).toHaveLength(5));
  test(`Comment include correct message`, () => expect(commentsListResponse.body[4].text).toEqual(`New comment`));
  test(`Correct id created`, () => expect(commentsListResponse.body[4].id).not.toEqual(`testtesttest`));
  test(`Wrong data didn't add`, () => expect(commentsListResponse.body[4]).not.toMatchObject({test: true}));
});

describe(`Add comment with wrong data`, () => {
  let response;
  let commentsListResponse;

  beforeAll(async () => {
    response = await request(app)
    .post(`/offers/${thirdId}/comments`)
    .send({});
    commentsListResponse = await request(app)
    .get(`/offers/${thirdId}/comments`);
  });

  test(`Status code 401`, () => expect(response.statusCode).toBe(parseInt(StatusCode.BADREQUEST, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.BAD_REQUEST));
  test(`Comment didn't create`, () => expect(commentsListResponse.body).toHaveLength(5));
});

describe(`Add comment to non-existing offer`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
    .post(`/offers/nonexistid/comments`)
    .send({
      "text": `New comment`
    });
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(parseInt(StatusCode.NOTFOUND, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.NOT_FOUND_OFFER));
});

describe(`Delete comment`, () => {
  let response;
  let commentsListResponse;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/${thirdId}/comments/${commentId}`);
    commentsListResponse = await request(app)
      .get(`/offers/${thirdId}/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(parseInt(StatusCode.OK, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.COMMENT_DELETE));
  test(`Comment deleted`, () => expect(commentsListResponse.body).toHaveLength(4));
  test(`Deleted comment doesn't exist`, () => expect(commentsListResponse.body.find((elem) => elem.id === commentId)).toBeUndefined());
});

describe(`Delete non-existing comment`, () => {
  let response;
  let commentsListResponse;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/${thirdId}/comments/nonexistid`);
    commentsListResponse = await request(app)
      .get(`/offers/${thirdId}/comments`);
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(parseInt(StatusCode.NOTFOUND, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.NOT_FOUND_COMMENT));
  test(`Count of comments doesn't change`, () => expect(commentsListResponse.body).toHaveLength(4));
});

describe(`Delete comment in non-existing offer`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/offers/nonexistid/comments/nonexistid`);
  });

  test(`Status code 404`, () => expect(response.statusCode).toBe(parseInt(StatusCode.NOTFOUND, 10)));
  test(`Response contains correct message`, () => expect(response.text).toEqual(Messages.NOT_FOUND_OFFER));
});
