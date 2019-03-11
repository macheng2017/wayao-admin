<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>

    <el-select v-model="key" class="filter-item" placeholder="Please select">
      <el-option
        v-for="item in categoryList"
        :key="item._id"
        :label="item.name"
        :value="item.name"
      />
    </el-select>
    <el-button type="primary" @click="pushExcelData">提交数据</el-button>

    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :prop="item" :label="item" :key="item"/>
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { postExcel } from '@/api/excel'
import { fetchCategoryList } from '@/api/product'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: [],
      categoryList: [],
      key: '',
      categoryOptions: { name: '', value: '', _id: '' }
    }
  },
  mounted() {
    this.fatchGategoryList()
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 5

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    pushExcelData() {
      console.log('tableData', this.tableData)
      console.log('tableHeader', this.tableHeader)
      postExcel(this.tableData)
    },
    async fatchGategoryList() {
      const categoryData = await fetchCategoryList()
      this.categoryList = categoryData.data.categories
      console.log('gategoryList', this.categoryList)
    },

    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    }
  }
}
</script>
