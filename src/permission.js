import router, {asyncRoutes} from "@/router" // 引入动态路由
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from "@/store"

// 白名单
const whiteList = ['/login', '/404']

// 前置守卫
router.beforeEach(async (to, from, next) => {
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
            // 判断是否获取过用户信息
            if (!store.getters.userId) {
                const {roles} = await store.dispatch('user/getUserInfo')
                const filterRoutes = asyncRoutes.filter(item => {
                    return roles.menus.includes(item.name)
                }) // 筛选路由
                store.commit('user/setRoutes', filterRoutes)
                router.addRoutes([...filterRoutes, {path: '*', redirect: '/404', hidden: true}]) // 添加动态路由
                // router添加动态路由之后，需要转发一下
                next(to.path) // 目的是让路由拥有信息
                nprogress.done()
            } else {
                next()
            }
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
