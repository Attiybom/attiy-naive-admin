import { request } from '@/utils'

export default {
  login: (data) => request.post('/auth/login', data, { noNeedToken: true }),
  register: (data) => request.post('/auth/register', data, { noNeedToken: true }),
}
