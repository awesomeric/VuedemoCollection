<template>
<div id="bg-content">
</div>
</template>
 <script>
 import Pjs from "./particles"
  export default {

    data() {
      return {
        isHide: false,
        cavsNode: '',
        balls: [],
        context: ''
      }
    },
    created() {

    },
    mounted() {
      new Pjs({
      canvasContainerID:"bg-content",
      circleColor:"#62B587",
      canvasOpacity:0.8
      });
    },
    methods: {

    }
  }
</script>

<style lang="less" scoped>
@vue-green: #62B587;
.bg-content {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: yellow;
    #mycanvas {
        width: 100%;
        height: 100%;
    }
}
</style>
