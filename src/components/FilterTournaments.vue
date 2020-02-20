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
            <center class="pr2">
              <!-- <ion-title class="mb2">Select Filter</ion-title> -->
              <button
                @click="filter(filters.ALL)"
                class="f6 link dim ba ph3 pv2 mb2 dib black bg-light-blue w-75 br3 b"
                href="#0"
              >
                <div class="mv2">Show All</div>
              </button>
              <button
                @click="filter(filters.FAVORITES)"
                class="f6 link dim ba ph3 pv2 mb2 dib black bg-light-blue w-75 br3 b"
                href="#0"
              >
                <div class="mv2">
                  <div class="">
                    <ion-icon
                      name="star-outline"
                      style="font-size: 25px;"
                    ></ion-icon>
                  </div>
                  <div class="">Favorites</div>
                </div>
              </button>
              <button
                @click="filter(filters.FOUR_HUNDRED)"
                class="f6 link dim ba ph3 pv2 mb2 dib black bg-light-blue w-75 br3 b"
                href="#0"
              >
                <div class="mv2">400 pts<br />(Major Zones)</div>
              </button>
              <button
                @click="filter(filters.SIX_HUNDRED)"
                class="f6 link dim ba ph3 pv2 mb2 dib black bg-light-blue w-75 br3 b"
                href="#0"
              >
                <div class="mv2">600 points</div>
              </button>
              <button
                @click="filter(filters.TWO_HUNDRED)"
                class="f6 link dim ba ph3 pv2 mb2 dib black bg-light-blue w-75 br3 b"
                href="#0"
              >
                <div class="mv2">200 points</div>
              </button>
              <button
                @click="filter(filters.ONE_HUNDRED)"
                class="f6 link dim ba ph3 pv2 mb2 dib black bg-light-blue w-75 br3 b"
                href="#0"
              >
                <div class="mv2">100 points</div>
              </button>
              <button
                @click="filter(filters.OTHER)"
                class="f6 link dim ba ph3 pv2 mb2 dib black bg-light-blue w-75 br3 b"
                href="#0"
              >
                <div class="mv2">Other (?)</div>
              </button>
              <!-- <a @click="filter(filters.FAVORITES)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">Favorites</a> -->
              <!-- <a @click="filter(filters.FOUR_HUNDRED)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">400 pts (Major Zones)</a> -->
              <!-- <a @click="filter(filters.SIX_HUNDRED)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">600 points</a> -->
              <!-- <a @click="filter(filters.TWO_HUNDRED)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">200 points</a> -->
              <!-- <a @click="filter(filters.ONE_HUNDRED)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">100 points</a> -->
              <!-- <a @click="filter(filters.OTHER)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">Other (?)</a> -->
            </center>
          </div>
        </div>
      </ion-content>
    </ion-app>
  </transition>
</template>

<script>
import { messageBus } from '@/main';
import { filters } from '@/main';

export default {
  name: 'FilterTournaments',
  data() {
    return {
      filters: filters,
    };
  }, // end data
  methods: {
    goBackHome() {
      this.$router.push('/');
    }, // end go back home
    filter(f) {
      messageBus.$emit('redisplayTournamentList', f);
      this.goBackHome();
    },
  }, // end methods
};
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
  -webkit-transition: all 0.13s ease-in;
  -moz-transition: all 0.13s ease-in;
  -o-transition: all 0.13s ease-in;
  -ms-transition: all 0.13s ease-in;
  transition: all 0.13s ease-in;
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
  -webkit-transition: all 0.13s ease-out;
  -moz-transition: all 0.13s ease-out;
  -o-transition: all 0.13s ease-out;
  -ms-transition: all 0.13s ease-out;
  transition: all 0.13s ease-out;
}

.verticalCenterContainer {
  height: 10em;
  position: relative;
} /* 1 */
.verticalCenterContent {
  margin: 0;
  position: absolute; /* 2 */
  top: 50%; /* 3 */
  transform: translate(0, -50%);
} /* 4 */
</style>
