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
    <add-dept ref="addDept" @updateDepartment="getDepartment" :currentNodeId="currentNodeId"
              :show-dialog.sync="showDialog"/>
  </div>
</template>
<script>

import {delDepartment, getDepartment} from "@/api/department"
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
      } else if (type === 'edit') {
        // 编辑部门信息
        this.showDialog = true
        this.currentNodeId = id // 记录id，要用它获取数据
        // 在子组件获取数据   父组件调用子组件的方法获取数据
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail()
        })
      } else if (type === 'del') {
        // 删除部门
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await delDepartment(id)
          this.$message.success('删除部门成功')
          await this.getDepartment()
        })
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
