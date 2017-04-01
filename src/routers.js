import list from './components/list.vue'
import detail from './components/detail.vue'
import review from './components/review.vue'

const routers = [
  {
    path: '/:listType',
    name: 'list',
    component: list
  },
  {
    path: '/detail/:orderId',
    name: 'detail',
    component: detail
  },
  {
    path: '/review/:orderId/:type',
    name: 'review',
    component: review
  }
]

export default routers
