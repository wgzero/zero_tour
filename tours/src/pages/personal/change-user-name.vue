<template>
  <!-- 修改用户名组件 -->
  <div class="change-username-sex">
    <headerTop :headerName='headerName'></headerTop>
    <div
      class="white-item-wraper"
      style="border-bottom: 1px solid #efeded"
    >
      <label for="username">用户名:</label>
      <input
        type="text"
        placeholder="请输入您的用户名"
        id="username"
        v-model="userName"
        v-on:blur='changeUserName()'
        v-focus
        v-blur
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import headerTop from "../../components/headerNav/index.vue";
import { focus, blur } from "../../mixins/directive";
import { changeUserName } from "../../api/personal";

interface Query {
  userName?: string;
  userId?: number;
}

@Component({
  components: {
    headerTop
  },
  directives: {
    blur,
    focus
  }
})
export default class ChangeUserName extends Vue {
  private headerName: string = "修改用户名";
  private userName: string = "";

  private created() {
    const query: Query = this.$route.query;
    this.userName = query.userName || "";
  }

  private changeUserName(){
    const query: Query = this.$route.query
    const userId = query.userId !== undefined ? query.userId : 0 ;
    const userName = this.userName || ''
    if(!userName.trim()){
      return this.$dialog.alert({
        message: '请填写用户昵称'
      })
    }
    if(!userId){
      return this.$dialog.alert({
        message: '用户ID不合法'
      })
    }

    changeUserName(userId, this.userName).then(res => {
      const { code, data, message } = res.data
      this.$dialog.alert({ message })
    }).catch(err => {
      this.$dialog.alert({ message: err })
    })
  }
}
</script>

<style lang="less" scoped>
.white-item-wraper{
  display: block;
  position: relative;
  height: 50px;
  padding: 0 1%;
  line-height: 50px;
  text-align: right;
  background-color: #fff;
  input{
    width: 76%;
  }
}
</style>