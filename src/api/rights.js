import axios from '@/utils/myaxios.js'
export const rightInfo = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

export const rightmenus = () => {
  return axios({
    url: `menus`
  })
}
