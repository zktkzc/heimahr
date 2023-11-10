<script>

import {getDepartment, getManagerList} from "@/api/department"

export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
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
              const result = await getDepartment()
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
              const result = await getDepartment()
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
      // 修改父组件的值
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      this.managerList = await getManagerList()
    }
  }
}
</script>

<template>
  <el-dialog title="添加子部门" :visible="showDialog" @close="close">
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
        <el-input v-model="formData.introduce" style="width: 80%;" type="textarea" :rows="4" placeholder="1-100个字符"
                  size="mini"/>
      </el-form-item>
      <el-form-item>
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini">确定</el-button>
            <el-button size="mini">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss">

</style>
