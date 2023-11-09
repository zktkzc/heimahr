import router from "@/router"
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from "@/store";

// 白名单
const whiteList = ['/login', '/404']

// 前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  nprogress.start()
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 跳转到主页
      next('/') // 中转到主页
      // next(地址)并没有执行后置守卫，需要手动关闭进度条
      nprogress.done()
    } else {
      next()
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nprogress.done()
    }
  }
})

// 后置守卫
router.afterEach(() => {
  // 关闭进度条
  nprogress.done()
})
