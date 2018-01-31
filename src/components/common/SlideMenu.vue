<template>
<div class="slide-menu" :class="{hide:isHide}">
  <ul>

    <li class="classId">
      <router-link to="/introduction">
      <div class="context">
        简介
      </div>
      </router-link>
    </li>

    <li class="classId">
      <router-link to="/lifecycle">
      <div class="context">
        Vue2.0生命周期勾子
      </div>
      </router-link>
    </li>


  </ul>
  <div class="moveto" @click="isHide=!isHide">
    <i class="arrow"></i>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      isHide: false
    }
  }

};
</script>

<style lang="less" scoped>
@vue-green: #62B587;
.slide-menu {
    z-index: 999;
    position: fixed;
    width: 250px;
    height: 100%;
    background: @vue-green;
    transition: All 0.5s ease-in;
    &.hide {
        transition: All 1s ease;
        margin-left: -230px;
    }
    .context {
        cursor: pointer;
        background: white;
        margin-left: -29px;
        width: 230px;
        height: 30px;
        line-height: 30px;
        border-radius: 4px;
        margin-top: 10px;
        a:hover {
            color: @vue-green;
        }
    }
    .moveto {
        position: absolute;
        width: 50px;
        height: 50px;
        right: -20px;
        border: solid #62B587 3px;
        top: 48%;
        background: white;
        border-radius: 50%;
        cursor: pointer;
        transition: All 0.4s ease-in;
        &:hover {
            transform: rotate(180deg);
            transition: All 0.4s ease-in-out;
        }
        .arrow {
            display: inline-block;
            width: 32px;
            height: 32px;
            margin-top: 8px;
            background: transparent url('../../assets/arrow.png') no-repeat top;
        }
    }
}
</style>
