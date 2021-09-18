<template>
  <div id="app">
    <header-cpt v-if="hideHeader" />
    <router-view class="router-body" />
  </div>
</template>

<script>
import HeaderCpt from "./components/layout/header-cpt";

export default {
  name: "App",
  data(){
    return{
      hideHeader:true,
    }
  },
  components: {
    HeaderCpt
  },
  watch:{
    '$route'(to,from){
      if(to.meta.hideHeader){
        this.hideHeader = true;
      }else{
        this.hideHeader = false;
      }
    },
  }
};
</script>

<style lang="scss">
#app {
  font-family:sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .router-body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
  }
}
</style>
