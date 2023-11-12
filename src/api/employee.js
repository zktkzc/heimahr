import request from "@/utils/request"

/**
 * 获取员工列表
 */
export function getEmployeeList(params) {
  return request({
    url: '/sys/user',
    params // 地址参数 查询参数
  })
}

/**
 * 导出员工的Excel
 */
export function exportEmployee() {
  return request({
    url: '/sys/user/export',
    // 改变接收数据的类型
    responseType: 'blob' // 使用blob来接收二进制文件流
  })
}

/**
 * 下载员工的导入模版
 */
export function getImportTemplate() {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob'
  })
}

/**
 * 上传用户的Excel
 */
export function uploadExcel(data) {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data
  })
}

/**
 * 删除员工
 */
export function deleteEmployee(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}

/**
 * 新增员工
 */
export function addEmployee(data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}

/**
 * 获取员工详情
 */
export function getEmployeeDetail(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

/**
 * 更新员工信息
 */
export function updateEmployee(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 获取可用的角色
 */
export function getEnableRoleList() {
  return request({
    url: '/sys/role/list/enabled'
  })
}
