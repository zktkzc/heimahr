<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <!-- 放置表格组件 -->
      <el-table :data="roleList">
        <el-table-column prop="name" width="200" label="角色" align="center"/>
        <el-table-column prop="state" width="200" label="启用" align="center">
          <!-- 自定义列结构 -->
          <template v-slot="{row}">
            <span>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="描述" align="center"/>
        <el-table-column label="操作" align="center">
          <template>
            <el-button type="text" size="mini">分配权限</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--放置分页组件-->
      <el-row type="flex" justify="end" align="middle" style="height: 60px;">
        <el-pagination layout="prev, pager, next"/>
      </el-row>
    </div>
  </div>
</template>
<script>
import {getRoleList} from "@/api/role"

export default {
  name: 'Role',
  created() {
    this.getRoleList()
  },
  data() {
    return {
      roleList: []
    }
  },
  methods: {
    async getRoleList() {
      const {rows} = await getRoleList()
      this.roleList = rows
    }
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
