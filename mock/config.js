import {
  statusConfig,
  projectConfig,
  categoryConfig,
  constructionStates,
  costCatConfig,
  calUnitConfig,
} from './generators';

const getConfigProject = (req, res) => res.json(projectConfig);

const getCategoryConfig = (req, res) => res.json(categoryConfig);

const getStatusConfig = (req, res) => res.json(statusConfig);

const getConstructionStates = (req, res) => res.json(constructionStates);
export default {
  'GET /config/project': getConfigProject,
  'GET /config/category': getCategoryConfig,
  'GET /config/status': getStatusConfig,
  'GET /config/costCategory': costCatConfig,
  'GET /config/calUnit': calUnitConfig,
  'GET /config/constructionStates': getConstructionStates,
};
