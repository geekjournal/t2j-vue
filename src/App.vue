
<template>
<!-- <div id="app"> -->
<ion-app>
   <router-view></router-view>
   <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->

<ion-menu side="start">
  <ion-header>
    <ion-toolbar color="secondary">
      <ion-title>Circus Menu</ion-title>
      <!-- <ion-icon name="close" @click="closeMainMenu" style="font-size: 25px;"></ion-icon> -->
    </ion-toolbar>
  </ion-header>
  <ion-content padding>
    <!-- <button ion-button> 
      <ion-label>START MENU CONTENTS</ion-label>
    </button> -->
    <!-- <ion-button shape="round" @click="goToAbout" full>About</ion-button>
    <ion-button shape="round" @click="openExternalURL('https://tennislink.usta.com/tournaments/rankings/rankinghome.aspx')" full>Ranking/Record Search</ion-button>
    <ion-button shape="round" @click="openExternalURL('https://tennislink.usta.com/leagues/reports/NTRP/FindRating.aspx')" full>Rating Search</ion-button> 
    <ion-button shape="round" @click="openExternalURL('https://www.facebook.com/groups/379071872251830/')" full>Facebook Group</ion-button> 
    <ion-button shape="round" @click="removeFavoritesFromStore" full>Clear Favorites</ion-button>  -->
    
    <div class="cf pv2" @click="openExternalURL('https://tennislink.usta.com/tournaments/rankings/rankinghome.aspx')">
      <div class="fl w-20 tc">
          <ion-icon name="tennisball" style="font-size: 25px;"></ion-icon>
      </div>
      <div class="fr w-80 f4">
        Rankings/Records
      </div>
    </div>

    <div class="cf pv2" @click="openExternalURL('https://tennislink.usta.com/leagues/reports/NTRP/FindRating.aspx')">
      <div class="fl w-20 tc">
          <ion-icon name="search" style="font-size: 25px;"></ion-icon>
      </div>
      <div class="fr w-80 f4">
        Ratings Search
      </div>
    </div>

    <div class="cf pv2" @click="openExternalURL(ustaSearchSite)">
      <div class="fl w-20 tc">
          <ion-icon name="square-outline" style="font-size: 25px;"></ion-icon>
      </div>
      <div class="fr w-80 f4">
        USTA Tournaments
      </div>
    </div>

    <div class="cf pv2" @click="openExternalURL('https://www.usta.com/en/home/about-usta/who-we-are/national/officiating-rules-and-regulations.html')">
      <div class="fl w-20 tc">
          <ion-icon name="md-document" style="font-size: 25px;"></ion-icon>
      </div>
      <div class="fr w-80 f4">
        Rules of Tennis
      </div>
    </div>

    

    <div class="cf pv2 bt" @click="removeFavoritesFromStore">
      <div class="fl w-20 tc">
          <ion-icon name="star" style="font-size: 25px;"></ion-icon>
      </div>
      <div class="fr w-80 f4">
        Clear Favorites
      </div>
    </div>

    <div class="cf pv2 bt" @click="openExternalURL('https://www.facebook.com/groups/379071872251830/')">
      <div class="fl w-20 tc">
          <ion-icon name="logo-facebook" style="font-size: 25px;"></ion-icon>
      </div>
      <div class="fr w-80 f4">
        Facebook Group
      </div>
    </div>

    <div class="cf pv2 bt" @click="goToAbout">
      <div class="fl w-20 tc">
          <ion-icon name="information-circle" style="font-size: 25px;"></ion-icon>
      </div>
      <div class="fr w-80 f4">
        About
      </div>
    </div>

    <div class="cf pv2 bt" @click="goToSettings">
      <div class="fl w-20 tc">
          <ion-icon name="settings" style="font-size: 25px;"></ion-icon>
      </div>
      <div class="fr w-80 f4">
        Settings
      </div>
    </div>

<!-- Only works on Android, not ios -->
    <!-- <div class="cf pv2 bt" @click="exitApp()">
      <div class="fl w-20 tc">
          <ion-icon name="power" style="font-size: 25px;"></ion-icon>
      </div>
      <div class="fr w-80 f4">
        Exit App
      </div>
    </div> -->

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
//import { vm } from '@/main'

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
      filter: filters.ALL,
      favorites: [],
    }
  },
  methods: {
    exitApp() {
      Plugins.App.exitApp();
    },
    openMainMenu() {
      console.log("openMainMenu called")
      document.querySelector('ion-menu-controller').open('start')
    },
    closeMainMenu() {
      console.log("closeMainMenu called")
      document.querySelector('ion-menu-controller').close('start')
    },
    async removeFavoritesFromStore() {
      // TODO: add an are you sure?
      await Plugins.Storage.remove({ key: 'favorites' });
      this.favorites = [];
      //vm.$set(this.tournaments, this.tournaments)
      // :key="someVariableUnderYourControl"

      //this.redisplayTournaments();
      this.closeMainMenu();
    },
    async openActionSheet() {
      console.log("openActionSheet called");
      let promptRet = await Plugins.Modals.showActions({
        title: 'Photo Options',
        header: 'Title',
        message: 'Select an option to perform',
        options: [
          {title: 'Upload'},
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
      this.closeMainMenu();
    },
    goToSettings () {

    },
    eventHandlerRefreshTournamentList(msg) {
      console.log("Received Refresh Tournaments EVENT: ", msg)
      this.fetchTournaments();
      this.refreshingTournaments = false;
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
        case filters.FAVORITES:
          this.filteredTournaments = this.tournaments.filter( t => this.favorites.indexOf(t.ID) > -1 ? true : false ); 
          break;
        case filters.ALL:
        default:
        this.filteredTournaments = this.tournaments;
          console.log("Filtering to ALL")
          break;
      } // end switch

      // store in localStorage
      this.storeTournamentFilter();
    },
    async storeTournamentFilter() {
      console.log("Storing tournament filter: ", this.filter);
      await Plugins.Storage.set({
        key: 'filter',
        value: this.filter.toString()
      });
    },
    async getTournamentFilter() {
      console.log("Loading filter from store");
      const f = await Plugins.Storage.get({ key: 'filter' });
      let s = Object.values(f); 
      if(s.length > 0) {
        this.filter = s[0]
      }
      
      console.log("filter: ", this.filter)
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
    
    this.getTournamentFilter();
    this.fetchTournaments();
  },
	components: {
    App
  },
  computed: {
    ustaSearchSite () {
      let today = new Date();
      let month = today.getMonth() + 1;  // month returns as zero based indexing, we need January to start at 1, not zero
      let year = today.getFullYear();
      console.log("Date, Month and year: ", today, month, year)
      let urlStart = 'https://m.tennislink.usta.com/TournamentSearch/searchresults.aspx?typeofsubmit=&action=2&keywords=&tournamentid=&sectiondistrict=8096&city=&state=TX&zip=&month=';
      let urlMiddle = '&startdate=&enddate=&day=&year=';
      let urlEnd = '&division=D5115&category=&surface=&onlineentry=&drawssheets=&usertime=&sanctioned=-1&agegroup=A&searchradius=-1';
      let url = urlStart + month + urlMiddle + year + urlEnd;
      return url;
    }
  } // end computed
}

    // function onBackKeyDown(e) { 
    //   e.preventDefault(); 
    //   // alert('Back Button is Pressed!'); 
    //   App.goBack(); // go back one screen
    // }

</script>


<style>

</style>
