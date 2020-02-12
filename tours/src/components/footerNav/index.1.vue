<template>
  <div class='footer-nav'>
      <div v-if="navName==='personal'" class="box-btm">
          <router-link tag='a' :to="{path: '/home'}" class="nav-tag">
            <img src="http://wgzero.com/static/img/discountsgrey.png" width="30" height="26" alt="全球惠购" class="tag-ico">
            <div class="tag-name">全球惠购</div>
          </router-link>
          <router-link tag='a' :to="{path: '/personal'}" class="nav-tag this-tag">
            <img src="http://wgzero.com/static/img/mineblue.png" width="30" height="26" alt="我的" class="tag-ico">
            <div class="tag-name">我的</div>
          </router-link>
      </div>
      <div v-if="navName!=='personal'" class="box-btm">
          <router-link tag='a' :to="{path: '/home'}" class="nav-tag" this-tag>
            <img src="http://wgzero.com/static/img/discountsblue.png" width="30" height="26" alt="全球惠购" class="tag-ico">
            <div class="tag-name">全球惠购</div>
          </router-link>
          <router-link tag='a' :to="{path: '/personal'}" class="nav-tag ">
            <img src="http://wgzero.com/static/img/minegrey.png" width="30" height="26" alt="我的" class="tag-ico">
            <div class="tag-name">我的</div>
          </router-link>
      </div>
  </div>
</template>

<script lang='ts'>
    import { Component, Vue, Prop } from 'vue-property-decorator'
    @Component
    export default class footerNav extends Vue{
        @Prop({type: String}) private navName!: string;
    }
</script>
<style lang="less" scoped>
    .footer-nav{
        position: fixed;
        z-index: 3;
        bottom: 0;
        width: 100%;
        max-width: 640px;
        height: 50px;
        background-color: #fff;
        .box-btm{
            display: flex;
            flex-flow:  row nowrap;
            .nav-tag{
                flex: 1;
                text-align: center;
                color: #7c8592;
                .tag-ico{
                    margin-top: 3px;
                    width: 30px;
                    height: 26px;
                }
                .tag-name{
                    margin-top: -5px;
                    height: 18px;
                    line-height: 18px;
                }
                &.this-tag{
                    color: #2577e3;
                }
            }
        }
    }
    @media only screen and (min-width: 640px) {
        .footer-nav{
            left: 50%;
            margin-left: -320px;
        }
    }
</style>