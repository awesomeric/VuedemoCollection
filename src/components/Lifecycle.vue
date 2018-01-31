
<template>
<div class="intro-box">
  <div class="headline">
    <span>生命周期图解</span>
  </div>
  <div class="content">
    <p>Vue的生命周期对于新手来说比较难缠，一句话，如何在正确的勾子下面做正确的事情
    </p>
  </div>
  <div class="headline">
    <span>为何要有勾子？</span>
  </div>
  <div class="content">
    <p>每个 Vue 实例在被创建之前都要经过一系列的初始化过程。在这个过程中， Vue 实例会调用一些生命周期钩子 ，给开发者提供执行自定义逻辑的机会。在Vue 2.0中，生命周期钩子相比之前的版本发生了很大的变化。
    </p>
    <p class="extend">
      请看下图
    </p>
    下面我用这个组件来说明各个数据在不同勾子函数下的状态
  </div>
  <div class="timeline">
    <div class="state-item" v-for="state in VueState">
      <span class="line-between"></span>
      {{state}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      VueState: ['beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'beforeDestroy', 'destroyed']
    }
  }

};
</script>

<style lang="less" scoped>
@vue-green: #62B587;
.intro-box {
    background: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: absolute;
    left: 50%;
    margin-left: -400px;
    width: 800px;
    border: solid @vue-green 3px;
    border-radius: 4px;
    .headline {
        line-height: 40px;
        width: 200px;
        height: 40px;
        border-bottom: solid @vue-green 2px;
    }
    .content {
        margin-top: 20px;

    }
    .timeline{
      .state-item{
        display: inline-block;
        width: 150px;
        .line-between{
          
        }
      }
    }
}
</style>
