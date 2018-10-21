<template>
<transition name="filter-tournaments">
<ion-app>
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      <center>Filter Tournament List</center>
    </ion-title>
    <ion-buttons slot="end">
      <ion-button @click="goBackHome()">
        <ion-icon name="close" style="font-size: 25px;"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content padding class="verticalCenterContainer">

  <div class="verticalCenterContent">
    <div>
      <center>
      <ion-title class="mb2">Select Filter</ion-title>
      <a @click="filter(filters.ALL)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">Show All</a>
      <a @click="filter(filters.FOUR_HUNDRED)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">400 pts (Major Zones)</a>
      <a @click="filter(filters.SIX_HUNDRED)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">600 points</a>
      <a @click="filter(filters.TWO_HUNDRED)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">200 points</a>
      <a @click="filter(filters.ONE_HUNDRED)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">100 points</a>
      <a @click="filter(filters.OTHER)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">Other (?)</a>
      </center>
    </div>
  </div>

</ion-content>
</ion-app>
</transition>
</template>

<script>

import { messageBus } from '@/main'
import { filters } from '@/main'

export default {
  name: 'FilterTournaments',
  data () {
    return {
      filters: filters
    }
  }, // end data
  methods: {
    goBackHome () {
      this.$router.push('/')
    }, // end go back home
    filter (f) {
      messageBus.$emit('redisplayTournamentList', f);
      this.goBackHome();
    }
  }  // end methods
}
</script>

<style>
.filter-tournaments-enter {
  /* opacity: 0;
  transform: rotateY(50deg); */

  overflow: hidden;
  top: 100%;
  left: 0;
}

/* .filter-tournaments-enter-to {
  opacity: 1;
  transform: rotateY(0deg);
} */
.filter-tournaments-enter-active {
  /* transition: opacity, transform 400ms ease-in; */
   -webkit-transition: all 0.3s ease-in;
   -moz-transition: all 0.3s ease-in;
   -o-transition: all 0.3s ease-in;
   -ms-transition: all 0.3s ease-in;
   transition: all 0.3s ease-in;
}

.filter-tournaments-leave-to {
  /* opacity: 0;
  transform: rotateY(50deg); */

  overflow: hidden;
  top: 100%;
  left: 0;
}

.filter-tournaments-leave-active {
  /* transition: opacity, transform 400ms ease-in; */
   -webkit-transition: all 0.3s ease-out;
   -moz-transition: all 0.3s ease-out;
   -o-transition: all 0.3s ease-out;
   -ms-transition: all 0.3s ease-out;
   transition: all 0.3s ease-out;
}

.verticalCenterContainer {
   height: 10em;
   position: relative }              /* 1 */
.verticalCenterContent {
   margin: 0;
   position: absolute;               /* 2 */
   top: 50%;                         /* 3 */
   transform: translate(0, -50%) }   /* 4 */
</style>