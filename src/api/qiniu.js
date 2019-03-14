import request from '@/utils/request'

export function getToken(fileName) {
  return request({
    url: '/api/v1/upload', // 假地址 自行替换
    method: 'get',
    params: fileName
  })
}
