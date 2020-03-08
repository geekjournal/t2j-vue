<template>
  <ion-app>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          The Traveling Circus | Detail
        </ion-title>
        <!-- <ion-buttons slot="end">
      <ion-button @click="this.$parent.openMainMenu">
        <ion-icon name="md-menu" style="font-size: 25px;"></ion-icon>
      </ion-button>
    </ion-buttons> -->
        <ion-buttons slot="start">
          <ion-button @click="goBackHome()">
            <ion-icon name="arrow-back" style="font-size: 25px;"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <!-- <ion-content padding class="verticalCenterContainer"> -->
    <ion-content padding>
      <!-- <ion-button @click="goBackHome()" full>Go Back!</ion-button> -->

      <!-- <div class="verticalCenterContent w-100"> -->
      <div class="w-100">
        <div>
          <center
            v-for="item in this.$parent.selected.mainContent"
            :key="item"
            class="pr2 mv3"
          >
            <button @click="selectionMade(item)" class="br3 center w-90">
              <ion-label class="mv3" style="white-space: normal;">
                <strong>{{ item }}</strong>
              </ion-label>
            </button>
          </center>
        </div>
      </div>
    </ion-content>
  </ion-app>
</template>

<script>
import { Plugins } from '@capacitor/core';

export default {
  name: 'TournamentDetaillNav',
  metaInfo: {
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=3.0, minimum-scale=0.5, user-scalable=yes',
      },
    ],
  },
  data() {
    return {};
  }, // end data
  methods: {
    goBackHome() {
      this.$router.push('/');
    }, // end go back home
    selectionMade(item) {
      console.log('picked item: ', item);
      let url = this.$parent.selected.url;
      switch (item) {
        case 'Important Info':
          console.log('url to route to: ', url + '#&&s=0');
          open(url + '#&&s=0', '_blank');
          //this.$router.push(this.$parent.selected.url + '#&&s=0')
          break;
        case 'Applicants':
          console.log('url to route to: ', url + '#&&s=1');
          open(url + '#&&s=1', '_blank');
          break;
        case 'Players':
          console.log('url to route to: ', url + '#&&s=2');
          open(url + '#&&s=2', '_blank');
          break;
        case 'Alternates':
          console.log('url to route to: ', url + '#&&s=3');
          open(url + '#&&s=3', '_blank');
          break;
        case 'Competitors':
          console.log('url to route to: ', url + '#&&s=5');
          open(url + '#&&s=5', '_blank');
          break;
        case 'Seeds':
          console.log('url to route to: ', url + '#&&s=6');
          open(url + '#&&s=6', '_blank');
          break;
        case 'Draws':
          console.log('url to route to: ', url + '#&&s=7');
          //open(url + '#&&s=7', '_blank');
          this.$router.push('/drawnav/' + this.$parent.selected.ID);
          break;
        case 'Results':
          console.log('url to route to: ', url + '#&&s=8Results0');
          open(url + '#&&s=8Results0', '_blank');
          break;
        default:
          this.showDialogAlert('No implementation defined');
          break;
      } // end switch
    }, // end selectionMade
    async showDialogAlert(msg) {
      console.log('Enter showDialog');
      await Plugins.Modals.alert({
        title: 'Alert',
        message: msg,
      });
    }, // showDialogAlert
  }, // end methods
  created: function() {
    console.log(
      'Creating NAV for t.ID=',
      this.$route.params.id,
      this.$parent.selected.ID,
      this.$parent.tournaments.length
    );
  }, // end created
};
</script>

<style>
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
