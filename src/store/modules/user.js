import {getToken, removeToken, setToken} from "@/utils/auth";

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
  Login(context, data) {
    // todo:调用登录接口
    // 返回一个token
    context.commit('setToken', '123456') // 调用mutation
  }
}

export default {
  namespace: true, // 开启命名空间
  state,
  mutations,
  actions
}
