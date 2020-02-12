<template>
<!-- 修改性别组件 -->
  <div class="change-sex-wraper">
    <headerTop :headerName='headerName'></headerTop>
    <div class="white-item-wraper" style="border-bottom: 1px solid #efeded">
      <label for="man" :class="{'this-sex': sex == 1}">男</label>
      <input type="radio" name="sex" value="1" id="man" checked v-model="sex" @click="changeSex">
    </div>
    <div class="white-item-wraper">
      <label for="woman" :class="{'this-sex': sex == 0}">女</label>
      <input type="radio" name="sex" value="0" id="woman" checked v-model="sex" @click="changeSex">
    </div>
  </div>
</template>

<script lang='ts'>
  import { Vue, Component } from 'vue-property-decorator'
  import headerTop from '../../components/headerNav/index.vue'
  import { changeUserSex } from '../../api/personal'

  interface Query {
    userId?:number;
    userSex?: 0 | 1
  }

  @Component({
    components:{
      headerTop
    }
  })

  export default class ChangeUserSex extends Vue {
    private headerName: string = '修改性别'
    private userId: number = 0;
    private sex: number = 1;

    private created(){
      const query: Query = this.$route.query
      this.userId = query.userId !== undefined ? query.userId -0 : 0;
      this.sex = query.userSex !== undefined ? query.userSex -0 : 1;
    }

    private changeSex(e: any){
      this.sex = e.target.value - 0;
      this.$nextTick(() => {
        const userId = this.userId || 0
        const userSex = this.sex
        if(!userId){
          return this.$dialog.alert({
            message: '用户ID不合法'
          })
        }
        changeUserSex(userId, userSex).then(res => {
          const { code, data, message } = res.data
          this.$dialog.alert({ message })
        }).catch(err => {
          this.$dialog.alert({ message: err })
        })
      })
    } 
  }

</script>

<style lang="less" scoped>
// http://wgzero.com/static/img/phone.png
.white-item-wraper {
		display: block;
		position: relative;
		height: 50px;
		line-height: 50px;
		text-align: right;
		background-color: #fff;
	}
	.white-item-wraper label {
		position: absolute;
		left: 0;
		width: 95%;
		text-align: left;
		padding-left: 5%;
		&.this-sex {
			background-image: url("http://wgzero.com/static/img/check.png");
			background-repeat: no-repeat;
			background-size: 32px 32px;
			background-position: 95% 8px;
		}
	}

</style>