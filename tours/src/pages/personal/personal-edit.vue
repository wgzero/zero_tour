<template>
<!-- 个人资料展示组件 -->
  <div class="personal-edit-wraper">
      <headerTop :headerName='headerName'></headerTop>
      <!-- 个人信息 -->
      <div class="personal-msg-wraper personal-edit-msg-wraper">
        <div class="personal-edit-head">
          <router-link tag='a' 
            :to="{path: '/change-user-thumb',query: {'userId': userId, 'headpic': encodeURIComponent(headpic)}}">
            <img :src="headpic"  width='119' height="119" alt="头像">
          </router-link>
        </div>
      </div>
      <!-- 个人信息修改项 -->
      <div class="personal-msg-item-wraper">
        <router-link tag='a' 
            class="white-item-wraper item"
            style="margin: 10px auto 15px auto"
            :to="{path: '/change-user-name',query: {'userId': userId, 'userName': userName}}">
            <div class="ico username">
              <span>用户名称</span>
            </div>
            <div class="content">
              <span>{{ userName }}</span>
            </div>
          </router-link>
          <router-link tag='a' 
            class="white-item-wraper item"
            :to="{path: '/change-user-sex',query: {'userId': userId, 'userSex': userSex}}">
            <div class="ico sex">
              <span>性别</span>
            </div>
            <div class="content">
              <span v-if="userSex==1">男</span>
              <span v-else>女</span>
            </div>
            <div class="line"></div>
          </router-link>
      </div>
      <!-- 退出登录 -->
      <div class="white-item-wraper">
        <a href="javascript:;" class="login-out" @click="logOut">退出登录</a>
      </div>
  </div>
</template>

<script lang='ts'>
  import { Vue, Component } from 'vue-property-decorator'
  import headerTop from '../../components/headerNav/index.vue'
  import { getUserInfo }  from '../../api/personal'

  @Component({
    components: {
      headerTop
    }
  })

  export default class PersonalEdit extends Vue {
    private headerName: string = '个人资料修改'
    private headpic: string = ''
    private userId: number = 0
    private userName: string = ''
    private userSex: 1 | 0 =1

    private created(){
      this.getUserInfo()
    }

    private getUserInfo(){
      try {
        const uid = window.sessionStorage.uid 
        this.userId = uid 
        getUserInfo(uid).then(res=> {
          const { code, data, message } = res.data
          if(code === 0){
            const { user_name, user_sex, user_headpic } = data
            this.userName = user_name
            this.userSex = user_sex
            this.headpic = user_headpic
          }else{
            this.$dialog.alert({
              message
            })
          }
        }).catch(err => {
          this.$dialog.alert({ message: err })
        })      
      } catch (error) {
        this.$dialog.alert({
          message: error
        })
      }
    }

    private logOut(){
      window.sessionStorage.removeItem('uid')
      this.$router.push({
        path: '/home'
      })
    }
  }

</script>
<style lang="less" scoped>

.white-item-wraper {
  display: block;
  position: relative;
  height: 50px;
  line-height: 50px;
  text-align: right;
  background-color: #fff;
}

.personal-msg-item-wraper {
  margin-bottom: 15px;
  .item {
    .line {
      position: absolute;
      left: 55px;
      width: 100%;
      border-top: 1px solid #efeded;
    }
    .username {
      background-image: url("http://wgzero.com/static/img/username.png");
    }
    .sex {
      background-image: url("http://wgzero.com/static/img/sex.png");
    }
    .ico {
      position: absolute;
      left: 0;
      top: 0;
      width: 35%;
      height: 50px;
      text-align: left;
      padding-left: 56px;
      background-repeat: no-repeat;
      background-size: 30px 30px;
      background-position: 16px 10px;
      span {
        font-size: 15px;
        color: #333;
      }
    }
    .content {
      position: absolute;
      left: 35%;
      top: 0;
      width: 65%;
      height: 50px;
      text-align: right;
      background-image: url("http://wgzero.com/static/img/right.png");
      background-repeat: no-repeat;
      background-size: 15px 15px;
      background-position: 95% 17px;
      color: #808080;
      font-size: 14px;
      span {
        margin-right: 38px;
      }
    }
  }
}

.login-out {
  display: block;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  color: #3c79db;
}

/*
 * Description: 个人中心相关样式
*/

.personal-msg-wraper {
	position: relative;
	bottom: 30px;
	height: 145px;
	background-image: url("http://wgzero.com/static/img/minebg.png");
	background-repeat: no-repeat;
	background-position: center top;
	background-size: 100% 100%;
	.head {
		position: absolute;
		left: 50%;
		top: 38%;
		margin-left: -40px;
		width: 80px;
		height: 80px;
		img {
			border-radius: 50%;
		}
	}
	.personal-edit-head {
		position: absolute;
		left: 50%;
		top: 16%;
		margin-left: -60px;
		width: 119px;
		height: 119px;
		img {
			border-radius: 50%;
		}
	}
	.phone {
		position: absolute;
		left: 50%;
		top: 95%;
		margin-left: -68px;
		width: 136px;
		height: 30px;
		.phone-ico {
			vertical-align: middle;
		}
		.phone-num{
			display: inline-block;
			vertical-align: middle;
			line-height: 30px;
			font-size: 15px;
		}
	}
	.setting {
		position: absolute;
		right: 0;
		top: 25%;
		right: 10px;
		display: inline-block;
		width: 17px;
		height: 17px;
		background-image: url("http://wgzero.com/static/img/install.png");
		background-repeat: no-repeat;
		background-position: center top;
		background-size: 17px 17px;
	}

}

.personal-edit-msg-wraper {
	position: relative;
	top: -5px;
	bottom: 30px;
	height: 186px;
	background-image: url("http://wgzero.com/static/img/personal_headbg.png");
	background-repeat: no-repeat;
	background-position: center top;
	background-size: 100% 100%;
}
</style>