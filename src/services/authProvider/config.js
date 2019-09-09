export const authApiMeta = {
  basicLogin: {
    method: 'post',
    url: '/auth/login',
  },
  forgotPass: {
    method: 'post',
    url: '/auth/forgotPass',
  },
  updateInfo: {
    method: 'post',
    url: '/auth/facebook-kit/register',
  },
  updateCats: {
    method: 'post',
    url: '/users/follow-category',
  },
  facebookLogin: {
    method: 'post',
    url: '/auth/facebook/login',
  },
  updatePass: {
    method: 'post',
    url: '/auth/updatePass',
  },
};
