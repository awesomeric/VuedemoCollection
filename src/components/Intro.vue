<template>
<div class="intro-box">
  <div class="headline">
    <span>介绍</span>
  </div>
  <div class="content">
    <p>
      This project is used for the guys who wants to know Vue more.
    </p>
    <p>
      Also it will introduce more useful tips for using Vue's syntax.
    </p>
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
.intro-box {
    display: flex;
    justify-content: center;
    flex-direction:column;
    align-items: center;
    position: absolute;
    left: 50%;
    margin-left: -305px;
    width: 610px;
    height: 300px;
    border: solid @vue-green 3px;
    border-radius: 4px;
    .headline {
        width: 200px;
        height: 40px;
        border-bottom: solid @vue-green 2px;
    }
    .content{
      margin-top: 20px;

    }
}
</style>
