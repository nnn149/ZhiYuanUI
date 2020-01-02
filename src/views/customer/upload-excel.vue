<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload el-icon--right" @click="downloadExcelTemplate">
        下载模板
      </el-button>
      <el-tag class="filter-item">选择客户信息:</el-tag>
      <dictionary-select v-model="uploadDate.origin" style="width: 110px;" class="filter-item" type-id="124" zero-label="来源" />
      <dictionary-select v-model="uploadDate.power" style="width: 110px;" class="filter-item" type-id="125" zero-label="消费能力" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-upload el-icon--right" @click="upload">
        上传
      </el-button>
    </div>
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <el-table :data="uploadDate.tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import DictionarySelect from '@/components/my/DictionarySelect'
import waves from '@/directive/waves' // waves directive
import { importExcel } from '@/api/customer'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent, DictionarySelect },
  directives: { waves },
  data() {
    return {
      uploadDate: {
        tableData: [],
        origin: '0',
        power: '0'
      },
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '请不要上传大于1m的文件。',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.uploadDate.tableData = results
      this.tableHeader = header
    },
    upload() {
      importExcel(this.uploadDate).then(response => {
        this.$notify({
          title: '成功',
          message: '导入成功！',
          type: 'success',
          duration: 2000
        })
      })
    },
    downloadExcelTemplate() {
      window.open('http://localhost:8080/download/customerExcelTemplate')
    }

  }
}
</script>
