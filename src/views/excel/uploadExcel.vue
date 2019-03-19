<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload"/>

    <el-select v-model="categoryId" placeholder="Please select">
      <el-option v-for="item in categoryList" :key="item._id" :label="item.name" :value="item._id"/>
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
      categoryId: ''
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
    async pushExcelData() {
      if (this.tableData.length <= 0) {
        this.$message({
          message: '没有数据,请先添加excel',
          type: 'warning'
        })
        return
      }

      // const obj = Object.assign({}, this.tableData, this.categoryOptions)
      if (this.categoryId === '') {
        this.categoryList.map(v => {
          if (v.name === '默认') {
            this.categoryId = v._id
          }
        })
      }

      const bodyData = {
        categoryId: this.categoryId,
        excelData: this.tableData
      }
      const res = await postExcel(bodyData)
      console.log('res', res)
      if (res.code === 0) {
        console.log('object')
        this.$notify({
          title: '成功',
          message: '数据添加成功',
          type: 'success',
          duration: 2000
        })
        this.tableData = []
        this.tableHeader = []
      }

      // console.log('obj', bodyData)
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
