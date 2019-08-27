import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    let tokenInfo = localStorage.getItem('login_info')
    // 在发送请求之前做些什么
    config.headers.Authorization = tokenInfo
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
export default axios
