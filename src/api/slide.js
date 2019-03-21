import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/admin/slideShow/list',
    method: 'get'
    // params: query
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

export function createSlide(data) {
  return request({
    url: '/admin/slideShow',
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
export function deleteSlide(data) {
  return request({
    url: '/admin/slideShow',
    method: 'delete',
    data
  })
}
