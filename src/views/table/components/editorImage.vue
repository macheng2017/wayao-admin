<template>
  <div class="upload-container">
    <el-button
      :style="{background:color,borderColor:color}"
      icon="el-icon-upload"
      size="normal"
      type="primary"
      @click=" dialogVisible=true"
    >上传图片</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :data="dataObj"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="https://upload.qiniup.com"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/api/qiniu'
import { postFileName } from '@/api/upload'
// import R from 'ramda'

export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(
        item => this.listObj[item].hasSuccess
      )
    },
    async handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message(
          '请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！'
        )
        return
      }
      const newArr = arr.map(v => {
        const str = v.url.split('.').shift()
        const chatArr = str.split('-')
        // 根据切分的数组长度判断一个款号中有一张或者多张图片
        let fileName = null
        let styleNumber = null
        let multiImg = false
        if (chatArr.length > 2) {
          fileName = str
          chatArr.pop()
          styleNumber = chatArr.join('-')
          console.log('fileName3', fileName)
          multiImg = true
        } else {
          fileName = str
          styleNumber = str
        }
        return { styleNumber, fileName, img: v.url, multiImg }
      })

      // console.log('objList', this.listObj)
      // console.log('arr', newArr)
      const res = await postFileName(newArr)
      // this.$emit('successCBK', arr)
      if (res.code === 0) {
        this.$notify({
          title: '成功',
          message: '图片更新成功',
          type: 'success',
          duration: 2000
        })
      }
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      // 收集返回值
      const uid = file.uid
      // console.log('uid', uid)
      const objKeyArr = Object.keys(this.listObj)
      // console.log('objKeyArr', objKeyArr)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.key
          this.listObj[objKeyArr[i]].hasSuccess = true
          // console.log('for', i)
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      const fileData = {
        fileName: file.name
      }
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = {
            hasSuccess: false,
            uid: file.uid,
            width: this.width,
            height: this.height
          }
        }
        getToken(fileData)
          .then(response => {
            const key = response.data.fileName
            const token = response.data.uploadToken
            _self._data.dataObj.token = token
            _self._data.dataObj.key = key
            this.tempUrl = response.data.qiniuUrl
            resolve(true)
          })
          .catch(err => {
            console.log(err)
            reject(false)
          })
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
