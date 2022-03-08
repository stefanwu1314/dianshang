<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Footer from './components/Footer/TheFooter.vue'
import Header from './components/Header/TheTop.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted() {
    //获取商品分类数据
    this.$store.dispatch("categoryList");
  },
}
</script>

