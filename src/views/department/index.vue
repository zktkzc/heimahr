<template>
  <div class="container">
    <div class="app-container">
      <!--展示树形结构-->
      <el-tree :data="depts" :props="defaultProps" default-expand-all :expand-on-click-node="false">
        <template v-slot="{data}">
          <el-row type="flex" justify="space-between" align="middle" style="width: 100%;height: 40px;">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown @command="operateDept($event, data.id)">
                <!--显示区域内容-->
                <span class="el-dropdown-link">
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <!--下拉菜单选项-->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <add-dept @updateDepartment="getDepartment" :currentNodeId="currentNodeId" :show-dialog.sync="showDialog"/>
  </div>
</template>
<script>

import {getDepartment} from "@/api/department"
import {transListToTreeData} from "@/utils"
import AddDept from "@/views/department/components/add-dept.vue"

export default {
  name: 'Department',
  components: {
    AddDept
  },
  data() {
    return {
      currentNodeId: null, // 存储当前点击的id
      showDialog: false, // 控制弹层的显示和隐藏
      depts: [], // 数据属性
      defaultProps: {
        label: 'name', // 显示的字段的名称
        children: 'children' // 读取子节点的字段名称
      }
    }
  },
  created() {
    this.getDepartment() // 调用获取数据的接口
  },
  methods: {
    async getDepartment() {
      this.depts = transListToTreeData(await getDepartment(), 0)
    },
    operateDept(type, id) {
      if (type === 'add') {
        // 添加子部门
        this.showDialog = true // 显示弹层组件
        this.currentNodeId = id
      }
    }
  }
}
</script>
<style scoped>
.app-container {
  padding: 30px 140px;
  font-size: 14px;

  .tree-manager {
    display: inline-block;
    width: 50px;
    margin-right: 30px;
  }
}

</style>
