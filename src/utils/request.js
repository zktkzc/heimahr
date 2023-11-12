import axios from "axios";
import store from "@/store";
import {Message} from "element-ui";
import router from "@/router";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址
  timeout: 10000 // 超时时间，单位是毫秒
}) // 创建一个新的axios实例

// 请求拦截器
service.interceptors.request.use((config) => {
  // 注入token
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 失败执行promise
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  // axios默认包裹了一层data
  // 判断是不是blob
  if (response.data instanceof Blob) return response.data // 返回Blob对象
  const {data, message, success} = response.data // 默认是json格式
  if (success) {
    return data
  } else {
    Message({type: 'error', message})
    return Promise.reject(new Error(message))
  }
}, async (error) => {
  if (error.response.status === 401) {
    Message({type: 'error', message: 'token失效，请重新登录'})
    // 说明token超时了
    await store.dispatch('user/logout') // 调用action，退出登录
    // 跳转到登录页
    router.push('/login')
  }
  Message({type: 'error', message: error.message})
  return Promise.reject(error)
})

export default service
