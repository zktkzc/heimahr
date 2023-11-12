<script>

import {getDepartment} from "@/api/department"
import {transListToTreeData} from "@/utils"

export default {
  props: {
    value: {
      type: Number, // 存储部门id
      default: 0
    }
  },
  data() {
    return {
      treeData: [],
      props: {
        label: 'name',
        value: 'id'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      this.treeData = transListToTreeData(await getDepartment(), 0)
    },
    changeValue(list) {
      // 取到数组的最后一位
      if (list.length > 0) {
        this.$emit('input', list[list.length - 1]) // 将最后一位的id取出来，传出去
      } else {
        this.$emit('input', null) // 如果长度为0，说明值为空
      }
    }
  }
}
</script>

<template>
  <el-cascader :options="treeData" :props="props" :value="value" separator="-" size="mini" @change="changeValue"/>
</template>

<style lang="scss" scoped>

</style>
