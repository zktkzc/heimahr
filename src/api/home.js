import request from "@/utils/request"

/**
 * 获取首页的展示数据
 */
export function getHomeData() {
  return request({
    url: '/home/data'
  })
}

/**
 * 获取消息列表
 */
export function getMessageList() {
  return request({
    url: '/home/notice'
  })
}
