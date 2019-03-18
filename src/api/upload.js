import request from '@/utils/request'

export function postFileName(data) {
  return request({
    url: '/api/v1/upload', // 假地址 自行替换
    method: 'post',
    data
  })
}
