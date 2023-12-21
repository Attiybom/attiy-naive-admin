import { request } from '@/utils'

export default {
  getAllUsers: () => request.get('/user'),
}
