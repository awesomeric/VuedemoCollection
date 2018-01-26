<template>
<div class="bg-content">
<canvas id="BGC"></canvas>
</div>
</template>
<script>
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
}
</style>
