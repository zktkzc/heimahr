<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">添加角色</el-button>
      </div>
      <!-- 放置表格组件 -->
      <el-table :data="roleList">
        <el-table-column align="center" label="角色" prop="name" width="200"/>
        <el-table-column align="center" label="启用" prop="state" width="200">
          <!-- 自定义列结构 -->
          <template v-slot="{row}">
            <span>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述" prop="description"/>
        <el-table-column align="center" label="操作">
          <template>
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--放置分页组件-->
      <el-row align="middle" justify="end" style="height: 60px;" type="flex">
        <el-pagination :current-page="pageParams.page" :page-size="pageParams.pagesize" :total="pageParams.total"
                       layout="prev, pager, next" @current-change="changePage"/>
      </el-row>
    </div>
    <el-dialog :visible.sync="showDialog" title="添加角色" width="500px">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" placeholder="请输入角色名称" size="mini" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="roleForm.state" :active-value="1" :inactive-color="0" size="mini"/>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" :rows="3" placeholder="请输入角色描述" size="mini"
                    style="width: 300px;"
                    type="textarea"/>
        </el-form-item>
        <el-form-item>
          <el-row justify="center" type="flex">
            <el-col :span="12">
              <el-button size="mini" type="primary">确定</el-button>
              <el-button size="mini">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      roleList: [],
      showDialog: false, // 控制弹层显示和隐藏
      // 将分页信息放置到一个对象中，方便管理
      pageParams: {
        page: 1, // 第几页
        pagesize: 5, // 每页多少条
        total: 0 // 总数
      },
      roleForm: {
        name: '',
        description: '',
        state: 0
      },
      rules: {
        name: [
          {
            required: true,
            message: '角色名称不能为空',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '角色描述不能为空',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async getRoleList() {
      const {rows, total} = await getRoleList(this.pageParams)
      this.roleList = rows
      this.pageParams.total = total
    },
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    }
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
