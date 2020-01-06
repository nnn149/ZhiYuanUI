import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/voluntary?method=list',
    method: 'post',
    data
  })
}

export function updateOne(data) {
  return request({
    url: '/voluntary?method=update',
    method: 'post',
    data
  })
}

export function submit() {
  return request({
    url: '/voluntary?method=submit',
    method: 'get'
  })
}

export function info(userId) {
  return request({
    url: '/voluntary?method=info',
    method: 'get',
    params: { userId }
  })
}

export function fetchOne(id) {
  return request({
    url: '/voluntary/detail',
    method: 'get',
    params: { id }
  })
}

export function createOne(data) {
  return request({
    url: '/voluntary/add',
    method: 'post',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: '/voluntary/delete',
    method: 'get',
    params: { id }
  })
}

export function deleteList(data) {
  return request({
    url: '/voluntary/deleteList',
    method: 'post',
    data
  })
}

export function importExcel(data) {
  return request({
    url: '/voluntary/importExcel',
    method: 'post',
    data
  })
}

export function getPowerNum() {
  return request({
    url: '/voluntary/getPowerNum',
    method: 'get'
  })
}
export function getSaleData() {
  return request({
    url: '/voluntary/getSaleData',
    method: 'get'
  })
}
export function getLineChartData() {
  return request({
    url: '/voluntary/getLineChartData',
    method: 'get'
  })
}
