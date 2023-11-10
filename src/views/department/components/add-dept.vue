<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {

  },
  methods: {
    close() {
      // 修改父组件的值
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<template>
  <el-dialog title="添加子部门" :visible="showDialog" @close="close">
    <el-form label-width="120px">
      <el-form-item label="部门名称">
        <el-input style="width: 80%;" placeholder="2-10个字符" size="mini"/>
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width: 80%;" placeholder="2-10个字符" size="mini"/>
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width: 80%;" placeholder="请选择负责人" size="mini"/>
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input style="width: 80%;" type="textarea" :rows="4" placeholder="1-100个字符" size="mini"/>
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
