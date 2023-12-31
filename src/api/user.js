import request from "@/utils/request";

export function login(data) {
  return request({
    url: '/sys/login', // 请求地址
    method: 'post', // 请求类型
    data // 请求参数
  })
}

export function getUserInfo() {
  return request({
    url: '/sys/profile'
  })
}

// 更新密码
export function updatePassword(data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}
