import get from 'lodash/get';

import {
  constructionrequestmentOpts,
  constructionGroupOpts,
  constructionStates,
  constructionPackageOpts,
  partnerOpts,
} from './generators/config';
import getItemWithId from '@/utils/getItemWithId';

import { constructionGenerator } from './generators';

const constructionMockData = constructionGenerator(100);

function getConstruction(req, res) {
  const perPage = get(req, 'query.pagination.perPage') || 10;
  const page = get(req, 'query.pagination.page') || 1;
  return res.json({
    total: constructionMockData.length,
    items: constructionMockData.slice((page - 1) * perPage, page * perPage),
  });
}

function getIdConstruction(req, res) {
  const { id } = req.params;
  const indexOfId = constructionMockData.findIndex(item => item.id === id);
  return res.json(constructionMockData[indexOfId]);
}

function postConstruction(req, res) {
  const {
    catalogJob,
    groupId,
    packageId,
    contractorsId,
    contractStateId,
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
    catalogJob,
    group: getItemWithId(constructionGroupOpts, groupId),
    package: getItemWithId(constructionPackageOpts, packageId),
    contractors: getItemWithId(partnerOpts, contractorsId),
    contractStateId: getItemWithId(constructionStates, contractStateId),
  };
  constructionMockData.unshift(newConstruction);
  res.send(newConstruction);
}

function putConstruction(req, res) {
  const { id } = req.params;
  const indexOfId = constructionMockData.findIndex(item => item.id === id);
  const {
    catalogJob,
    groupId,
    packageId,
    contractorsId,
    contractStateId,
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
      catalogJob,
      group: getItemWithId(constructionGroupOpts, groupId),
      package: getItemWithId(constructionPackageOpts, packageId),
      contractors: getItemWithId(partnerOpts, contractorsId),
      contractStateId: getItemWithId(constructionStates, contractStateId),
    };
  }
  res.send({
    ...constructionMockData[indexOfId],
  });
}

function deleteConstruction(req, res) {
  res.send({
    message: 'OK',
  });
}

export default {
  'GET /construction': getConstruction,
  'GET /construction/:id': getIdConstruction,
  'POST /construction': postConstruction,
  'PUT /construction/:id': putConstruction,
  'DELETE /construction/:id': deleteConstruction,
};
