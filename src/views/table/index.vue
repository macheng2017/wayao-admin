<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="图片" width="90">
        <template slot-scope="scope">
          <img
            :src="'http://lining.xugaoyang.com/upload/img/' + scope.row.img"
            width="70px"
            height="70px"
          >
        </template>
      </el-table-column>
      <el-table-column label="颜色" width="250">
        <template slot-scope="scope">{{ scope.row.color }}</template>
      </el-table-column>
      <el-table-column label="性别" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="尺码" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.size }}</template>
      </el-table-column>
      <el-table-column label="款号" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.styleNumber }}</template>
      </el-table-column>
      <el-table-column label="发布季" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.season }}</template>
      </el-table-column>
      <el-table-column label="吊牌价" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.cardPrice }}</template>
      </el-table-column>
      <el-table-column label="淘宝价" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.taobaoPrice }}</template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.meta.updatedAt }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import { mapState } from 'vuex'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },

  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  computed: {
    ...mapState(['imageCDN'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.products
        this.listLoading = false
      })
    }
  }
}
</script>
