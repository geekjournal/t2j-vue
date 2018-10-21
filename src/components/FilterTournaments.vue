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
      <a @click="filterAll" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">Show All</a>
      <a @click="filter400" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">400 pts (Major Zones)</a>
      <a @click="filter600" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">600 points</a>
      <a @click="filter200" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">200 points</a>
      <a @click="filter100" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">100 points</a>
      <a @click="filterOther" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">Other (?)</a>
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
  methods: {
    goBackHome () {
      this.$router.push('/')
    }, // end go back home
    filterAll () {

      messageBus.$emit('redisplayTournamentList', filters.ALL);
      this.goBackHome();
    },
    filter400 () {
      console.log("***", filters.FOUR_HUNDRED)
      messageBus.$emit('redisplayTournamentList', filters.FOUR_HUNDRED);
      this.goBackHome();
    },
    filter600 () {
      
      messageBus.$emit('redisplayTournamentList', filters.SIX_HUNDRED);
      this.goBackHome();
    },
    filter200 () {
      
      messageBus.$emit('redisplayTournamentList', filters.TWO_HUNDRED);
      this.goBackHome();
    },
    filter100 () {
      
      messageBus.$emit('redisplayTournamentList', filters.ONE_HUNDRED);
      this.goBackHome();
    },
    filterOther () {
      
      messageBus.$emit('redisplayTournamentList', filters.OTHER);
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
   -webkit-transition: all 0.2s ease-in;
   -moz-transition: all 0.2s ease-in;
   -o-transition: all 0.2s ease-in;
   -ms-transition: all 0.2s ease-in;
   transition: all 0.2s ease-in;
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
   -webkit-transition: all 0.2s ease-out;
   -moz-transition: all 0.2s ease-out;
   -o-transition: all 0.2s ease-out;
   -ms-transition: all 0.2s ease-out;
   transition: all 0.2s ease-out;
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