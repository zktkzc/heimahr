<script>

import {getDepartment} from "@/api/department"
import {transListToTreeData} from "@/utils"

export default {
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
    }
  }
}
</script>

<template>
  <el-cascader :options="treeData" :props="props" separator="-" size="mini"/>
</template>

<style lang="scss" scoped>

</style>
