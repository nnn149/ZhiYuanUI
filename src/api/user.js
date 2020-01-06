import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/auth?method=login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user?method=info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/auth?method=logout',
    method: 'post'
  })
}

export function getSchools() {
  return request({
    url: '/user?method=schools',
    method: 'get'
  })
}
