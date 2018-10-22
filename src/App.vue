
<template>
<!-- <div id="app"> -->
<ion-app>
   <router-view></router-view>
   <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->

<ion-menu side="start">
  <ion-header>
    <ion-toolbar color="secondary">
      <ion-title>Left Menu  
      </ion-title>
      <ion-icon name="close" @click="closeMainMenu" style="font-size: 25px;"></ion-icon>
    </ion-toolbar>
  </ion-header>
  <ion-content padding>
    <button ion-button> 
      <ion-label>START MENU CONTENTS</ion-label>
    </button>
    <ion-button shape="round" @click="goToAbout" full>About</ion-button>
    <ion-button shape="round" @click="openExternalURL('https://tennislink.usta.com/tournaments/rankings/rankinghome.aspx')" full>Ranking/Record Search</ion-button>
    <ion-button shape="round" @click="openExternalURL('https://tennislink.usta.com/leagues/reports/NTRP/FindRating.aspx')" full>Rating Search</ion-button> 
  </ion-content>
</ion-menu>



<!-- <ion-action-sheet>
</ion-action-sheet> -->

<ion-page class="show-page" main>
</ion-page>
<ion-menu-controller></ion-menu-controller> 



<!-- <ion-action-sheet-controller></ion-action-sheet-controller> -->

</ion-app>
<!-- </div> -->
</template>

// Built using the tutorial at:
// https://www.smashingmagazine.com/2018/07/mobile-apps-capacitor-vue-js/
// See docs at:
// https://ionicframework.com/docs/components
// Capacitor docs for building mobile are at:
// Follow the Developer Workflow guide to get building:
// https://capacitor.ionicframework.com/docs/basics/workflow



<script>
import App from  '@/App.vue'
import { Plugins } from '@capacitor/core';
import { ActionSheetOptionStyle } from '@capacitor/core';
import { messageBus } from '@/main'
import { filters } from '@/main'

// See docs
// https://capacitor.ionicframework.com/docs/apis/browser


export default {
  name: 'App',
  data () {
    return {
      apiURLbase: 'https://api.geekjournal.com',
      //apiURLbase: 'http://localhost:8080',
      tournaments: [],
      filteredTournaments: [],
      selected: {},
      refreshingTournaments: false,
      filter: filters.ALL
    }
  },
  methods: {
    openMainMenu() {
      console.log("openMainMenu called")
      document.querySelector('ion-menu-controller').open('start')
    },
    closeMainMenu() {
      console.log("closeMainMenu called")
      document.querySelector('ion-menu-controller').close('start')
    },
    async openActionSheet() {
      console.log("openActionSheet called");
      let promptRet = await Plugins.Modals.showActions({
        title: 'Photo Options',
        header: 'Title',
        message: 'Select an option to perform',
        options: [
          {
            title: 'Upload'
          },
          {
            title: 'Share'
          },
          {
            title: 'Remove',
            style: ActionSheetOptionStyle.Destructive
          },
          {
            title: 'Cancel',
            style: ActionSheetOptionStyle.Cancel
          }
        ]
      })
      console.log('You selected', promptRet);

    },
    goToAbout () {
      this.closeMainMenu();
      this.$router.push('about');
    }, // end goToAbout
    openExternalURL(url) {
      open(url, '_blank'); 
    },
    eventHandlerRefreshTournamentList(msg) {
      console.log("Received Refresh Tournaments EVENT: ", msg)
      this.fetchTournaments();
      document.querySelector('#home-content').style.display = "none";
    },
    eventHandlerRedisplayTournamentList (msg) {
      console.log("redisplay Tournament List called: ", msg);
      this.filter = msg;
      this.redisplayTournaments();
    },
    redisplayTournaments() {
      
      switch(this.filter) {
        case filters.SIX_HUNDRED:
          console.log("Filtering to 600")
          this.filteredTournaments = this.tournaments.filter( t => t.points == "600")
          console.log("Filtered tments: ", this.filteredTournaments);
          break;
        case filters.FOUR_HUNDRED:
          console.log("Filtering to 400")
          this.filteredTournaments = this.tournaments.filter( t => t.points == "400")
          console.log("Filtered tments: ", this.filteredTournaments);
          break;
        case filters.TWO_HUNDRED:
          console.log("Filtering to 200")
          this.filteredTournaments = this.tournaments.filter( t => t.points == "200")
          console.log("Filtered tments: ", this.filteredTournaments);
          break;
        case filters.ONE_HUNDRED:
          console.log("Filtering to 100")
          this.filteredTournaments = this.tournaments.filter( t => t.points == "100")
          console.log("Filtered tments: ", this.filteredTournaments);
          break;
        case filters.OTHER:
          console.log("Filtering to OTHER")
          this.filteredTournaments = this.tournaments.filter( t => t.points == "?")
          console.log("Filtered tments: ", this.filteredTournaments);
          break;
        case filters.ALL:
        default:
        this.filteredTournaments = this.tournaments;
          console.log("Filtering to ALL")
          break;
      } // end switch
    },
    fetchTournaments() {
      console.log("fetching touraments")
      this.$http.get(this.apiURLbase + '/tournaments')
        .then(function(response) {
          console.log(response.body)
          this.tournaments = response.body;
          this.redisplayTournaments();
        }, (response) => {
          console.log("failed to get tournaments", response.body)
        });
      //this.refreshingTournaments = false;
    },  // end fetchTournaments
    refresh() {
      console.log("refresh called");
      this.fetchTournaments();
    },
    goBack() {
      this.$router.go(-1);
    } // end goBack()
  },
  created: function() {
    document.addEventListener("backbutton", this.goBack, false);  
    
    messageBus.$on('refreshTournamentList', this.eventHandlerRefreshTournamentList);
    messageBus.$on('redisplayTournamentList', this.eventHandlerRedisplayTournamentList);
    
    this.fetchTournaments();
  },
	components: {
    App
	}
}

    // function onBackKeyDown(e) { 
    //   e.preventDefault(); 
    //   // alert('Back Button is Pressed!'); 
    //   App.goBack(); // go back one screen
    // }

</script>


<style>

</style>
