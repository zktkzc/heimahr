<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input v-model="queryParams.keyword" placeholder="输入员工姓名全员搜索" prefix-icon="el-icon-search"
                  size="small" style="margin-bottom:10px" type="text" @input="inputChange"/>
        <!-- 树形组件 -->
        <el-tree ref="deptTree" :data="depts" :expand-on-click-node="false" :props="defaultProps" default-expand-all
                 highlight-current node-key="id" @node-click="selectNode"/>
      </div>
      <div class="right">
        <el-row class="opeate-tools" justify="end" type="flex">
          <el-button size="mini" type="primary" @click="$router.push('/employee/detail')">添加员工</el-button>
          <el-button size="mini" @click="showExcelDialog=true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="list">
          <el-table-column align="center" label="头像" prop="staffPhoto">
            <template v-slot="{row}">
              <el-avatar v-if="row.staffPhoto" :size="30" :src="row.staffPhoto"/>
              <span v-else class="username">{{ row.username.charAt(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="username"></el-table-column>
          <el-table-column label="手机号" prop="mobile" sortable></el-table-column>
          <el-table-column label="工号" prop="workNumber" sortable></el-table-column>
          <el-table-column label="聘用形式" prop="formOfEmployment">
            <template v-slot="{row}">
              <span v-if="row.formOfEmployment === 1">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column label="部门" prop="departmentName"></el-table-column>
          <el-table-column label="入职时间" prop="timeOfEntry" sortable></el-table-column>
          <el-table-column label="操作">
            <template v-slot="{row}">
              <el-button size="mini" type="text" @click="$router.push(`/employee/detail/${row.id}`)">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-popconfirm title="确定删除该行数据吗？" @onConfirm="deleteEmployee(row.id)">
                <el-button slot="reference" size="mini" style="margin-left: 10px;" type="text">删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row align="middle" justify="end" style="height: 60px;" type="flex">
          <el-pagination :current-page="queryParams.page" :page-size="queryParams.pagesize" :total="total"
                         layout="total, prev, pager, next" @current-change="changePage"/>
        </el-row>
      </div>
    </div>
    <!-- 放置excel导入组件 -->
    <ImportExcel :show-excel-dialog.sync="showExcelDialog" @uploadSuccess="getEmployeeList"/>
  </div>
</template>

<script>
import {getDepartment} from "@/api/department"
import {transListToTreeData} from "@/utils"
import {deleteEmployee, exportEmployee, getEmployeeList} from "@/api/employee"
import FileSaver from 'file-saver'
import ImportExcel from "@/views/employee/components/import-excel.vue"

export default {
  name: 'Employee',
  components: {
    ImportExcel
  },
  data() {
    return {
      depts: [], // 组织数据
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      queryParams: {
        departmentId: null,
        page: 1,
        pagesize: 10,
        keyword: '' // 查询关键字
      },
      list: [], // 存储员工列表数据
      total: 0, // 记录员工的总数
      showExcelDialog: false //控制Excel导入弹层的显示
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      this.depts = transListToTreeData(await getDepartment(), 0)
      this.queryParams.departmentId = this.depts[0].id
      this.$nextTick(() => {
        // 树渲染完毕
        // 设置选中节点的状态
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
      // 获取员工列表参数
      await this.getEmployeeList()
    },
    selectNode(node) {
      this.queryParams.departmentId = node.id
      this.queryParams.page = 1
      this.getEmployeeList()
    },
    async getEmployeeList() {
      const {rows, total} = await getEmployeeList(this.queryParams)
      this.list = rows
      this.total = total
    },
    changePage(newPage) {
      this.queryParams.page = newPage
      this.getEmployeeList() // 查询数据
    },
    // 输入框内容改变时触发
    inputChange() {
      // 在单位时间之内只执行一次——防抖
      clearTimeout(this.timer) // 清理上一次的定时器
      this.timer = setTimeout(() => {
        this.queryParams.page = 1
        this.getEmployeeList()
      }, 300)
    },
    // 导出员工excel表
    async exportEmployee() {
      FileSaver.saveAs(await exportEmployee(), '员工信息表.xlsx')
    },
    async deleteEmployee(id) {
      await deleteEmployee(id)
      if (this.list.length === 1 && this.queryParams.page > 1) this.queryParams.page--
      this.getEmployeeList()
      this.$message.success('删除员工成功')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;

  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }

  .right {
    flex: 1;
    padding: 20px;

    .opeate-tools {
      margin: 10px;
    }

    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display: inline-block;
    }
  }
}
</style>
