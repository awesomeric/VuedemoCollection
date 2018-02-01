<template>
  <div class="main">
    <BGcanvas></BGcanvas>
    <SlideMenu></SlideMenu>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import SlideMenu from "./components/common/SlideMenu"
import BGcanvas from "./components/common/BGcanvas"


export default {
  components:{
    SlideMenu,
    BGcanvas
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
html,body{
  height: 100%;
  margin: 0;
}
ul{
  list-style: none;
}
a{
  text-decoration: none;
  color: #000;
}
p{
  margin: 0;
}
</style>
