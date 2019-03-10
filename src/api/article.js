import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/product/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/admin/product',
    method: 'patch',
    data
  })
}
export function fetchCategoryList() {
  return request({
    url: '/admin/category/list',
    method: 'get'
    // params
  })
}
export function deleteProduct(data) {
  return request({
    url: '/admin/product',
    method: 'delete',
    data
  })
}
