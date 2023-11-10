import request from "@/utils/request";

// 获取组织架构数据
export function getDepartment() {
  return request({
    url: '/company/department'
  })
}

// 获取部门负责人
export function getManagerList() {
  return request({
    url: '/sys/user/simple'
  })
}
