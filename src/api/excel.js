import request from '@/utils/request'

export function postExcel(data) {
  return request({
    url: '/admin/product/list',
    method: 'post',
    data
  })
}
