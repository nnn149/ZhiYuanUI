import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/student?method=stuInfo',
    method: 'get'
  })
}

