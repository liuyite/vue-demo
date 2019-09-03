import axios from '@/utils/myaxios.js'
export const reportsData = (type) => {
  return axios({
    url: `reports/type/${type}`
  })
}
