import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import count from '@/components/count';
import Main from '@/components/Main'
import Intro from '@/components/Intro'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/vuex',
      name: 'count',
      component: count,
    },
    {
      path: '/fixedbanner',
      name: 'Main',
      component: Main,
    },
    {
      path: '/introduction',
      name: 'Intro',
      component: Intro,
    }

  ],
});
