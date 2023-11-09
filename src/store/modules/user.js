import {getToken, removeToken, setToken} from "@/utils/auth";
import {login} from "@/api/user";

const state = {
  token: getToken() // 从缓存中读取初始值
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存中
    setToken(token)
  },
  removeToken() {
    // 删除vuex的token
    state.token = null
    removeToken()
  }
}

const actions = {
  // action有两个参数：context-上下文，传入的参数
  async login(context, data) {
    // 调用登录接口
    const token = await login(data)
    // 返回一个token
    context.commit('setToken', token) // 调用mutation
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
