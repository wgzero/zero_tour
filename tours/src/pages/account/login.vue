<template>
  <div class="account-container">
    <form
      class="account-container-form"
      v-on:submit.prevent='login'
    >
      <p>
        <span class="phone-ico"></span>
        <input
          type="tel"
          placeholder="请输入手机号码"
          maxlength="11"
          class="phone"
          v-model.lazy.trim='phone'
          v-focus
          v-blur
        />
      </p>
      <p>
        <span class="phone-ico"></span>
        <input
          type="password"
          placeholder="请输入密码"
          class="pwd"
          v-model.lazy.trim="pwd"
        />
      </p>
      <p>
        <input
          type="submit"
          value="登	录"
          class="account-btn"
        />
      </p>
      <router-link
        tag='a'
        class="phone-prompt"
        :to="{name: 'getPhoneCode'}"
        replace
      >
        忘记密码
      </router-link>
    </form>
  </div>
</template>

<script lang='ts' scoped>
import { Component, Vue } from "vue-property-decorator";
import { focus, blur } from "../../mixins/directive";

import { login } from "../../api/auth";
import { validatePhone, validatePassword } from "../../utils/index";

@Component({
  directives: {
    focus,
    blur
  }
})
export default class Login extends Vue {
  private phone: string = "";
  private pwd: string = "";

  login() {
    if (!validatePhone(this.phone)) {
      return this.$dialog.alert({
        message: "手机号码格式不正确,请重新输入"
      });
    }
    if (!validatePassword(this.pwd)) {
      return this.$dialog.alert({
        message: "密码至少需要6位数,请重新输入"
      });
    }

    login(this.phone, this.pwd)
      .then(res => {
        const { code, data, message } = res.data;
        if (code === 0) {
          window.sessionStorage.uid = data;
          this.$router.back();
        } else {
          this.$dialog.alert({ message });
        }
      })
      .catch(error => {
        this.$dialog.alert({ message: "登录失败" });
      });
  }
}
</script>

<style lang="less" scoped>
@charset "UTF-8";
/*
 * 登录、注册页、找回密码等表单页面样式
*/
.account-container {
  width: 84%;
  padding: 20px 8% 0 8%;
}
.account-container-form p {
  position: relative;
  margin-bottom: 15px;
}
.phone,
.code,
.pwd,
.account {
  height: 45px;
  border-radius: 3px;
  font-size: 14px;
  color: #4d4d4d;
}
.phone-ico,
.code-ico,
.phone-ico,
.pwd-ico {
  display: block;
  position: absolute;
  height: 100%;
  background-size: 30px 30px;
}
.phone-ico {
  background-image: url("http://wgzero.com/static/img/phone.png");
  background-repeat: no-repeat;
  background-position: 0 7px;
}
.code-ico {
  background-image: url("http://wgzero.com/static/img/verify.png");
  background-repeat: no-repeat;
  background-position: 0 7px;
}
.phone-ico {
  background-image: url("http://wgzero.com/static/img/account.png");
  background-repeat: no-repeat;
  background-position: 0 7px;
}
.pwd-ico {
  background-image: url("http://wgzero.com/static/img/password.png");
  background-repeat: no-repeat;
  background-position: 0 7px;
}
.account-btn {
  display: block;
  width: 100%;
  height: 45px;
  margin: 0 0 20px 0;
  text-align: center;
  line-height: 45px;
  border-radius: 25px;
  background-color: #2577e3;
  color: #fff;
  font-size: 15px;
}
.unable {
  display: block;
  text-align: right;
  color: #2577e3;
  font-size: 12px;
}
.phone-prompt {
  display: block;
  text-align: right;
  color: #afafaf;
  font-size: 12px;
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
    width: 89%;
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
    width: 89%;
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
    width: 90%;
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
    width: 91%;
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
    width: 93%;
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
    width: 94%;
    padding-left: 6%;
  }
}
</style>