import get from 'lodash/get';
import abateGenerator from './generators/abate';

const abateMockData = abateGenerator();

function getAbate(req, res) {
  const contractId = get(req, 'query.contractId');
  if (contractId) {
    const result = abateMockData.filter(item => item.contractId === contractId);
    return res.json({
      total: result.length,
      items: result,
    });
  }

  const perPage = get(req, 'query.pagination.perPage') || 10;
  const page = get(req, 'query.pagination.page') || 1;

  return res.json({
    total: abateMockData.length,
    items: abateMockData.slice((page - 1) * perPage, page * perPage),
  });
}

export default {
  'GET /abate': getAbate,
};
