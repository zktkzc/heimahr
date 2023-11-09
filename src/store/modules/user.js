import {getToken, removeToken, setToken} from "@/utils/auth";
import {getUserInfo, login} from "@/api/user";

const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {} // 存储用户基本资料状态
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
  },
  // 退出登录的action
  logout(context) {
    context.commit('removeToken') // 删除token
    context.commit('setUserInfo', {}) // 删除用户信息
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
