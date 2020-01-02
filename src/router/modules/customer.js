/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const customerRouter = {
  path: '/customer',
  component: Layout,
  redirect: '/customer/customerList',
  name: 'Customer',
  meta: {
    title: '客户管理',
    icon: 'table',
    roles: ['admin', 'vip']
  },
  children: [
    {
      path: 'customerList',
      component: () => import('@/views/customer/customerList'),
      name: 'CustomerList',
      meta: { title: '客户管理' }
    },
    {
      path: 'upload-excel',
      component: () => import('@/views/customer/upload-excel'),
      name: 'UploadExcel',
      meta: { title: '上传表格' }
    }
  ]
}
export default customerRouter
