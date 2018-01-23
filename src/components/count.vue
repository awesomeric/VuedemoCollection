<template>
      <div>
          <h2>{{msg}}</h2>
          <hr/>
          <h3>{{$store.state.count}}</h3>
          <h4 v-model='str'>{{ str}}</h4>
          <button @click="$store.commit('add',12)">+</button>
        <button @click="$store.commit('reduce')">-</button>

      </div>
  </template>
  <script>
  import store from '@/store/store'
      export default{
          data(){
              return{
                  msg:'Hello Vuex',
                  str:'tangyucan'

              }
          },
          store,


      }
  </script>