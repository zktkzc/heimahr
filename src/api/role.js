import request from "@/utils/request"

/**
 * 获取角色列表
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params // 查询参数，最终会拼到url地址上
  })
}

/**
 * 新增橘色
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
 * 修改角色
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除角色
 */
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
