const getters = {
  sidebar: state => state.app.sidebar, // 取app模块属性
  device: state => state.app.device,
  token: state => state.user.token, // 去user模块属性
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
// getters只是做了便捷访问
export default getters
