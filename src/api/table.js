import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/admin/product/list',
    method: 'get',
    params
  })
}
