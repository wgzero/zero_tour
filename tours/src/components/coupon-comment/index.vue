<template>
  <!-- 评论展示组件 -->
  <div class="comment-wraper">
    <column-divide :columnName='columnName'></column-divide>
    <!-- <div v-if="comments.comment_user_phone"> -->
      <div v-for="(v, k) in comments" :key="k" v-if="v.comment_user_phone" class="comment-item">
			<div class="comment-item-top clearfix">
				<div class="phone">{{v.comment_user_phone | truncatePhone}}</div>
				<div class="star">
					<img 
						v-for="(value, key) in v.comment_star" 
						:key="key" src="http://wgzero.com/static/img/star.png" 
						width="15" height="15" />
					<img 
						v-for="(value, key) in (5-v.comment_star)" 
						v-if="(v-v.comment_star)" 
						:key="key" 
						src="http://wgzero.com/static/img/notclickstar.png" 
						width="15" height="15" />
				</div>
			</div>
			<div class="comment-item-bottom">{{v.comment_content}}</div>
		</div>
		<div v-else style="padding: 0 0 10px 10px; color: #595959;">暂无评论</div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from 'vue-property-decorator'
import ColumnDivide from '../column-divide/index.vue'
@Component({
    components: {
        ColumnDivide
    },
    filters: {
        truncatePhone(phone: string) {
            return phone.substr(0,3) + '****' + phone.substr(7, 4)
        }
    }
})
export default class CouponComment extends Vue {
    @Prop({ type: Array, default: () => [] }) private comments!: any[]
    private columnName: string = '最新评论'

}
</script>
<style lang="less" scoped>
.comment-wraper{
    padding-top: 15px;
    .comment-item{
        margin: 3% 3%;
        .comment-item-top {
            .phone{
                float: left;
            }
            .star{
                float: right;
            }
        }
        .comment-item-bottom {
            padding: 7px 0 0 0 ;
            font-size: 12px;
            color: #b4b4b4;
        }
    }
}
</style>