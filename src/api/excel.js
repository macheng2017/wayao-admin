import request from '@/utils/request'

export function postExcel(data) {
  return request({
    url: '/api/v1/products',
    method: 'post',
    data
  })
}
