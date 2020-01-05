import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/speciality?method=list',
    method: 'post',
    data
  })
}

export function fetchOne(id) {
  return request({
    url: '/speciality?method=infoById',
    method: 'get',
    params: { id }
  })
}
