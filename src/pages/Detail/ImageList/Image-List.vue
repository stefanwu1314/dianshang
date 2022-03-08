<template>
  <div class="swiper-container">
    <el-carousel :autoplay="false" :loop="false" trigger="click" type="card" height="100px">
      <el-carousel-item v-for="(img,index) in skuImageList" :key="img.id">
        <img :src="img.imgUrl" @click="changeImg(index)"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: ["skuImageList"],
  data() {
    return {
      currentIndex:0
    }
  },
  methods:{
    changeImg(index){
      this.currentIndex = index
      this.$bus.$emit('changeImg',this.currentIndex)
    }
  }
};
</script>

<style scoped>
.el-carousel {
  position: relative;
}
.el-carousel__item {
  position: absolute;
  width: 25%;
  margin-left: 50px;
}.el-carousel__item:hover{
  
  border: solid 1px skyblue;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
  position: absolute;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
