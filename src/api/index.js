import { request } from '@/utils'

export default {
  getAllUsers: () => request.get('/user'),
  getUserInfo: () => request.get(`/user/currentUser`),
  refreshToken: () => request.post('/auth/refreshToken', null, { noNeedTip: true }),
}
