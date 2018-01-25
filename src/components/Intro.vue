<template>
<div class="intro-box">
  <div class="headline">
    介绍
  </div>
  <div class="content">
    This project is used for the guys who wants to know Vue more .
    <br />
    Also it will introduce more useful tips for using Vue's syntax.
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  }

};
</script>

<style lang="less" scoped>
@vue-green: #62B587;
.intro-box{
  position: absolute;
    left: 50%;
    margin-left: -305px;
  width: 610px;
  height: 300px;
  border: solid @vue-green 3px;
  border-radius: 4px;
}

</style>
