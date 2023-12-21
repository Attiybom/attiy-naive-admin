import { request } from '@/utils'

export default {
  changePassword: (data) => request.post('/auth/password', data),
  updateProfile: (id, data) => request.patch(`/user/profile/${id}`, data),
}
