import Vue from 'vue'
import App from './App.vue'
import router from './router'
import resource from 'vue-resource'
import Vue2Touch from 'vue2-touch'
import VueObserveVisibility from 'vue-observe-visibility'


// import './../node_modules/jquery/dist/jquery.min.js';
// import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './../node_modules/tachyons/css/tachyons.css';
// import '@/assets/styles.css';


import { Plugins } from '@capacitor/core';
import { platform } from 'os';
const { SplashScreen } = Plugins;
if(platform() != "browser") {
  SplashScreen.hide();
}

export const filters = {
  ALL: 'all',
  SIX_HUNDRED: '600 points',
  FOUR_HUNDRED: 'Major Zones',
  TWO_HUNDRED: '200 points',
  ONE_HUNDRED: '100 points',
  OTHER: 'other',
  CUSTOM: 'custom',
  FAVORITES: 'favorites'
}

Vue.config.ignoredElements = [/^ion-/]

Vue.config.productionTip = false
Vue.use(resource)
Vue.use(Vue2Touch)
Vue.use(VueObserveVisibility)

// Create a global message bus for passing messages between peer components and views
export const messageBus = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
