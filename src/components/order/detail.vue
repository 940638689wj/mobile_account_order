<template>
<div id="page">
  <header class="mui-bar mui-bar-nav">
      <router-link :to="{name: 'mOrderList', params: {listType: orderHeaderDTO.type}}" class="mui-icon mui-icon-left-nav"></router-link>
      <h1 class="mui-title">订单详情</h1>
      <a class="mui-icon"></a>
  </header>
  <div class="mui-content">
      <div class="tbviewlist categorylist">
          <ul>
              <li>
                  <a href="javascript:void(0)">
                      <div class="r orange" 
                      v-if="orderHeaderDTO.orderStatusCd == 5 && orderHeaderDTO.reviewStatusCd == 1">待评价
                      </div>
                      <div class="r orange" v-else>{{orderHeaderDTO.orderStatusName}}</div>
                      <div class="c">订单号：{{orderHeaderDTO.orderNumber}}</div>
                  </a>
              </li>
          </ul>
      </div>
      <div class="order-address orderdetail-address">
          <span class="name">{{orderReceiveInfo.receiveName}}</span>
          <span class="phone">{{orderReceiveInfo.receiveTel}}</span>
          <address>{{orderReceiveInfo.orderDistrbuteTypeCd == 1 ? orderReceiveInfo.receiveAddrCombo : orderReceiveInfo.detailAddress}}</address>
      </div>
      <div class="message"><p>买家留言：</p>
          <span>{{orderHeaderDTO.orderRemark ? orderHeaderDTO.orderRemark : "无"}}</span></div>
      <div class="borderbox mb0">
          <h3 class="title">商品清单</h3>
          <ul class="prd-list b-bottom">
              <li v-for="orderItem in orderHeaderDTO.orderItemList">
                  <div class="pic">
                      <img :src="orderItem.productPicUrl">
                  </div>
                  <div class="r">
                      <p class="name">{{orderItem.productName}}</p>
                      <p class="info">
                          <span class="num"><i class="small">X</i>{{orderItem.quantity}}</span>
                      <!--<span class="specifications">规格：1L</span>-->
                      </p>
                      <div class="price">
                          <div class="price-real">¥{{orderItem.salePrice}}</div>
                      </div>
                  </div>
                  <div class="aftersales">
                    <router-link :to="{name: 'mOrderReturnSubmit', params: {orderId: orderHeaderDTO.orderId}}" class="orderdetailbtn" v-if="orderHeaderDTO.type == 2 || orderHeaderDTO.type == 3">退款/退货</router-link>
                  </div>
              </li>
          </ul>
      </div>
      <div class="payment-info">
          <p><span class="fl gray">运费</span><span class="fr">¥{{orderHeaderDTO.orderExpressAmt}}</span></p>
          <p><span class="fl gray">原价</span><span class="fr">¥{{orderHeaderDTO.orderTotalAmt}}</span></p>
          <p><span class="fl gray">优惠金额</span><span class="fr">-¥{{orderHeaderDTO.orderDiscountAmt}}</span></p>
          <p><span class="fl gray">积分</span><span class="fr">-{{orderHeaderDTO.payScore ? orderHeaderDTO.payScore : 0}}</span>
          </p>
          <p><span class="fl gray">实付款</span><span class="fr orange">¥{{orderHeaderDTO.orderTotalAmt - orderHeaderDTO.orderDiscountAmt}}</span>
          </p>
          <p><span class="fr orange">(含余额支付¥{{orderHeaderDTO.payBalance ? orderHeaderDTO.payBalance : 0}})</span>
          </p>
      </div>
      <div class="payment-info">
          <p><span class="fl gray">快递公司</span><span class="fr">{{orderHeaderDTO.expressName}}</span></p>
          <p><span class="fl gray">下单时间</span><span class="fr">{{orderHeaderDTO.createTime | time}}</span></p>
          <p><span class="fl gray">付款时间</span><span class="fr">{{orderHeaderDTO.orderPayTime | time}}</span></p>
      </div>

      <div class="fbbwrap fbbwrap-total">
          <div class="ftbtnbar">
              <div class="content-wrap"></div>
              <div class="button-wrap bkno">
                  <div v-if="orderHeaderDTO.type == 1">
                      <a class="orderdetailbtn view" href="javascript:void(0)" @click='cancelOrder'>取消订单</a>
                      <a class="orderdetailbtn" href="javascript:void(0)" @click="selectOrderId = orderHeaderDTO.orderId">付款</a>
                  </div>
                  <div v-if="orderHeaderDTO.type == 2">
                      <a class="orderdetailbtn view" href="javascript:void(0)">退款/退货</a>
                  </div>
                  <div v-if="orderHeaderDTO.type == 3">
                      <a class="orderdetailbtn view" href="javascript:void(0)">退款/退货</a>
                      <a class="orderdetailbtn" href="javascript:void(0)" @click="confirmReceive">确认收货</a>
                  </div>
                  <div v-if="orderHeaderDTO.type == 4">
                    <router-link :to="{name: 'mOrderReview', params: {orderId: orderHeaderDTO.orderId}}" class='orderdetailbtn'>
                      评价
                    </router-link>
                  </div>
                  <div v-if="orderHeaderDTO.type == 5">
                      <!-- <a class="orderdetailbtn view" href="javascript:void(0)">删除订单</a> -->
                  </div>
                  <div v-if="orderHeaderDTO.type == 6">
                      <a class="orderdetailbtn view" href="javascript:void(0)" @click="delOrder">删除订单</a>
                  </div>
              </div>
          </div>
      </div>
  </div>
<!--支付弹窗-->
    <payDialog :order-id="selectOrderId" @hidedialog="selectOrderId = 0"></payDialog>
</div>
</template>

<script>
import payDialog from './components/payDialog'
import VueRouter from 'vue-router'
import routers from '../../routers'

export default {
  name: 'mOrderDetail',
  data () {
    return {
      orderHeaderDTO: {}, // 订单信息
      orderReceiveInfo: {}, // 收货人信息
      selectOrderId: 0,
      btnArray: ['否', '是'] // 确认框按钮组
    }
  },
  components: {
    payDialog
  },
  methods: {
    // 取消订单
    cancelOrder () {
      let obj = this
      window.mui.confirm('', '确认取消该订单？', this.btnArray, function (e) {
        if (e.index === 1) {
          obj.$http.post('/orderHeader/cancelOrderHeader', {
            orderId: obj.$route.params.orderId
          }, {emulateJSON: true}).then(
            function (res) {
              if (res && res.body.result === 'success') {
                window.mui.toast('取消成功！')
                this.loadData()
              } else {
                window.mui.toast('取消失败，请稍后重试！')
              }
            }
          )
        }
      })
    },
    // 删除订单
    delOrder () {
      let obj = this
      window.mui.confirm('', '确认删除该订单？', this.btnArray, function (e) {
        if (e.index === 1) {
          obj.$http.post('/orderHeader/delOrderHeader', {
            orderId: obj.$route.params.orderId
          }, {emulateJSON: true}).then(
              function (res) {
                if (res && res.body.result === 'success') {
                  window.mui.toast('删除成功！')
                  new VueRouter({routes: routers}).replace({name: 'mOrderList', params: {listType: obj.orderHeaderDTO.type}})
                } else {
                  window.mui.toast('删除失败，请稍后重试！')
                }
              }
            )
        }
      })
    },
    // 确认收货
    confirmReceive () {
      let obj = this
      window.mui.confirm('', '确认收货？', this.btnArray, function (e) {
        if (e.index === 1) {
          obj.$http.post('/orderHeader/confirmReceive', {
            orderId: obj.$route.params.orderId
          }, {emulateJSON: true}).then(
              function (res) {
                if (res && res.body.result === 'success') {
                  window.mui.toast('已确认收货！')
                  this.loadData()
                } else {
                  window.mui.toast('操作失败，请稍后重试！')
                }
              }
            )
        }
      })
    },
    loadData () {
      // 加载订单数据
      this.$http.get('/orderHeader/orderHeaderDetail', {
        params: {
          orderId: this.$route.params.orderId
        },
        emulateJSON: true
      }).then(
        function (res) {
          this.orderHeaderDTO = res.body.orderHeaderDTO
          this.orderReceiveInfo = res.body.orderReceiveInfo
        }
      )
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style scoped>
</style>
