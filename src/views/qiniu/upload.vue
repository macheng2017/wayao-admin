<template>
  <el-upload
    :data="dataObj"
    :multiple="true"
    :before-upload="beforeUpload"
    :file-list="fileList"
    action="https://upload.qiniup.com"
    drag
  >
    <i class="el-icon-upload"/>
    <div class="el-upload__text">
      将文件拖到此处，或
      <em>点击上传</em>
    </div>
  </el-upload>
</template>

<script>
import { getToken } from '@/api/qiniu'
// 获取七牛token 后端通过Access Key,Secret Key,bucket等生成token
// 七牛官方sdk https://developer.qiniu.com/sdk#official-sdk

export default {
  data() {
    return {
      dataObj: { token: '', key: '' },
      image_uri: [],
      fileList: []
    }
  },
  methods: {
    beforeUpload(file) {
      // console.log('file', file)
      const fileData = {
        fileName: file.name
      }
      const _self = this
      return new Promise((resolve, reject) => {
        getToken(fileData)
          .then(response => {
            console.log('response', response)
            const key = response.data.fileName
            const token = response.data.uploadToken
            _self._data.dataObj.token = token
            _self._data.dataObj.key = key
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
