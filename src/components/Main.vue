<template lang="html">
  <div class="contain">
    <div class="testzoom">
    <p>
      computed way
    </p>
    {{ reverseMessage }}
      </div>
      <div class="testzoom">
    <p>
      methods way
    </p>
    {{ reverseMessagemethods()}}
    </div>
    <span class="white">send to child component</span><input v-model="inputmsg" />
    <br />
    <span>second input</span>
    <br />
    <span class="white">two ways of reverse</span>
    <input v-model="testData" />
    <Search :msg="string" :inputmsg="inputmsg"></Search>
    <router-link :to="{ path: 'register', query: { plan: 'private' }}">HelloWorld</router-link>
  </div>
</template>

<script>
import Search from "./tools/Search"
import {
  mapState
} from "vuex";

export default {
  data() {
    return {
      string: "zyh",
      inputmsg: '',
      testData: 'tangyucan',
      url:'/vuex'
    }
  },
  methods: {
    reverseMessagemethods() {
      return this.testData.split('').reverse().join('');
    }
  },
  computed: {
    reverseMessage() {
      return this.testData.split('').reverse().join('');
    }
  },
  components: {
    Search
  }
};
</script>
<style lang="less" scoped>
.contain {
    left: 50%;
    text-align: center;
    background: green;
    height: 2000px;
    width: 980px;
    margin: 0 auto 0 -490px;
    position: absolute;
}
.testzoom {
    margin: 10px auto;
    background: white;
    height: 100px;
    width: 50%;
}
.white {
    color: white;
    font-size: 16px;
    font-weight: bold;
}
</style>
