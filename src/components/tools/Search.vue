<template lang="html">
  <transition name="fade">
<div class="header-search" v-show="needfloatbanner">
  <input v-model="inputmsg">
</div>
  </transition>
</template>

<script>

import { mapState } from "vuex";

export default {
  data(){
    return{
      needfloatbanner : false,

    }
  },
  props:[
    'msg','inputmsg'
  ],
  mounted(){
    window.addEventListener('scroll',this.handleCount)

  },
  destroyed () {
  window.removeEventListener('scroll', this.handleCount)
},
  methods:{
    handleCount(){
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      console.log(scrollTop);
      if(scrollTop >= 100){
      this.needfloatbanner = true;
    }else{
      this.needfloatbanner = false;
    }
    }
  }
};
</script>
<style lang="less">
.header-search{
  width: 100%;
  left: 0;
  top: 0;
  height: 51px;
  background: blue;
  position: fixed;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
