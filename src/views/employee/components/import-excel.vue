<template>
  <el-dialog
    :visible="showExcelDialog"
    title="员工导入"
    width="500px"
    @close="$emit('update:showExcelDialog', false)"
  >
    <el-row justify="center" type="flex">
      <div class="upload-excel">
        <input
          ref="excel-upload-input"
          accept=".xlsx, .xls"
          class="excel-upload-input"
          type="file"
        >
        <div class="drop">
          <i class="el-icon-upload"/>
          <el-button type="text">下载导入模板</el-button>
          <span>将文件拖到此处或
            <el-button type="text">点击上传</el-button>
          </span>
        </div>
      </div>
    </el-row>
    <el-row justify="end" type="flex">
      <!-- update:props属性名，值 直接修改 .sync修饰符的属性值 -->
      <el-button size="mini" type="primary" @click="$emit('update:showExcelDialog', false)">取消</el-button>
    </el-row>
  </el-dialog>
</template>
<script>

export default {
  props: {
    showExcelDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.upload-excel {
  display: flex;
  justify-content: center;
  margin: 20px;
  width: 360px;
  height: 180px;
  align-items: center;
  color: #697086;

  .excel-upload-input {
    display: none;
    z-index: -9999;
  }

  .btn-upload,
  .drop {
    border: 1px dashed #dcdfe6;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 160px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .drop {
    line-height: 40px;
    color: #bbb;

    i {
      font-size: 60px;
      display: block;
      color: #c0c4cc;
    }
  }
}
</style>
