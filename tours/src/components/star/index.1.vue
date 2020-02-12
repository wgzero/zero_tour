<template>
  <!-- 星级评分组件 -->
  <div class="star-wraper">
    <span
      v-for="(v, k) in gradeStarArray"
      :key="k"
      @click="grade(k)"
      :class="{'colorful': v.className === 'colorfulStar', 'gray': v.className === 'grayStar'}"
    >
      {{ v.star }}
    </span>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
@Component
export default class Star extends Vue {
  private starArray: any[] = [];
  private gradeStarArray: any[] = [];

  private mounted(){
      let starArr = this.starArray
      for(let j =0; j < 5; j+=1){
          starArr[j] = {star: '★', className: 'colorfulStar'}
      }
      for(let i =0; i < 10; i+=1){
          starArr[i] = {star: '★', className: 'grayStar'}
      }
      this.gradeStarArray = starArr.slice(5, 10)
  }

  private grade(num: number): void {
      this.gradeStarArray = this.starArray.slice(4-num, 9-num)
      this.$emit('on-change', num + 1)
  }
}
</script>
<style lang="" scoped>
</style>