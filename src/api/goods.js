import axios from '@/utils/myaxios.js'
export const goodslists = (params) => {
  return axios({
    url: `goods`,
    params
  })
}
export const addGoods = (data) => {
  return axios({
    url: `goods`,
    method: 'post',
    data
  })
}
export const delGoods = (id) => {
  return axios({
    url: `goods/${id}`,
    method: 'delete'
  })
}
export const editGoods = (id) => {
  return axios({
    url: `goods/${id}`
  })
}
