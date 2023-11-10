<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
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
  <el-dialog title="新增部门" :visible="showDialog" @close="close">

  </el-dialog>
</template>

<style scoped lang="scss">

</style>
