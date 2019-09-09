import get from 'lodash/get';
import {
  contractAttachmentGenerator,
  fileAttachmentGenerator,
} from './generators';

const contractFileAttach = fileAttachmentGenerator(100);
const contractDocAttach = contractAttachmentGenerator(100);

function getContractFileAttachment(req, res) {
  const perPage = get(req, 'query.pagination.perPage') || 3;
  const page = get(req, 'query.pagination.page') || 1;
  return res.json({
    total: contractFileAttach.length,
    items: contractFileAttach.slice((page - 1) * perPage, page * perPage),
  });
}

function getContractDocAttachment(req, res) {
  const perPage = get(req, 'query.pagination.perPage') || 2;
  const page = get(req, 'query.pagination.page') || 1;
  return res.json({
    total: contractDocAttach.length,
    items: contractDocAttach.slice((page - 1) * perPage, page * perPage),
  });
}

const postContractAttachment = attachType => (req, res) => {
  const files = attachType === 'doc' ? contractDocAttach : contractFileAttach;
  const { title, type } = req.body;
  files.push({
    title,
    type,
    link:
      'https://drive.google.com/file/d/0B-lLPLXHCcp4dTE5aE1Lcmt6VHM/view?usp=sharing',
    author: {
      id: '54fd5f4fdfdf45fd',
      username: 'minhnv',
    },
    size: '2,0 MB',
    createdDate: '12/07/2019 09:54 AM',
  });

  return res.send({
    title,
    type,
    link:
      'https://drive.google.com/file/d/0B-lLPLXHCcp4dTE5aE1Lcmt6VHM/view?usp=sharing',
    author: {
      id: '54fd5f4fdfdf45fd',
      username: 'minhnv',
    },
    size: '2,0 MB',
    createdDate: '12/07/2019 09:54 AM',
  });
};

const deleteContractAttach = type => (req, res) => {
  const files = type === 'doc' ? contractDocAttach : contractFileAttach;
  const { id } = res.params;

  const deletedIndex = files.findIndex(item => item.id === id);

  if (deletedIndex < 0) {
    return res.sendStatus(404);
  }

  files.splice(deletedIndex);

  return res.sendStatus(200);
};

export default {
  'GET /file/contractFileAttach': getContractFileAttachment,
  'GET /file/contractDocAttach': getContractDocAttachment,
  'POST /file/contractFileAttach': postContractAttachment('doc'),
  'POST /file/contractDocAttach': postContractAttachment('file'),
  'DELETE /file/contractFileAttach/:id': deleteContractAttach('file'),
  'DELETE /file/contractDocAttach/:id': deleteContractAttach('doc'),
};
