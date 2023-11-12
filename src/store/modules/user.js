import {getToken, removeToken, setToken} from "@/utils/auth"
import {getUserInfo, login} from "@/api/user"
import {constantRoutes, resetRouter} from "@/router"

const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {}, // 存储用户基本资料状态
  routes: constantRoutes
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存中
    setToken(token)
  },
  removeToken(state) {
    // 删除vuex的token
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  setRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  // action有两个参数：context-上下文，传入的参数
  async login(context, data) {
    // 调用登录接口
    const token = await login(data)
    // 返回一个token
    context.commit('setToken', token) // 调用mutation
  },
  // 获取用户信息
  async getUserInfo(context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result
  },
  // 退出登录的action
  logout(context) {
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 删除用户信息
    // 调用重置路由的方法
    resetRouter()
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
