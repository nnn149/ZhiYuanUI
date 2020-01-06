import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/speciality?method=list',
    method: 'post',
    data
  })
}

export function fetchOne(id, userId) {
  return request({
    url: '/speciality?method=infoById',
    method: 'get',
    params: { id, userId }
  })
}
