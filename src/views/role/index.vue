<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="role-operate">
        <el-button size="mini" type="primary" @click="showDialog = true">添加角色</el-button>
      </div>
      <!-- 放置表格组件 -->
      <el-table :data="roleList">
        <el-table-column align="center" label="角色" prop="name" width="200">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini"></el-input>
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="启用" prop="state" width="200">
          <!-- 自定义列结构 -->
          <template v-slot="{row}">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0"/>
            <span v-else>{{ row.state === 1 ? '已启用' : row.state === 0 ? '未启用' : '无' }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述" prop="description">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea"></el-input>
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{row}">
            <template v-if="row.isEdit">
              <el-button size="mini" type="primary" @click="btnEditOk(row)">确认</el-button>
              <el-button size="mini" @click="row.isEdit=false">取消</el-button>
            </template>
            <template v-else>
              <el-button size="mini" type="text" @click="btnPermission(row.id)">分配权限</el-button>
              <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
              <el-popconfirm title="删除" @onConfirm="confirmDel(row.id)">
                <el-button slot="reference" size="mini" style="margin-left: 10px;" type="text">删除
                </el-button>
              </el-popconfirm>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <!--放置分页组件-->
      <el-row align="middle" justify="end" style="height: 60px;" type="flex">
        <el-pagination :current-page="pageParams.page" :page-size="pageParams.pagesize" :total="pageParams.total"
                       layout="prev, pager, next" @current-change="changePage"/>
      </el-row>
    </div>
    <el-dialog :visible.sync="showDialog" title="添加角色" width="500px" @close="close">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" placeholder="请输入角色名称" size="mini" style="width: 300px;"/>
        </el-form-item>
        <el-form-item label="启用" prop="state">
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
              <el-button size="mini" type="primary" @click="btnOk">确定</el-button>
              <el-button size="mini" @click="close">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="showPermissionDialog" title="分配权限">
      <el-tree ref="permTree" :data="permissionData" :default-checked-keys="permIds" :props="{label: 'name'}"
               check-strictly default-expand-all node-key="id"
               show-checkbox/>
      <el-row slot="footer" justify="center" type="flex">
        <el-col :span="6">
          <el-button size="mini" type="primary" @click="btnPermissionOk">确定</el-button>
          <el-button size="mini" @click="showPermissionDialog=false">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import {addRole, assignPermission, deleteRole, getRoleDetail, getRoleList, updateRole} from "@/api/role"
import {getPermissionList} from "@/api/permission"
import {transListToTreeData} from "@/utils"

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
      },
      showPermissionDialog: false,
      permissionData: [],
      currentRoleId: null,
      permIds: []
    }
  },
  methods: {
    async getRoleList() {
      const {rows, total} = await getRoleList(this.pageParams)
      this.roleList = rows
      this.pageParams.total = total
      // 针对每一行数据添加一个编辑标记
      this.roleList.forEach(item => {
        // item.isEdit = false 添加的动态属性，不具备响应式的特点
        this.$set(item, 'isEdit', false) // 针对目标对象添加具备响应式的属性
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
    },
    changePage(newPage) {
      this.pageParams.page = newPage
      this.getRoleList()
    },
    btnOk() {
      this.$refs.roleForm.validate(async isOk => {
        if (isOk) {
          await addRole(this.roleForm)
          this.$message.success('添加角色成功')
          await this.getRoleList()
          this.close()
        }
      })
    },
    close() {
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    btnEditRow(row) {
      row.isEdit = true
      row.editRow.name = row.name
      row.editRow.state = row.state
      row.editRow.description = row.description
    },
    async btnEditOk(row) {
      if (row.editRow.name && row.editRow.description) {
        await updateRole({...row.editRow, id: row.id})
        this.$message.success('更新角色成功')
        Object.assign(row, {...row.editRow, isEdit: false})
      } else {
        this.$message.warning('角色名称和角色描述不能为空')
      }
    },
    async confirmDel(id) {
      await deleteRole(id) // 后端删除
      this.$message.success('删除角色成功')
      // 如果删除的是当前页的最后一个
      if (this.roleList.length === 1) {
        this.pageParams.page--
      }
      await this.getRoleList()
    },
    async btnPermission(id) {
      this.permissionData = transListToTreeData(await getPermissionList(), 0)
      this.currentRoleId = id
      const {permIds} = await getRoleDetail(id)
      this.permIds = permIds
      this.showPermissionDialog = true
    },
    async btnPermissionOk() {
      await assignPermission({
        id: this.currentRoleId,
        permIds: this.$refs.permTree.getCheckedKeys()
      })
      this.$message.success('分配权限成功')
      this.showPermissionDialog = false
    }
  }
}
</script>
<style scoped>
.role-operate {
  padding: 10px;
}
</style>
