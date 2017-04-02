import orderIndex from './components/orderHeader/index.vue'
import list from './components/orderHeader/list.vue'
import detail from './components/orderHeader/detail.vue'
import review from './components/orderHeader/review.vue'

const routers = [
  {
    // 微信端-个人中心-我的订单
    path: '/m/account/orderHeader',
    component: orderIndex,
    children: [
      {
        path: ':listType',
        name: 'list',
        component: list
      },
      {
        path: 'detail/:orderId',
        name: 'detail',
        component: detail
      },
      {
        path: 'review/:orderId/:type',
        name: 'review',
        component: review
      }
    ]
  },
  {
    // 后台-订单
    path: '/admin/sa',
    children: []
  }
]

export default routers
