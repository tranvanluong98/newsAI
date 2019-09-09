import get from 'lodash/get';

import {
  capitalSourceOpts,
  categoryOpts,
  contractStateOpts,
  contractTypeOpts,
  packageOpts,
  partnerOpts,
} from './generators/config';
import getItemWithId from '@/utils/getItemWithId';

import { contractGenerator } from './generators';

export const contractMockData = contractGenerator(100);

function getContract(req, res) {
  const perPage = get(req, 'query.pagination.perPage') || 10;
  const page = get(req, 'query.pagination.page') || 1;
  return res.json({
    total: contractMockData.length,
    items: contractMockData.slice((page - 1) * perPage, page * perPage),
  });
}

function getIdContract(req, res) {
  const { id } = req.params;
  const indexOfId = contractMockData.findIndex(item => item.id === id);
  return res.json(contractMockData[indexOfId]);
}

function postContract(req, res) {
  const {
    contractNum,
    contractName,
    capitalSoureId,
    packageId,
    categoryId,
    partnerId,
    contractTypeId,
    contractStateId,
  } = req.body;
  const newContract = {
    contractNum,
    contractName,
    capitalSource: getItemWithId(capitalSourceOpts, capitalSoureId),
    package: getItemWithId(packageOpts, packageId),
    category: getItemWithId(categoryOpts, categoryId),
    partner: getItemWithId(partnerOpts, partnerId),
    contractType: getItemWithId(contractTypeOpts, contractTypeId),
    contractState: getItemWithId(contractStateOpts, contractStateId),
  };
  contractMockData.unshift(newContract);
  res.send(newContract);
}

function putContract(req, res) {
  const { id } = req.params;
  const indexOfId = contractMockData.findIndex(item => item.id === id);
  const {
    capitalSoureId,
    packageId,
    categoryId,
    partnerId,
    contractTypeId,
    contractStateId,
  } = req.body;
  if (indexOfId >= 0) {
    contractMockData[indexOfId] = {
      ...contractMockData[indexOfId],
      ...req.body,
      capitalSource: getItemWithId(capitalSourceOpts, capitalSoureId),
      package: getItemWithId(packageOpts, packageId),
      category: getItemWithId(categoryOpts, categoryId),
      partner: getItemWithId(partnerOpts, partnerId),
      contractType: getItemWithId(contractTypeOpts, contractTypeId),
      contractState: getItemWithId(contractStateOpts, contractStateId),
    };
  }
  res.send({
    ...contractMockData[indexOfId],
  });
}

function deleteContract(req, res) {
  res.send({
    message: 'OK',
  });
}

export default {
  'GET /contract': getContract,
  'GET /contract/:id': getIdContract,
  'POST /contract': postContract,
  'PUT /contract/:id': putContract,
  'DELETE /contract/:id': deleteContract,
};
