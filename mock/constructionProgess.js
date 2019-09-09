import get from 'lodash/get';

import { constructionrequestmentOpts } from './generators/config';
import getItemWithId from '@/utils/getItemWithId';

import { ConstructionProgessGenerator } from './generators';

const constructionMockData = ConstructionProgessGenerator(100);

function getConstructionProgess(req, res) {
  const perPage = get(req, 'query.pagination.perPage') || 10;
  const page = get(req, 'query.pagination.page') || 1;
  return res.json({
    total: constructionMockData.length,
    items: constructionMockData.slice((page - 1) * perPage, page * perPage),
  });
}

function getIdConstructionProgess(req, res) {
  const { id } = req.params;
  const indexOfId = constructionMockData.findIndex(item => item.id === id);
  return res.json(constructionMockData[indexOfId]);
}

function postConstructionProgess(req, res) {
  const {
    realEditDate,
    realNumbers,
    realNumbersCommit,
    suppliesProvided,
    progressAchieved,
    requestmentUnitId,
    imageConstruction,
  } = req.body;
  const newConstruction = {
    realEditDate,
    realNumbers,
    realNumbersCommit,
    suppliesProvided,
    progressAchieved,
    imageConstruction,
    requestmentUnitId: getItemWithId(
      constructionrequestmentOpts,
      requestmentUnitId,
    ),
  };
  constructionMockData.unshift(newConstruction);
  res.send(newConstruction);
}

function putConstructionProgess(req, res) {
  const { id } = req.params;
  const indexOfId = constructionMockData.findIndex(item => item.id === id);
  const {
    realEditDate,
    realNumbers,
    realNumbersCommit,
    suppliesProvided,
    progressAchieved,
    requestmentUnitId,
    imageConstruction,
  } = req.body;
  if (indexOfId >= 0) {
    constructionMockData[indexOfId] = {
      ...constructionMockData[indexOfId],
      ...req.body,
      realEditDate,
      realNumbers,
      realNumbersCommit,
      suppliesProvided,
      progressAchieved,
      imageConstruction,
      requestmentUnitId: getItemWithId(
        constructionrequestmentOpts,
        requestmentUnitId,
      ),
    };
  }
  res.send({
    ...constructionMockData[indexOfId],
  });
}

function deleteConstructionProgess(req, res) {
  res.send({
    message: 'OK',
  });
}

export default {
  'GET /progess': getConstructionProgess,
  'GET /progess/:id': getIdConstructionProgess,
  'POST /progess': postConstructionProgess,
  'PUT /progess/:id': putConstructionProgess,
  'DELETE /progess/:id': deleteConstructionProgess,
};
