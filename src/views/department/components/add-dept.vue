<script>

import {addDepartment, getDepartment, getDepartmentDetail, getManagerList, updateDepartment} from "@/api/department"

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentNodeId: {
      type: Number,
      default: null
    }
  },
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    }
  },
  data() {
    return {
      managerList: [], // 存储负责人的列表
      formData: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人id
        name: '', // 部门名称
        pid: '' // 父级部门的id
      },
      rules: {
        code: [
          {
            required: true,
            message: '部门编码不能为空',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '部门编码长度为2-10个字符',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: async (rule, value, callback) => {
              // value就是输入的编码
              let result = await getDepartment()
              // 判断是否是编辑模式
              if (this.formData.id) {
                // 编辑场景
                result = result.filter(item => item.id !== this.formData.id)
              }
              // result数组中是否存在value值
              if (result.some(item => item.code === value)) {
                callback(new Error('部门编码已存在'))
              } else {
                callback()
              }
            }
          }
        ],
        introduce: [
          {
            required: true,
            message: '部门介绍不能为空',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 100,
            message: '部门介绍长度为2-10个字符',
            trigger: 'blur'
          }
        ],
        managerId: [
          {
            required: true,
            message: '部门负责人不能为空',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            message: '部门名称不能为空',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '部门名称长度为2-10个字符',
            trigger: 'blur'
          },
          {
            trigger: 'blur',
            validator: async (rule, value, callback) => {
              // value就是输入的值
              let result = await getDepartment()
              if (this.formData.id) {
                // 编辑场景
                result = result.filter(item => item.id !== this.formData.id)
              }
              // result数组中是否存在value值
              if (result.some(item => item.name === value)) {
                callback(new Error('部门名称已存在'))
              } else {
                callback()
              }
            }
          }
        ]
      }
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      this.formData = {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人id
        name: '', // 部门名称
        pid: '' // 父级部门的id
      }
      this.$refs.addDept.resetFields() // 重置表单，resetFields() 只能重置模版中绑定的数据
      // 修改父组件的值
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      this.managerList = await getManagerList()
    },
    btnOk() {
      this.$refs.addDept.validate(async isOk => {
        if (isOk) {
          let msg = '新增'
          if (this.formData.id) {
            // 编辑场景
            msg = '更新'
            await updateDepartment(this.formData)
          } else {
            // 新增场景
            await addDepartment({
              ...this.formData,
              pid: this.currentNodeId
            })
          }
          // 通知父组件更新
          this.$emit('updateDepartment')
          // 提示消息
          this.$message.success(`${msg}部门成功`)
          this.close()
        }
      })
    },
    async getDepartmentDetail() {
      this.formData = await getDepartmentDetail(this.currentNodeId)
    }
  }
}
</script>

<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="close">
    <el-form label-width="120px" :model="formData" :rules="rules" ref="addDept">
      <el-form-item prop="name" label="部门名称">
        <el-input v-model="formData.name" style="width: 80%;" placeholder="2-10个字符" size="mini"/>
      </el-form-item>
      <el-form-item prop="code" label="部门编码">
        <el-input v-model="formData.code" style="width: 80%;" placeholder="2-10个字符" size="mini"/>
      </el-form-item>
      <el-form-item prop="managerId" label="部门负责人">
        <el-select v-model="formData.managerId" style="width: 80%;" placeholder="请选择负责人" size="mini">
          <!-- 下拉选项 label-显示的字段 value-存储的字段 -->
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id"/>
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍">
        <el-input v-model="formData.introduce" style="width: 80%;" type="textarea" :rows="4"
                  placeholder="1-100个字符"
                  size="mini"/>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini" @click="btnOk">确定</el-button>
            <el-button size="mini" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
