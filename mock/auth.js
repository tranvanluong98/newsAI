const me = {
  id: '45215',
  username: 'minhnv',
  realName: 'Nguyễn Văn Minh',
  title: {
    name: 'Tổng giám đốc',
    id: '2334',
  },
};

function login(req, res) {
  res.send({
    message: 'OK',
  });
}

function logout(req, res) {
  res.send({
    message: 'OK',
  });
}

function getMe(req, res) {
  return res.json(me);
}

export default {
  'POST /auth/login': login,
  'POST /auth/logout': logout,
  'GET /auth/me': getMe,
};
