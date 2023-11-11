<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <el-input placeholder="输入员工姓名全员搜索" prefix-icon="el-icon-search" size="small"
                  style="margin-bottom:10px"
                  type="text"/>
        <!-- 树形组件 -->
        <el-tree ref="deptTree" :data="depts" :expand-on-click-node="false" :props="defaultProps" default-expand-all
                 highlight-current node-key="id" @node-click="selectNode"/>
      </div>
      <div class="right">
        <el-row class="opeate-tools" justify="end" type="flex">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
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
            <template>
              <el-button size="mini" type="text">查看</el-button>
              <el-button size="mini" type="text">角色</el-button>
              <el-button size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row align="middle" justify="end" style="height: 60px;" type="flex">
          <el-pagination :total="1000" layout="total, prev, pager, next"/>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {getDepartment} from "@/api/department"
import {transListToTreeData} from "@/utils"
import {getEmployeeList} from "@/api/employee"

export default {
  name: 'Employee',
  data() {
    return {
      depts: [], // 组织数据
      defaultProps: {
        label: 'name',
        children: 'children'
      },
      queryParams: {
        departmentId: null
      },
      list: [] // 存储员工列表数据
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
      this.getEmployeeList()
    },
    async getEmployeeList() {
      const {rows} = await getEmployeeList(this.queryParams.departmentId)
      this.list = rows
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
