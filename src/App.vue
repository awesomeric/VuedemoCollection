<template>
  <div class="main">
    <SlideMenu></SlideMenu>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import SlideMenu from "./components/common/SlideMenu"
export default {
  components:{
    SlideMenu
  },
  data() {
    return {
      menuData:{

      }
    }
  }
};
</script>

<style>
@vue-green:#62B587;
.main {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
}
body{
  margin: 0;
}
ul{
  list-style: none;
}
a{
  text-decoration: none;
  color: #000;
}
</style>
