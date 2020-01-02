import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/customer/list',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/customer/detail',
    method: 'get',
    params: { id }
  })
}

export function createOne(data) {
  return request({
    url: '/customer/add',
    method: 'post',
    data
  })
}

export function updateOne(data) {
  return request({
    url: '/customer/update',
    method: 'post',
    data
  })
}

export function deleteOne(id) {
  return request({
    url: '/customer/delete',
    method: 'get',
    params: { id }
  })
}

export function deleteList(data) {
  return request({
    url: '/customer/deleteList',
    method: 'post',
    data
  })
}

export function importExcel(data) {
  return request({
    url: '/customer/importExcel',
    method: 'post',
    data
  })
}

export function getPowerNum() {
  return request({
    url: '/customer/getPowerNum',
    method: 'get'
  })
}
export function getSaleData() {
  return request({
    url: '/customer/getSaleData',
    method: 'get'
  })
}
export function getLineChartData() {
  return request({
    url: '/customer/getLineChartData',
    method: 'get'
  })
}
