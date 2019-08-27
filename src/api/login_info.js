// 引入axios
import axios from '@/utils/myaxios.js'
export const login = (data) => {
  return axios({
    method: 'post',
    url: 'login',
    data
  })
}
