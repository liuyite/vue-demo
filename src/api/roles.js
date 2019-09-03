import axios from '@/utils/myaxios.js'
export const roles = () => {
  return axios({
    url: 'roles'
  })
}
export const delroleRight = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

export const updateRoleRight = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: { rids }
  })
}
// 添加角色
export const addRole = (data) => {
  return axios({
    url: `roles`,
    method: 'post',
    data
  })
}

// 删除角色
export const delRole = (id) => {
  return axios({
    url: `roles/${id}`,
    method: 'delete'
  })
}

// 编辑角色
export const editRole = (data) => {
  return axios({
    url: `roles/${data.id}`,
    method: 'put',
    data
  })
}
