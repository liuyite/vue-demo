import axios from '@/utils/myaxios.js'
export const users = (params) => {
  return axios({
    url: 'users',
    params
  })
}
export const addUsers = (data) => {
  return axios({
    url: 'users',
    method: 'post',
    data
  })
}
export const delUsers = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}
export const editUsers = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}
export const qxglUsers = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}
export const assignUsers = (id, rid) => {
  return axios({
    url: `users/${id}/role`,
    method: 'put',
    data: { rid }
  })
}
