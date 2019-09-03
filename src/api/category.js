import axios from '@/utils/myaxios.js'
export const catelists = (params) => {
  return axios({
    url: `categories`,
    params
  })
}
export const addcate = (id, sel) => {
  return axios({
    url: `categories/${id}/attributes`,
    params: { sel }
  })
}
