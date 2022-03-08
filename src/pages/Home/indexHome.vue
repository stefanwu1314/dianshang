<template>
  <div>
      <!-- 使用3级联动全局组件 -->
      <type-nav></type-nav>
      <ListContainer/>
      <Recommend/>
      <Rank/>
      <Like/>
      <Floor v-for="f in floorList" :key="f.id" :list = 'f'/>
      <!-- <Floor/> -->
      <Brand/>
  </div>
</template>


<script>
import ListContainer from './list-container/List-container'
import Recommend from './recommend/today-recommend'
import Rank from './rank/The-rank.vue'
import Like from './TheLike/The-Like.vue'
import Floor from './Floor/The-floor.vue'
import Brand from './brand/The-brand.vue'
import {mapState} from 'vuex'

export default {
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    //派发action，获取floor数据
    this.$store.dispatch('getFloorList')
  },
  computed:{
    ...mapState({
      floorList: (state) => state.home.floorList
    })
  }
}
</script>

<style>

</style>