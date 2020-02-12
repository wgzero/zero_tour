<template>
  <div class="all-global">
    <!-- 头部 -->
    <headerHome :headerName='headerName'></headerHome>
    <!-- banner：全球&&购物 -->
    <div class="mb10">
      <div class="condition-wraper">
        <div class="left-wrapper choose-condition" @click="showRegionList">
          <span>
            <font>{{ regionName }}</font>
          </span>
        </div>
        <div class="right-wrapper choose-condition" @click="showClassifyList">
          <span>
            <font>{{ classifyName }}</font>
          </span>
        </div>
      </div>
      <!--  -->
      <div class="list" id="contry-list" :class="{'dis-block': isRegion, 'dis-none': !isRegion}">
        <a href="javascript:;" v-for="(v, k) in regionList" :key="k" @click="showCoupons(v.id, classifyId)" :class="{'this-type': regionId==v.id}">
          <span>{{ v.region_name }}</span>
        </a>
      </div>

      <!-- 分类列表 -->
      <div class="list" id="classify" :class="{'dis-block': isClassify, 'dis-none': !isClassify}">
        <a href="javascript:;" v-for="(v, k) in classifyList" :key="k" @click="showCoupons(regionId, v.id)" :class="{'this-type': classifyId==v.id}">
          <span>{{ v.classify_name }}</span>
        </a>
      </div>
    </div>
    <!-- content -->
    <div class="coupon-list-wrapper">
      <router-link v-for="(v, k) in couponList" :key='k' :to="{path: '/get-coupon', query: {id: v.id, type:1}}"
        :class="{'use-discount-bg': v.coupon_status==0, 'used-bg': v.coupon_status==1,'past-bg': v.coupon_status==2}"
      >
        <div class="shop-ico">
          <img :src="v.coupon_ico_path" width="100%" height="100%" :alt="v.coupon_name" />
        </div>
        <div class="shop-intro">
          <div class="shop-title">{{ v.coupon_name }}</div>
          <div class="shop-price">
            <span class="condition">{{ v.coupon_explain }}</span>
          </div>
        </div>
        <div class="shop-active shop-active-canuse">
          <p>已抢</p>
          <p>{{ v.coupon_recived_num }}</p>
          <span :class="{'use-discount': v.coupon_status==0, 'used': v.coupon_status==1, 'past': v.coupon_status==2}"></span>
        </div>
      </router-link>
    </div>
    <!-- 加载更多 -->
    <div>
      <a href="javascript:;" v-if="couponList.length && couponList.length % 10 === 0" class="load-more" @click="loadMore">
        加载更多
      </a>
    </div>
    <!-- 没有加载数据出来，显示框架骨 -->
    <div v-if="couponList.length===0" style="background:white" >
      <van-skeleton title avatar :row='3'></van-skeleton>
      <van-skeleton title avatar :row='3'></van-skeleton>
      <van-skeleton title avatar :row='3'></van-skeleton>
      <van-skeleton title avatar :row='3'></van-skeleton>
      <van-skeleton title avatar :row='3'></van-skeleton>
    </div>
    <!-- 尾部 -->
    <footerBtm></footerBtm>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { Skeleton } from 'vant'
import headerHome from '@/components/headerNav/index.vue'
import footerBtm from '@/components/footerNav/index.vue'

import { getCouponsList, getClassifyList, getRegionList } from '../api/coupon'

// Vue组件写法
@Component({
  components:{
    headerHome,
    footerBtm,
    [Skeleton.name]: Skeleton
  }
})

// 
export default class Home extends Vue{
  private headerName: string = '全球惠购'
  private isRegion: boolean = false
  private regionList: any[] =[]
  private classifyList: any[] = []
  private isClassify: boolean = false
  private currentPage: number = 1
  private couponList: any[] = []

  // 计算属性 
  private get regionId(): number {
    return this.$store.state.app.regionId;
  }
  private get regionName(): string {
    return this.$store.state.app.regionName;
  }
  private get classifyId(): number {
    return this.$store.state.app.classifyId
  }
  private get classifyName(): string {
    return this.$store.state.app.classifyName
  }

  // 方法（也是Vue的生命周期钩子）
  private created(){
    this.getClassifyList();
    this.getCouponsList(this.regionId, this.classifyId, this.currentPage)
  }

  private getCouponsList(regionId: number, classifyId: number, page: number){
    getCouponsList(regionId, classifyId, page)
      .then(res => {
        const { code, data, message } = res.data;
        if(code === 0){
          this.couponList.push.apply(this.couponList, data)
        }else{
          this.$dialog.alert({ message })
        }
      })
      .catch(error => {
        this.$dialog.alert({ message: '优惠券列表获取失败,请稍后再试' })
      })
      this.getRegionList()
  }

  private getRegionList(){
    getRegionList().then(res => {
      const { code, data, message } = res.data
      if(code==0){
        this.regionList = data
      }
    })
  }

  private showRegionList(){
    this.isRegion = true
    this.isClassify = false
  }

  private showClassifyList(){
    this.isRegion = false
    if(!this.classifyList.length){
      this.getClassifyList();
    }
    this.isClassify = true
  }

  private getClassifyList(){
    getClassifyList().then(res => {
      console.log('res---', res)
      const { code, data, message } = res.data
      console.log('data', data)
      if(code===0){
        this.classifyList = data
      }
    })
  }
  
  private showCoupons(regionId: number, classifyId: number) {
    console.log('classifyList---',this.classifyList);
    const currentRegionName = this.regionList ? this.regionList[regionId-1].region_name : '全球-000'
    const currentClassifyName = this.classifyList ? this.classifyList[classifyId-1].classify_name : '购物-111'

    this.currentPage = 1;
    this.couponList = []

    this.$store.commit('changeRegionId', regionId)
    this.$store.commit('changeRegionName', currentRegionName)
    this.$store.commit('changeClassifyId', classifyId)
    this.$store.commit('changeClassifyName', currentClassifyName)

    this.getCouponsList(this.regionId, this.classifyId, this.currentPage)

    this.isRegion = this.isClassify = false;

  }

  // 加载更多
  private loadMore(){
    this.getCouponsList(this.regionId, this.classifyId, (this.currentPage +=1))
  }
}

</script>
<style lang="less" scoped>
// @import '../static/less/coupon.less';
.all-global{
  
  .condition-wraper{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background: #fff;
    border-top: 1px solid #f1f4fd;
    border-bottom: 1px solid #f1f4fd;
    z-index: 10;
    position: fixed;
    width: 100%;
    .choose-condition{
      flex: 1;
      position: relative;
      height: 45px;
      color: #383838;
      &.left-wrapper span{
        border-right: 1px solid #e6e6e6;
        font{
          width: 73px;
          background-position: 62px 8px;
        }
      }
      &.right-wrapper span font{
        width: 62px;
        background-position: 50px 8px;
      }
      span{
        display: block;
        position: absolute;
        top: 10px;
        width: 100%;
        height: 26px;
        line-height: 26px;
        text-align: center;
        font{
          display: block;
          margin: 0 auto;
          background-image: url("../static/images/downarrows.png");
          background-repeat: no-repeat;
          background-size: 12px 12px;
        }
      }
    }
  }
  .list{
    position: fixed;
    left: 0;
    top: 91px;
    z-index: 10;
    width: 100%;
    background: #fafbfc;
    a{
      display: block;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #383838;
      font-size: 16px;
      &.this-type span{
        display: inline-block;
        width: 119px;
        color: #2577e3;
        background-image: url('../static/images/check.png');
        background-repeat: no-repeat;
        background-position: 92px 5px;
        background-size: 32px 32px;
      }
    }
  }
  .coupon-list-wrapper{
    margin: 0 3%;
    padding-top: 56px;
  }
  .load-more{
    display: block;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: #fff;
    color: #333;
    font-size: 16px;
  }
}

.coupon-list-wrapper {
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

</style>