<template>
  <!-- 个人中心组件 -->
  <div class="personal-wraper">
    <!-- 头部 -->
    <headerTop :headerName='headerName'></headerTop>
    <!-- 个人信息 -->
    <div class="personal-msg-wraper">
      <div class="head">
        <img
          :src="userInfo.headpic"
          width="80"
          height="80"
          alt="头像"
        >
      </div>
      <div class="phone">
        <img
          src="http://wgzero.com/static/img/phone.png"
          width="30"
          height="30"
          class="phone-ico"
          alt="手机"
        />
        <span class="phone-num">{{ userInfo.phone }}</span>
      </div>
      <router-link
        tag='a'
        :to="{path: '/personal-edit'}"
        class="setting"
      ></router-link>
    </div>

    <!-- 卡包列表 -->
    <div class="gift-list-wraper distance-wraper">
      <div class="title">卡包</div>
      <!-- 银联优惠 -->
      <div class="gift-item">
        <div
          class="brief"
          @click="showUnion"
        >
          <span class="gift-ico unionpay-ico"></span>
          <span class="gift-name">银联优惠({{ unionNum }})</span>
          <span
            class="flex-ico"
            :class="{'flex-ico-up': isUnionpay, 'flex-ico-down': !isUnionpay}"
          ></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{'gift-detail-on': isUnionpay, 'gift-detail-off': !isUnionpay}"
        >
          <router-link
            v-for="(v,k) in unionCouponList"
            :key="k"
            :to="{path: '/get-coupon', query: {id: v.id, type: 2}}"
            :class="{'use-discount-bg': v.status === 0, 'used-bg': v.status === 1, 'past-bg': v.status === 2}"
          >
            <div class="shop-ico">
              <img
                :src="v.coupon_ico_path"
                :alt="v.coupon_name"
                width="100%"
                height="100%"
              >
            </div>
            <div class="shop-intro">
              <div class="shop-title">{{ v.coupon_name }}</div>
              <div class="shop-price">
                <span class="condition">{{ v.coupon_explain }}</span>
              </div>
            </div>
            <div
              class="shop-active shop-active-canuse"
              v-if="v.status===0"
            >
              <p>已抢</p>
              <p>{{ v.coupon_recived_num }}</p>
              <span class="use-discount"></span>
            </div>
            <div
              class="shop-active"
              v-if="v.status===1"
            >
              <a
                href="javascript:;"
                class="used"
              ></a>
            </div>
            <div
              class="shop-active"
              v-if="v.status===2"
            >
              <a
                href="javascript:;"
                class="past"
              ></a>
            </div>
          </router-link>
        </div>
      </div>
      <!-- VISA权益 -->
      <div class="gift-item">
        <div
          class="brief"
          @click="showVisa"
        >
          <span class="gift-ico visa-ico"></span>
          <span class="gift-name">VISA权益 ({{ visaNum }})</span>
          <span
            class="flex-ico"
            :class="{'flex-ico-up': isVisa, 'flex-ico-down': !isVisa}"
          ></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{'gift-detail-on': isVisa, 'gift-detail-off': !isVisa}"
        >
          <router-link
            v-for="(v,k) in visaCouponList"
            :key="k"
            :to="{path: '/get-coupon', query: {id: v.id, type: 2}}"
            :class="{'use-discount-bg': v.status === 0, 'used-bg': v.status === 1, 'past-bg': v.status === 2}"
          >
            <div class="shop-ico">
              <img
                :src="v.coupon_ico_path"
                :alt="v.coupon_name"
                width="100%"
                height="100%"
              >
            </div>
            <div class="shop-intro">
              <div class="shop-title">{{ v.coupon_name }}</div>
              <div class="shop-price">
                <span class="condition">{{ v.coupon_explain }}</span>
              </div>
            </div>
            <div
              class="shop-active shop-active-canuse"
              v-if="v.status===0"
            >
              <p>已抢</p>
              <p>{{ v.coupon_recived_num }}</p>
              <span class="use-discount"></span>
            </div>
            <div
              class="shop-active"
              v-if="v.status===1"
            >
              <a
                href="javascript:;"
                class="used"
              ></a>
            </div>
            <div
              class="shop-active"
              v-if="v.status===2"
            >
              <a
                href="javascript:;"
                class="past"
              ></a>
            </div>
          </router-link>
        </div>
      </div>
      <!-- 环球锦囊团优惠 -->
      <div class="gift-item">
        <div
          class="brief"
          @click="showJinnang"
        >
          <span class="gift-ico jinnang-ico"></span>
          <span class="gift-name">环球锦囊团优惠({{ jinnangNum }})</span>
          <span
            class="flex-ico"
            :class="{'flex-ico-up': isJinnang, 'flex-ico-down': !isJinnang}"
          ></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{'gift-detail-on': isJinnang, 'gift-detail-off': !isJinnang}"
        >
          <router-link
            v-for="(v,k) in jinnangCouponList"
            :key="k"
            :to="{path: '/get-coupon', query: {id: v.id, type: 2}}"
            :class="{'use-discount-bg': v.status === 0, 'used-bg': v.status === 1, 'past-bg': v.status === 2}"
          >
            <div class="shop-ico">
              <img
                :src="v.coupon_ico_path"
                :alt="v.coupon_name"
                width="100%"
                height="100%"
              >
            </div>
            <div class="shop-intro">
              <div class="shop-title">{{ v.coupon_name }}</div>
              <div class="shop-price">
                <span class="condition">{{ v.coupon_explain }}</span>
              </div>
            </div>
            <div
              class="shop-active shop-active-canuse"
              v-if="v.status===0"
            >
              <p>已抢</p>
              <p>{{ v.coupon_recived_num }}</p>
              <span class="use-discount"></span>
            </div>
            <div
              class="shop-active"
              v-if="v.status===1"
            >
              <a
                href="javascript:;"
                class="used"
              ></a>
            </div>
            <div
              class="shop-active"
              v-if="v.status===2"
            >
              <a
                href="javascript:;"
                class="past"
              ></a>
            </div>
          </router-link>
        </div>
      </div>
      <!-- 高岛屋权益 -->
      <div class="gift-item">
        <div
          class="brief"
          @click="showGaodaowu"
        >
          <span class="gift-ico unionpay-ico"></span>
          <span class="gift-name">高岛屋权益({{ gaodaowuNum }})</span>
          <span
            class="flex-ico"
            :class="{'flex-ico-up': isGaodaowu, 'flex-ico-down': !isGaodaowu}"
          ></span>
        </div>
        <div
          class="coupon-list-wraper"
          :class="{'gift-detail-on': isGaodaowu, 'gift-detail-off': !isGaodaowu}"
        >
          <router-link
            v-for="(v,k) in gaodaowuCouponList"
            :key="k"
            :to="{path: '/get-coupon', query: {id: v.id, type: 2}}"
            :class="{'use-discount-bg': v.status === 0, 'used-bg': v.status === 1, 'past-bg': v.status === 2}"
          >
            <div class="shop-ico">
              <img
                :src="v.coupon_ico_path"
                :alt="v.coupon_name"
                width="100%"
                height="100%"
              >
            </div>
            <div class="shop-intro">
              <div class="shop-title">{{ v.coupon_name }}</div>
              <div class="shop-price">
                <span class="condition">{{ v.coupon_explain }}</span>
              </div>
            </div>
            <div
              class="shop-active shop-active-canuse"
              v-if="v.status===0"
            >
              <p>已抢</p>
              <p>{{ v.coupon_recived_num }}</p>
              <span class="use-discount"></span>
            </div>
            <div
              class="shop-active"
              v-if="v.status===1"
            >
              <a
                href="javascript:;"
                class="used"
              ></a>
            </div>
            <div
              class="shop-active"
              v-if="v.status===2"
            >
              <a
                href="javascript:;"
                class="past"
              ></a>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <footerNav :navName='navName'></footerNav>
  </div>
</template>

<script lang='ts'>
  import { Vue, Component } from 'vue-property-decorator'
  import headerTop from '../../components/headerNav/index.vue'
  import footerNav from '../../components/footerNav/index.vue'
  import { getUserInfo } from '../../api/personal'
  import { getCouponRecord, getReceivedCouponList } from '../../api/coupon'

  interface UserInfo {
    phone: string
    headpic: string
  }

  interface CouponRecord {
    num: number
    coupon_type: string
  }

  interface Coupon {
    coupon_explain: string
    coupon_ico_path: string
    coupon_name: string
    coupon_received_num: string
    id: number
    status: number
  }

  @Component({
    components: {
      headerTop,
      footerNav
    }
  })

  export default class Personal extends Vue {
    private headerName: string = '个人中心'
    private navName: string = 'personal'
    private isUnionpay: boolean = false
    private isVisa: boolean = false
    private isJinnang: boolean = false
    private isGaodaowu: boolean = false
    private userInfo: UserInfo = { phone: '', headpic: '' }
    private unionNum: number = 0
    private visaNum: number = 0
    private jinnangNum: number = 0
    private gaodaowuNum: number = 0
    private unionCouponList: Coupon[] =[]
    private visaCouponList: Coupon[] =[]
    private jinnangCouponList: Coupon[] =[]
    private gaodaowuCouponList: Coupon[] =[]

    private created(){
      const uid: number = window.sessionStorage.uid
      console.log('uid======', uid)
      if(uid){
        this.getUserInfo(uid)
        this.getCouponRecord(uid)
      }else{
        this.$router.push({path: '/account/login'})
      }
    }

    private getUserInfo(id: number) {
      try {
        getUserInfo(id).then(res => {
          const { code, data, message } = res.data
          if(code === 0){
            const { user_headpic, user_phone } = data
            this.userInfo.headpic = user_headpic
            console.log('phone-------------', user_phone)
            this.userInfo.phone = user_phone
          }else{
            this.$dialog.alert({message})
          }
        }).catch(err => {
          this.$dialog.alert({
            message: err
          })
        })
      } catch (error) {
        this.$router.push({name: 'Login'})
      }
    }

    private getCouponRecord(id: number) {
      getCouponRecord(id).then(res => {
        console.log('res----get', res)
        const { code, data, message } = res.data
        if(code === 0){
          data.forEach((coupon: CouponRecord): void => {
            switch (coupon.coupon_type) {
              case 'union':
                this.unionNum = coupon.num
                break;
              case 'visa':
                this.visaNum = coupon.num
                break;
              case 'jinnang':
                this.jinnangNum = coupon.num
                break;
              case 'gaodaowu':
                this.gaodaowuNum = coupon.num
                break;
            
              default:
                break;
            }
          })
        } else {
          this.$dialog.alert({ message })
        }
      }).catch(err => {
        this.$dialog.alert({ message: err })
      })
    }

    private getReceivedCouponList(type: 'union' | 'visa' | 'jinnang' | 'gaodaowu'){
      const uid: number = window.sessionStorage.uid
      return getReceivedCouponList(uid, type)
    }

    // 出现重复的了可以进行封装
    private async showUnion(){
      this.isUnionpay = !this.isUnionpay
      this.isVisa = this.isJinnang = this.isGaodaowu = false
      if(!this.isUnionpay) return;

      try {
        const res = await this.getReceivedCouponList('union')
        const { code, data, message } = res.data
        console.log('res-show', res)
        if(code === 0){
          this.unionCouponList = data
        }else{
          this.$dialog.alert({message})
        }
      } catch (error) {
        this.$dialog.alert({message: error})
      }
    }

    private async showVisa(){
      this.isVisa = !this.isVisa
      this.isUnionpay = this.isJinnang = this.isGaodaowu = false
      if(!this.isVisa) return

      try {
        const res = await this.getReceivedCouponList('visa')
        const { code, data, message } = res.data
        if(code === 0){
          this.visaCouponList = data
        }else{
          this.$dialog.alert({message})
        }
      } catch (error) {
        this.$dialog.alert({message: error})
      }
    }

    private async showJinnang(){
      this.isJinnang = !this.isJinnang
      this.isUnionpay = this.isVisa = this.isGaodaowu = false
      if(!this.isJinnang) return

      try {
        const res = await this.getReceivedCouponList('jinnang')
        const { code, data, message } = res.data
        if(code === 0){
          this.jinnangCouponList = data
        }else{
          this.$dialog.alert({message})
        }
      } catch (error) {
        this.$dialog.alert({message: error})
      }
    }

    private async showGaodaowu(){
      this.isGaodaowu = !this.isGaodaowu
      this.isVisa = this.isJinnang = this.isUnionpay = false
      if(!this.isGaodaowu) return

      try {
        const res = await this.getReceivedCouponList('gaodaowu')
        const { code, data, message } = res.data
        if(code === 0){
          this.gaodaowuCouponList = data
        }else{
          this.$dialog.alert({message})
        }
      } catch (error) {
        this.$dialog.alert({message: error})
      }
    }

  }

</script>
<style lang="less" scoped>
@charset "UTF-8";

.gift-list-wraper{
  .title{
    margin-bottom: 10px;
    border-left: 5px solid #ffb000;
    padding-left: 10px;
    font-size: 15px;
  }
  .gift-item{
    .brief{
      position: relative;
      margin-bottom: 10px;
      height: 55px;
      background-color: #fff;
      .gift-ico{
        display: inline-block;
        position: absolute;
        top: 10px;
        left:10px;
        width: 35px;
        height: 35px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 35px 35px;
      }
      .unionpay-ico{
        background-image: url(http://wgzero.com/static/img/list_unionpay.png);
      }
      .visa-ico{
        background-image: url(http://wgzero.com/static/img/list_visa.png);
      }
      .jinnang-ico{
        background-image: url(http://wgzero.com/static/img/jinnangtuan.png);
      }
      .gaodaowu-ico{
        background-image: url(http://wgzero.com/static/img/list_dutyfree.png);
      }
      .gift-name{
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 55px;
        height: 35px;
        line-height: 35px;
      }
      .flex-ico{
        display: inline-block;
        position: absolute;
        right: 16px;
        top: 22px;
        width: 12px;
        height: 12px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 12px 12px;
      }
      .flex-ico-down{
        background-image: url(http://wgzero.com/static/img/flex_down.png);
      }
      .flex-ico-up{
        background-image: url(http://wgzero.com/static/img/flex_up.png);
      }
    }
  }
}

.gift-detail-on{
  display: block;
}
.gift-detail-off{
  display: none;
}

/**
 * Description: 优惠券列表公用LESS
 */

.coupon-list-wraper {
	a {
		display: block;
		position: relative;
		height: 95px;
		margin-bottom: 10px;
		background-repeat: no-repeat;
		background-position: left top;
		&.use-discount-bg {
			background-image: url("http://wgzero.com/static/img/discountbg.png");
			background-size: 100% 100%;
			.shop-active {
				position: absolute;
				top: 13px;
				right: 4px;
				height: 70px;
			}
		}
		&.used-bg {
			background-image: url("http://wgzero.com/static/img/usebg.png");
			background-size: 100% 103%;
		}
		&.past-bg {
			background-image: url("http://wgzero.com/static/img/pastduebg.png");
			background-size: 100% 103%;
		}
		.shop-ico {
			position: absolute;
			left: 8px;
			top: 13px;
			width: 105px;
			height: 70px;
			img {
				border: 1px solid #e2e2e2;
			}
		}
		.shop-intro {
			position: absolute;
			left: 118px;
			top: 13px;
			width: 100%;
			.shop-title {
				font-size: 15px;
				color: #4d4d4d;
			}
			.shop-discounts {
				font-size: 12px;
				color: #b3b3b3;
			}
			.shop-price span{
				display: inline-block;
				height: 100%;
				line-height: 22px;
				vertical-align: middle;
				&.condition {
					padding: 0 3px;
					background-color: #fff4ec;
					font-size: 15px;
					color: #f23030;
				}
			}
		}
		.shop-active {
			position: absolute;
			top: 45px;
			right: 4px;
			height: 70px;
			p {
				height: 18px;
				line-height: 30px;
				text-align: center;
				font-size: 10px;
				font-weight: 500;
				color: #f23030;
			}
			.use-discount {
				background-image: url("http://wgzero.com/static/img/littlebtn.png");
			}
			.used {
				background-image: url("http://wgzero.com/static/img/usebtn.png");
			}
			.past {
				background-image: url("http://wgzero.com/static/img/pastduebtn.png");
			}
		}
		.shop-active-canuse {
			background-image: url("http://wgzero.com/static/img/circlered.png");
			background-repeat: no-repeat;
			background-position: center top;
			background-size: 47px 35px;
		}
	}
}

.use-discount, .used, .past {
	display: block;
	height: 33px;
	margin: 10px auto 0 auto;
	background-repeat: no-repeat;
	background-position: center top;
	background-size: 54px 33px;
}

@media only screen and (min-width:320px) and (max-width:374px) {
	.shop-price {
		max-width: 125px;
	}

	.shop-active {
		width: 50px;
	}

	.use-discount, .used, .past {
		width: 50px;
		height: 30px;
		background-size: 50px 33px;
	}
}

@media only screen and (min-width:375px) and (max-width:413px) {
	.shop-price {
		max-width: 156px;
	}

	.shop-active {
		width: 60px;
	}
}

@media only screen and (min-width:414px) and (max-width:767px) {
	.shop-price {
		max-width: 185px;
	}

	.shop-active {
		width: 65px;
	}
}

@media only screen and (min-width:768px) {
	.shop-price {
		max-width: 360px;
	}

	.shop-active {
		width: 107px;
		background-size: 60px 45px;
		p {
			height: 20px;
			line-height: 42px;
		}
	}
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