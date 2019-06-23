import request from '@/utils/request'

export function login(username, password) {
  // console.log('login.js', username, password)
  // console.log(request)
  return request({
    url: '/user/signin',
    method: 'post',
    data: {
      email: username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'get'
  })
}
