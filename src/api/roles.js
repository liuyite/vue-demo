import axios from '@/utils/myaxios.js'
export const roles = (params) => {
  return axios({
    url: 'roles',
    params
  })
}
export const delroleRight = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}
