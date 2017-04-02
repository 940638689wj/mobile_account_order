<template>
<div>
    <div id="J_ASSpec" class="actionsheet-spec">
        <div class="payment-method" v-show="payWayShow">
            <div class="close" @click="clickHideDialog"></div>
            <div class="prod-info">
                <div class="title">请选择支付方式</div>
            </div>
            <div class="spec-list">
                <div class="spec-list-wrap">
                    <ul class="tbviewlist paytypes">
                        <li v-for="(value,key) in bussinessConfigTypeList">
                            <a href="javascript:void(0)" @click="selectPayWay(2)"
                               v-if="key == 'config_alipay_mobile'">支付宝支付</a>
                            <a href="javascript:void(0)" @click="selectPayWay(4)"
                               v-if="key == 'config_unionpay_mobile'">银联支付</a>
                            <a href="javascript:void(0)" @click="selectPayWay(1)"
                               v-if="key == 'weixin_pay_config'">微信支付</a>
                            <a href="javascript:void(0)" @click="selectPayWay(5)"
                               v-if="key == 'userBalnce'">余额支付</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="fbbwrap-total nofixed">
                <div class="ftbtnbar">
                    <div class="button-wrap button-wrap-expand">
                        <a href="javascript:void(0)" class="button cancelBtn" @click="clickHideDialog">取消</a>
                    </div>
                </div>
            </div>
        </div>
        <!--余额支付-->
        <div class="ye-payment" v-show="payPasswordShow">
            <div class="close" @click="clickHideDialog"></div>
            <div class="prod-info">
                <div class="title">支付订单金额<span class="orange">￥{{orderPayAmt}}</span>元</div>
            </div>
            <div class="paymentwrap">
                <div v-show="isPayPassword == 0">
                    <div class="orderinfo">
                        <P>请输入支付密码</P>
                    </div>
                    <div class="pwd-box">
                        <input type="tel" maxlength="6" class="pwd-input" id="pwd-input" v-model.trim="pwdInput"
                               @input="pwdInputEvt">
                        <div class="fake-box">
                            <input type="password" readonly="">
                            <input type="password" readonly="">
                            <input type="password" readonly="">
                            <input type="password" readonly="">
                            <input type="password" readonly="">
                            <input type="password" readonly="">
                        </div>
                    </div>
                </div>
                <div v-show="isPayPassword == 1">
                    <div class="orderinfo">
                        <p>您还未设置支付密码，为保障账户资金安全，<br>请先<a href="javascript:void(0)" @click="setPayPaw"
                                                        class="textcolor">设置支付密码</a>！</p>
                    </div>
                </div>
            </div>

            <div class="fbbwrap-total nofixed">
                <div class="ftbtnbar">
                    <div class="button-wrap button-wrap-expand">
                        <a href="javascript:void(0)" class="button" @click="payByBalance">确定</a>
                        <a href="javascript:void(0)" class="button cancel" @click="clickHideDialog">取消</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style='display: none' class='mask'></div>
</div>
</template>

<script>
import $ from 'n-zepto'

export default {
  name: 'payDialog',
  props: ['orderId'],
  data () {
    return {
      bussinessConfigTypeList: {}, // 所有支付类型
      orderNumber: '', // 订单号
      orderPayAmt: -1, // 支付金额
      isPayPassword: -1, // 是否已设置支付密码 0：已设置 1：未设置
      payWayShow: false, // 选择支付类型的弹窗显示状态
      payPasswordShow: false, // 输入支付密码的弹窗显示状态
      payUrl: '/m/account/order/goToOrderPayment', // 支付地址前缀
      pwdInput: '' // 密码输入框
    }
  },
  watch: {
    // 监听订单id更改，获取支付方式并打开弹窗
    orderId () {
      // id有效则打开弹窗并加载支付列表
      if (this.orderId) {
        // 隐藏两个弹窗
        this.payWayShow = false
        this.payPasswordShow = false

        this.$http.get('/orderHeader/getBussinessConfigTypeList', {
          params: {
            orderId: this.orderId
          },
          emulateJSON: true
        }).then(
          function (res) {
            this.payWayShow = true
            $('.mask,.actionsheet-spec').show()

            this.bussinessConfigTypeList = res.body.bussinessConfigTypeList
            this.orderNumber = res.body.orderNumber
            this.orderPayAmt = res.body.orderPayAmt
            this.isPayPassword = res.body.isPayPassword
          }
        )
      }
    }
  },
  methods: {
    // 选定支付方式
    selectPayWay (payWay) {
      if (payWay !== 5) {
        // 非余额支付则直接跳转
        window.location.href = this.payUrl + '?orderNumber=' + this.orderNumber + '&payWay=' + payWay
      } else {
        // 余额支付需继续输入密码
        this.payWayShow = false
        this.payPasswordShow = true
      }
    },
    // 设置支付密码
    setPayPaw () {
      window.location.href = '/m/account/accountSecurity/changePaw_Reset?type=1&successUrl=' + window.location.href
    },
    // 隐藏弹窗
    clickHideDialog () {
      this.hideDialog()
      // 通知父组件弹窗关闭，清空orderId
      this.$emit('hidedialog')
    },
    // 余额支付输入密码后点击确认
    payByBalance () {
      if (this.pwdInput.length < 6) {
        window.mui.toast('请输入六位密码')
        return false
      }
      window.location.href = this.payUrl + '?orderNumber=' + this.orderNumber + '&payWay=5'
    },
    // 点击关闭弹窗的按钮
    hideDialog () {
      $('.mask,.actionsheet-spec').hide()
      $(document).unbind('touchmove')
    },
    // 密码框脚本
    pwdInputEvt () {
      var $input = $('.fake-box input')
      for (var i = 0, len = this.pwdInput.length; i < len; i++) {
        $input.eq('' + i + '').val(this.pwdInput[i])
      }
      $input.each(function () {
        var index = $(this).index()
        if (index >= len) {
          $(this).val('')
        }
      })
      if (len === 6) {
      }
    }
  }
}
</script>
<style scoped>
.mask{
  opacity: 1
}
.actionsheet-spec{
  bottom:0;
  top:auto;
}
</style>
