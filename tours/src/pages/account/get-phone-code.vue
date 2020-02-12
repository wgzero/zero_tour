<template>
  <div>
      <headerTop :headerName='headerName'></headerTop>
      <div class="find-pwd-process">
        <img src="http://wgzero.com/static/img/flow1.png" alt="找回密码第一步" width="100%" height="100%">
      </div>
      <div class="account-container">
        <form class="account-container-form" v-on:submit.prevent="next">
          <p>
            <span class="phone-ico"></span>
            <input type="tel"
            placeholder="请输入手机号码"
            maxlength="11"
            class="phone"
            v-model.lazy.trim="phone"
            v-focus v-blur />
          </p>
          <p>
            <span class="code-ico"></span>
            <input type="text"
            placeholder="请输入验证码"
            maxlength="6"
            class="code"
            v-model.lazy.trim="code"
            v-focus v-blur />
            <count-down :phone='phone'></count-down>
          </p>
          <p>
            <input type='submit' value="下一步" class="account-btn" />
          </p>
        </form>
      </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import headerTop from '../../components/headerNav/index.vue'
import CountDown from '../../components/count-down/index.vue'
import { validatePhone } from '../../utils/index'

@Component({
  components: {
    headerTop,
    CountDown
  },
  directives: {
    focus,
    blur
  }
})

export default class getPhoneCode extends Vue {
  private headerName: string = '找回密码第一步'
  private phone: string = ''
  private code: string = ''

  private next(){
    if(!validatePhone(this.phone)){
      return this.$dialog.alert({
        message: '手机格式不正确,请重新输入'
      })
    }
    this.$router.replace({
      path: '/account/reset-password',
      query: {
        phone: this.phone
      }
    })
  }
}


</script>
<style lang="less" scoped>
@charset "UTF-8";
/*
 * 登录、注册页、找回密码等表单页面样式
*/

.account-container {
	width  : 84%;
	padding: 20px 8% 0 8%;
}

.account-container-form p {
	position     : relative;
	margin-bottom: 15px;
}

.phone,
.code,
.pwd,
.account {
	height       : 45px;
	border-radius: 3px;
	font-size    : 14px;
	color        : #4d4d4d;
}

.phone-ico,
.code-ico,
.phone-ico,
.pwd-ico {
	display        : block;
	position       : absolute;
	height         : 100%;
	background-size: 30px 30px;
}

.phone-ico {
	background-image   : url("http://wgzero.com/static/img/phone.png");
	background-repeat  : no-repeat;
	background-position: 0 7px;
}

.code-ico {
	background-image   : url("http://wgzero.com/static/img/verify.png");
	background-repeat  : no-repeat;
	background-position: 0 7px;
}

.phone-ico {
	background-image   : url("http://wgzero.com/static/img/account.png");
	background-repeat  : no-repeat;
	background-position: 0 7px;
}

.pwd-ico {
	background-image   : url("http://wgzero.com/static/img/password.png");
	background-repeat  : no-repeat;
	background-position: 0 7px;
}

.account-btn {
	display         : block;
	width           : 100%;
	height          : 45px;
	margin          : 0 0 20px 0;
	text-align      : center;
	line-height     : 45px;
	border-radius   : 25px;
	background-color: #2577e3;
	color           : #fff;
	font-size       : 15px;
}

.unable {
	display   : block;
	text-align: right;
	color     : #2577e3;
	font-size : 12px;
}

.phone-prompt {
	display   : block;
	text-align: right;
	color     : #afafaf;
	font-size : 12px;
}

@media only screen and (max-width: 319px) {

	.phone-ico,
	.code-ico,
	.pwd-ico,
	.phone-ico {
		width: 11%;
	}

	.phone,
	.code,
	.pwd,
	.account {
		width       : 89%;
		padding-left: 11%;
	}
}

@media only screen and (min-width: 320px) and (max-width: 374px) {

	.phone-ico,
	.code-ico,
	.pwd-ico,
	.phone-ico {
		width: 11%;
	}

	.phone,
	.code,
	.pwd,
	.account {
		width       : 89%;
		padding-left: 11%;
	}
}

@media only screen and (min-width: 375px) and (max-width: 413px) {

	.phone-ico,
	.code-ico,
	.pwd-ico,
	.phone-ico {
		width: 10%;
	}

	.phone,
	.code,
	.pwd,
	.account {
		width       : 90%;
		padding-left: 10%;
	}
}

@media only screen and (min-width: 414px) and (max-width: 480px) {

	.phone-ico,
	.code-ico,
	.pwd-ico,
	.phone-ico {
		width: 9%;
	}

	.phone,
	.code,
	.pwd,
	.account {
		width       : 91%;
		padding-left: 9%;
	}
}

@media only screen and (min-width: 480px) and (max-width: 767px) {

	.phone-ico,
	.code-ico,
	.pwd-ico,
	.phone-ico {
		width: 7%;
	}

	.phone,
	.code,
	.pwd,
	.account {
		width       : 93%;
		padding-left: 7%;
	}
}

@media only screen and (min-width: 768px) {

	.phone-ico,
	.code-ico,
	.pwd-ico,
	.phone-ico {
		width: 6%;
	}

	.phone,
	.code,
	.pwd,
	.account {
		width       : 94%;
		padding-left: 6%;
	}
}
.find-pwd-process{
  width: 100%;
  height: 35px;
  margin: 15px auto;
}@media only screen and (min-width: 768px) {
  .find-pwd-process {
    height: 60px;
  }
}

</style>