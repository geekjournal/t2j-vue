import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import License from './views/License.vue';
import TournamentDetailNav from './views/TournamentDetailNav.vue';
import DrawNav from './views/DrawNav.vue';
import Settings from '@/views/Settings.vue';
import FilterTournaments from './components/FilterTournaments.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/nav/:id',
      name: 'TournamentDetailNav',
      component: TournamentDetailNav,
    },
    { path: '/drawnav/:id', name: 'DrawNav', component: DrawNav },
    {
      path: '/filter',
      name: 'FilterTournaments',
      component: FilterTournaments,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About,
    },
    {
      path: '/license',
      name: 'license',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: License,
    },
    {
      path: '/settings',
      name: 'settings',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Settings,
    },
  ],
});
