import axios from '@/utils/myaxios.js'
export const rightInfo = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
