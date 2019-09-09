import get from 'lodash/get';

import { categoryOpts } from './generators/config';
import getItemWithId from '@/utils/getItemWithId';

import { weightGenerator } from './generators';

const weightData = weightGenerator(100);

function getWeight(req, res) {
  const perPage = get(req, 'query.pagination.perPage') || 10;
  const page = get(req, 'query.pagination.page') || 1;
  return res.json({
    total: weightData.length,
    items: weightData.slice((page - 1) * perPage, page * perPage),
  });
}

function getIdWeight(req, res) {
  const { id } = req.params;
  const indexOfId = weightData.findIndex(item => item.id === id);
  return res.json(weightData[indexOfId]);
}

function postWeight(req, res) {
  const {
    categoryId,
    content,
    calUnit,
    weight,
    unitPrice,
    totalRawPrice,
  } = req.body;
  const newWeight = {
    id: `${weightData.length}`,
    content,
    calUnit,
    weight,
    unitPrice,
    totalRawPrice,
    category: getItemWithId(categoryOpts, categoryId),
  };
  weightData.unshift(newWeight);
  res.send(newWeight);
}

function putWeight(req, res) {
  const { id } = req.params;
  const { categoryId } = req.body;
  const indexOfId = weightData.findIndex(item => item.id === id);
  if (indexOfId >= 0) {
    weightData[indexOfId] = {
      ...weightData[indexOfId],
      ...req.body,
      category: getItemWithId(categoryOpts, categoryId),
    };
  }
  res.send({
    ...weightData[indexOfId],
  });
}

function deleteWeight(req, res) {
  res.send({
    message: 'OK',
  });
}

function getWeightSummarize(req, res) {
  res.send({
    totalAfterTax: 30916544745,
    total: 30916544745,
    totalRound: 30916545000,
  });
}

export default {
  'GET /weight': getWeight,
  'GET /weight/:id': getIdWeight,
  'POST /weight': postWeight,
  'PUT /weight/:id': putWeight,
  'DELETE /weight/:id': deleteWeight,
  'GET /weight/summarize': getWeightSummarize,
};
