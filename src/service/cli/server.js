'use strict';

const fs = require(`fs`).promises;
const express = require(`express`);
const {nanoid} = require(`nanoid`);
const path = require(`path`);
const {URL} = require(`./../constants`);

const MOCK_DATA_PATH = path.resolve(__dirname, `./../../../mock.json`);
const PORT = 3000;

const Messages = {
  NOT_FOUND: `Not found`,
  NOT_FOUND_OFFER: `Offer not found`,
  NO_RESULT: `No result`,
  NOT_FOUND_COMMENT: `Comment not found`,
  BAD_REQUEST: `Invalid request params`,
  COMMENT_DELETE: `Comment deleted`,
  COMMENT_ADD: `Comment added`,
  OFFER_CREATE: `Offer created`,
  OFFER_EDIT: `Offer edited`,
  OFFER_DELETE: `Offer deleted`,
  SERVER_ERROR: `Something went wrong`
};

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
  return {status: StatusCode.OK, content: categories};
};


const checkOffersData = (data) => (data.category) && (data.title) && (data.sum) && (data.type);

const getAllOffers = () => ({status: StatusCode.OK, content: readingData});

const getOffer = (id) => {
  const offer = readingData.find((elem) => id === elem.id);
  if (offer) {
    return {status: StatusCode.OK, content: offer};
  }
  return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_OFFER};
};

const addOffer = (offerData) => {
  if (checkOffersData(offerData)) {
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
    return {status: StatusCode.CREATED, content: Messages.OFFER_CREATE};
  }
  return {status: StatusCode.BADREQUEST, content: Messages.BAD_REQUEST};
};

const editOffer = (requestData) => {
  const {data, offerId} = requestData;
  const offerIndex = readingData.findIndex((elem) => offerId === elem.id);
  if (offerIndex === -1) {
    return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_OFFER};
  }
  if (!checkOffersData(data)) {
    return {status: StatusCode.BADREQUEST, content: Messages.BAD_REQUEST};
  }
  readingData[offerIndex] = {...readingData[offerIndex],
    type: data.type,
    title: data.title,
    description: data.description,
    sum: data.sum,
    picture: data.picture,
    category: data.category
  };
  return {status: StatusCode.OK, content: Messages.OFFER_EDIT};
};

const deleteOffer = (id) => {
  const offerIndex = readingData.findIndex((elem) => id === elem.id);
  if (offerIndex === -1) {
    return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_OFFER};
  }
  readingData.splice(offerIndex, 1);
  return {status: StatusCode.OK, content: Messages.OFFER_DELETE};
};

const getOfferComments = (id) => ({status: StatusCode.OK, content: readingData.find((elem) => id === elem.id).comments});

const addComment = (requestData) => {
  const {offerId, message} = requestData;
  const offerIndex = readingData.findIndex((elem) => offerId === elem.id);
  if (offerIndex === -1) {
    return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_OFFER};
  }
  if (message.text) {
    readingData[offerIndex].comments.push({
      text: message.text,
      id: nanoid(6)
    });
    return {status: StatusCode.CREATED, content: Messages.COMMENT_ADD};
  }
  return {status: StatusCode.BADREQUEST, content: Messages.BAD_REQUEST};
};

const deleteComment = (requestData) => {
  const {offerId, commentId} = requestData;
  const offerIndex = readingData.findIndex((elem) => offerId === elem.id);
  if (offerIndex === -1) {
    return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_OFFER};
  }
  const commentIndex = readingData[offerIndex].comments.findIndex((elem) => commentId === elem.id);
  if (commentIndex === -1) {
    return {status: StatusCode.NOTFOUND, content: Messages.NOT_FOUND_COMMENT};
  }
  readingData[offerIndex].comments.splice(commentIndex, 1);
  return {status: StatusCode.OK, content: Messages.COMMENT_DELETE};
};

const searchOffers = (query) => {
  const foundOffers = readingData.filter((elem) => elem.title.indexOf(query) !== -1);
  return foundOffers.length ? {status: StatusCode.OK, content: foundOffers} :
    {status: StatusCode.NOTFOUND, content: Messages.NO_RESULT};
};

const requestHandler = (response, cb, requestData = null) => {
  const result = cb(requestData);
  return response.status(result.status).send(result.content);
};

const readingData = [];
readData();

app.get(URL.API.OFFERS, (request, response) => requestHandler(response, getAllOffers));

app.get(URL.API.OFFERID, (request, response) => requestHandler(response, getOffer, request.params.offerId));

app.get(URL.API.CATEGORIES, (request, response) => requestHandler(response, findAllCategories));

app.post(URL.API.OFFERS, (request, response) => requestHandler(response, addOffer, request.body));

app.put(URL.API.OFFERID, (request, response) =>
  requestHandler(response, editOffer, {data: request.body, offerId: request.params.offerId}));

app.delete(URL.API.OFFERID, (request, response) =>requestHandler(response, deleteOffer, request.params.offerId));

app.get(URL.API.COMMENTS, (request, response) => requestHandler(response, getOfferComments, request.params.id));

app.post(URL.API.COMMENTS, (request, response) =>
  requestHandler(response, addComment, {offerId: request.params.offerId, message: request.body}));

app.delete(URL.API.COMMENTID, (request, response) =>
  requestHandler(response, deleteComment, {offerId: request.params.offerId, commentId: request.params.commentId}));

app.get(URL.API.SEARCH, (request, response) => requestHandler(response, searchOffers, request.query.query));

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
