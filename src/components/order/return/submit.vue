<template>
	<div id="page">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-left-nav"></a>
            <h1 class="mui-title">申请退换货</h1>
            <a class="mui-icon"></a>
        </header>

        <div class="mui-content">
            <div class="borderbox">
                <div class="return">
                    <h3>申请类型</h3>
                    <ul class="return-type">
                        <li class="selected">退款</li>
                        <li class="disabled">退货</li>
                        <li>换货</li>
                    </ul>
                </div>
            </div>
            <div class="borderbox">
                <div class="return">
                    <h3>是否收到货</h3>
                    <div class="whether">
                        <p><label><input type="radio" name="rdo_addr" checked="checked">是</label></p>
                        <p><label><input type="radio" name="rdo_addr">否</label></p>
                    </div>
                </div>
            </div>

            <div class="borderbox">
                <div class="loginform">
                    <ul>
                        <li>
                            <div class="hd">需要退款金额：</div>
                            <div class="bd">
                                <div class="info">
                                    <div class="input-wrap"><input type="number" placeholder="">元</div>
                                    <a class="orange">最多￥44.00</a>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="hd">快递公司：</div>
                            <div class="bd">
                                <div class="info">
                                    <div class="input-wrap"><input type="text" value=""></div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="hd">快递单号：</div>
                            <div class="bd">
                                <div class="info">
                                    <div class="input-wrap"><input type="text" value=""></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="borderbox">
                <div class="return">
                    <h3 class="border">退款说明</h3>
                    <div class="instructions">
                        <textarea placeholder="请写下您的退款原因，以便我们更好的为您处理退款。"></textarea>
                    </div>
                    <div class="uploadimg">
                        <ul>
                            <li>
                                <div class="upload-wrap"><input type="file"></div>
                                <div class="pic"><img src="images/sis-qrcode.jpg"></div>
                                <a class="delete"></a>
                            </li>
                            <li><div class="upload-wrap"><input type="file"></div></li>
                            <li><div class="upload-wrap"><input type="file"></div></li>
                            <li><div class="upload-wrap"><input type="file"></div></li>
                            <li><div class="upload-wrap"><input type="file"></div></li>
                            <li class="info">上传图片,最多可以上传5张</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-content-padded mt30 align-center">
            <button type="button" class="mui-btn mui-btn-primary mui-btn-block mb20">确定</button>
        </div>
    </div>
</template>

<script>
import $ from 'n-zepto'

export default {
  name: 'submit',
  data () {
    return {
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
    console.log($('.borderbox')[0])
  }
}
</script>

<style scoped>
</style>