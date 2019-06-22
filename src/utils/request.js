import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import {getToken,removeToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  res => {
    /**
     * code为非200是抛错 可结合自己业务进行修改
     */
    // const res = response.data


    //return res.data
    if (res.status !== 200 || res.data.code==-1000) {
      // Message({
      //   message: res.message,
      //   type: 'error',
      //   duration: 3 * 1000
      // })

      // 401:未登录;
      if (res.status === 401 || res.status === 403 || res.data.code == -1000) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.location.href = "#/login"
        })
      }
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    if (error.response.status == 401) {
      setTimeout(() => {
        window.location.href = "#/login";
        removeToken()
      }, 1000);

    }
    Message({
      message: '登录失效，请重新登录!!!',
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
