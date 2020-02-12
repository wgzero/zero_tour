<template>
  <div class="header">
      <div class="explain">
          <a href="javascript:;" class="back" v-show="!isAccount" @click="back()"></a>
          {{ headerName }}
      </div>
  </div>
</template>

<script lang='ts' scoped>
    import { Component, Vue, Prop } from 'vue-property-decorator'
    @Component
    export default class header extends Vue {
        @Prop({type: String, required: true}) private headerName!: string;
        @Prop({type: Boolean, default: false}) private isAccount!: boolean
        back(){
            this.$router.back()
        }
    }
</script>

<style lang="less" scoped>
    .header{
        position: fixed;
        top: 0;
        z-index: 3;
        width: 100%;
        min-width: 320px;
        max-width: 640px;
        background-color: #fff;
        .explain{
            position: relative;
            height: 45px;
            text-align: center;
            line-height: 45px;
            font-size: 18px;
            color: #383838;
            .back{
                position: absolute;
                top: 7px;
                left: 10px;
                display: block;
                width: 21px;
                height: 31px;
                background: url('http://wgzero.com/static/img/goback.png') no-repeat left center;
                background-size: 12px 18px;
                // background: skyblue;
            }
        }
    }
</style>