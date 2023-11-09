import axios from "axios";
import store from "@/store";

const service = axios.create({
  baseURL: '/api', // 基础地址,
  timeout: 10000 // 超时时间，单位是毫秒
}) // 创建一个新的axios实例

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

export default service
