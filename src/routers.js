import mOrderIndex from './components/order/index.vue'
import mOrderList from './components/order/list.vue'
import mOrderDetail from './components/order/detail.vue'
import mOrderReview from './components/order/review.vue'

import adminOrderIndex from './components/admin/order/index.vue'
import adminOrderAllList from './components/admin/order/allList.vue'

const routers = [
  {
    // 微信端-个人中心-我的订单
    path: '/m/account/order',
    component: mOrderIndex,
    children: [
      {
        path: 'list/:listType',
        name: 'mOrderList',
        component: mOrderList
      },
      {
        path: 'detail/:orderId',
        name: 'mOrderDetail',
        component: mOrderDetail
      },
      {
        path: 'review/:orderId/:type',
        name: 'mOrderReview',
        component: mOrderReview
      }
    ]
  },
  {
    // 后台-订单
    path: '/admin/sa/order',
    component: adminOrderIndex,
    children: [
      {
        path: 'allList',
        component: adminOrderAllList
      }
    ]
  }
]

export default routers
