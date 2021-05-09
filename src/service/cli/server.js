'use strict';

const fs = require(`fs`).promises;
const express = require(`express`);
const {nanoid} = require(`nanoid`);
const path = require(`path`);
const {URL} = require(`./../constants`);

const MOCK_DATA_PATH = path.resolve(__dirname, `./../../../mock.json`);
const PORT = 3000;

const NOT_FOUND_MESSAGE = `Not found`;
const NOT_FOUND_OFFER_MESSAGE = `Offer not found`;
const NO_RESULT_MESSAGE = `No result`;
const NOT_FOUND_COMMENT = `Comment not found`;
const BAD_REQUEST_MESSAGE = `Invalid request params`;

const COMMENT_DELETED_MESSAGE = `Comment deleted`;
const COMMENT_ADD_MESSAGE = `Comment added`;
const OFFER_CREATE_MESSAGE = `Offer created`;
const OFFER_EDIT_MESSAGE = `Offer edited`;
const OFFER_DELETE_MESSAGE = `Offer deleted`;
const SERVER_ERROR_MESSAGE = `Something went wrong`;

const StatusCode = {
  OK: `200`,
  CREATED: `201`,
  BADREQUEST: `400`,
  NOTFOUND: `404`,
  SERVERERROR: `500`
};

const app = express();
app.use(express.json());

const readData = async () => {
  const mockData = await fs.readFile(MOCK_DATA_PATH, `utf-8`);
  const offers = JSON.parse(mockData);
  Array.prototype.push.apply(readingData, offers);
};

const findAllCategories = () => {
  const categories = [];
  readingData.forEach((elem) => {
    elem.category.forEach((elemCategory) => {
      if (!categories.includes(elemCategory)) {
        categories.push(elemCategory);
      }
    });
  });
  return categories;
};


const checkOffersData = (data) => (data.category) && (data.title) && (data.sum) && (data.type);

const getOffer = (id) => readingData.find((elem) => id === elem.id);

const addOffer = (offerData) => {
  readingData.push({
    id: nanoid(6),
    type: offerData.type,
    title: offerData.title,
    description: offerData.description ? offerData.description : null,
    sum: offerData.sum,
    picture: offerData.picture ? offerData.picture : null,
    category: offerData.category,
    comments: []
  });
};

const editOffer = (data, offerId) => {
  const offerIndex = readingData.findIndex((elem) => offerId === elem.id);
  if (offerIndex === -1) {
    return {status: false, message: NOT_FOUND_OFFER_MESSAGE, code: StatusCode.NOTFOUND};
  }
  if (!checkOffersData(data)) {
    return {status: false, message: BAD_REQUEST_MESSAGE, code: StatusCode.BADREQUEST};
  }
  readingData[offerIndex] = {...readingData[offerIndex],
    type: data.type,
    title: data.title,
    description: data.description,
    sum: data.sum,
    picture: data.picture,
    category: data.category
  };
  return {status: true};
};

const deleteOffer = (id) => {
  const offerIndex = readingData.findIndex((elem) => id === elem.id);
  console.log(offerIndex);
  if (offerIndex === -1) {
    return false;
  }
  readingData.splice(offerIndex, 1);
  return true;
};

const getOfferComments = (id) => readingData.find((elem) => id === elem.id).comments;

const addComment = (offerId, message) => {
  const offerIndex = readingData.findIndex((elem) => offerId === elem.id);
  if (offerIndex === -1) {
    return {status: false, message: NOT_FOUND_OFFER_MESSAGE, code: StatusCode.NOTFOUND};
  }
  if (message.text) {
    readingData[offerIndex].comments.push({
      text: message.text,
      id: nanoid(6)
    });
    return {status: true};
  }
  return {status: false, message: BAD_REQUEST_MESSAGE, code: StatusCode.BADREQUEST};
};

const deleteComment = (offerId, commentId) => {
  const offerIndex = readingData.findIndex((elem) => offerId === elem.id);
  if (offerIndex === -1) {
    return {status: false, message: NOT_FOUND_OFFER_MESSAGE};
  }
  const commentIndex = readingData[offerIndex].comments.findIndex((elem) => commentId === elem.id);
  if (commentIndex === -1) {
    return {status: false, message: NOT_FOUND_COMMENT};
  }
  readingData[offerIndex].comments.splice(commentIndex, 1);
  return {status: true};
};

const searchOffers = (query) => {
  return readingData.filter((elem) => elem.title.indexOf(query) !== -1);
};

const readingData = [];
readData();

app.get(URL.API.OFFERS, (request, response) => response.json(readingData));

app.get(URL.API.OFFERID, (request, response) => {
  const offer = getOffer(request.params.offerId);
  console.log(offer);
  if (offer) {
    return response.send(offer);
  }
  return response.status(StatusCode.NOTFOUND).send(NOT_FOUND_OFFER_MESSAGE);
});

app.get(URL.API.CATEGORIES, (request, response) => response.json(findAllCategories()));

app.post(URL.API.OFFERS, (request, response) => {
  if (checkOffersData(request.body)) {
    addOffer(request.body);
    return response.status(StatusCode.CREATED).send(OFFER_CREATE_MESSAGE);
  }
  console.log(request.body);
  return response.status(StatusCode.BADREQUEST).send(BAD_REQUEST_MESSAGE);
});

app.put(URL.API.OFFERID, (request, response) => {
  const result = editOffer(request.body, request.params.offerId);
  return result.status ? response.status(StatusCode.OK).send(OFFER_EDIT_MESSAGE) :
    response.status(result.code).send(result.message);
});

app.delete(URL.API.OFFERID, (request, response) =>
  deleteOffer(request.params.offerId) ? response.status(StatusCode.OK).send(OFFER_DELETE_MESSAGE) :
    response.status(StatusCode.BADREQUEST)
);

app.get(URL.API.COMMENTS, (request, response) => {
  const comments = getOfferComments(request.params.offerId);
  return response.status(StatusCode.OK).send(comments || {});
}
);

app.delete(URL.API.COMMENTID, (request, response) => {
  const result = deleteComment(request.params.offerId, request.params.commentId);
  return result.status ? response.status(StatusCode.OK).send(COMMENT_DELETED_MESSAGE) : response.status(StatusCode.NOTFOUND).send(result.message);
});

app.post(URL.API.COMMENTS, (request, response) => {
  const result = addComment(request.params.offerId, request.body);
  return result.status ? response.status(StatusCode.CREATED).send(COMMENT_ADD_MESSAGE) : response.status(result.code).send(result.message);
});

app.get(URL.API.SEARCH, (request, response) => {
  const foundOffers = searchOffers(request.query.query);
  return foundOffers.length ? response.status(StatusCode.OK).send(foundOffers) :
    response.status(StatusCode.NOTFOUND).send(NO_RESULT_MESSAGE);
});

app.use((request, response) => response
.status(StatusCode.NOTFOUND).send(NOT_FOUND_MESSAGE)
);

// next добавляем для того, чтобы не вызывать дефолтный обработчик 500й
// eslint-disable-next-line
app.use((error, request, response, next) => {
  console.error(error.stack);
  return response.status(StatusCode.SERVERERROR).send(SERVER_ERROR_MESSAGE);
});


module.exports = {
  name: `--server`,
  run: (portNumber) => parseInt(portNumber, 10) ? app.listen(portNumber) : app.listen(PORT)
};
