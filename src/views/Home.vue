<template>
<ion-app>


<!-- Main HEADER -->
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
     The Traveling Circus
    </ion-title>
    
    <ion-buttons slot="start">
      <ion-button @click="this.$parent.openMainMenu">
        <ion-icon name="md-menu" style="font-size: 25px;"></ion-icon>
      </ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button @click="filterTournaments">
        <ion-icon name="md-funnel" style="font-size: 25px;"></ion-icon>
      </ion-button>
      <!-- <ion-button @click="setSearchVisibility()"> -->
      <ion-button @click="search = !search">
        <ion-icon id="search-icon" name="md-search"  style="font-size: 25px;"></ion-icon>
      </ion-button>
    </ion-buttons>
  </ion-toolbar>

   <ion-searchbar id="searchBar" v-show="search" 
      v-model="searchText" 
      @ionInput="keyUpSearchText" 
      @ionBlur="setSearchVisibility(false)"
      placeholder="Filter tournaments" 
      v-observe-visibility="{ callback: setSearchVisibility, throttle: 300 }"
    >
   </ion-searchbar>

   

  <!-- Sub HEADER -->
  <div>
    <!-- <ion-button @click="this.$parent.openActionSheet" clear>
      <span style="float: middle;"><ion-icon large ios="ios-funnel" md="md-funnel" style="font-size: 25px;"></ion-icon></span>
    </ion-button> -->
    
    <!-- <span style="float: left;"> <ion-icon name="md-search" @click="search = !search" style="font-size: 25px;"></ion-icon>  </span> -->
    
    <!-- <span style="float: right;"> <ion-icon name="md-refresh" style="font-size: 25px;"></ion-icon>  </span> -->
    
    <!-- <ion-button @click="this.$parent.refresh" clear>
        <ion-icon name="md-refresh" style="font-size: 25px;"></ion-icon>
    </ion-button> -->
    
    <span class="f7 fl ml mh3">
      Showing: {{ this.$parent.filteredTournaments.length }} of {{ this.$parent.tournaments.length }}
    </span>
    <span class="f7 fr mh3">
      Filter: {{ this.$parent.filter }}
    </span>

    <!-- <button ion-button block @click="this.$parent.openActionSheet">
      show action sheet
    </button>
    <ion-button @click="openPopOver">
        Open Popover
    </ion-button> -->
  </div>


  <!-- PopOvers, STORE in HEADER  -->
  <div id="mainPopOver" class="popover" style="display: none;">
    <div class="popover-content">
      <center>
    <!-- <ion-list id="popOverList">
        <ion-list-header id="PopOverListHeader">Ionic</ion-list-header>
        <button id="popOverCloseButton" ion-item @click="closePopOver($event)">Close Popover</button>
        <button ion-item>Documentation</button>
      </ion-list> -->
      
      <!-- <span id="secondPopOverCloseButton" class="close" @click="closePopOver($event)">&times;</span> -->
      <!-- <ion-button class="popover-button w-100" block outline>Outline + Block</ion-button> -->
      <ion-title class="mb2">Select Filter</ion-title>
      <a id="idPopOverShowAll" @click="closePopOver($event)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">Show All</a>
      <a id="idPopOverShowMZ" @click="closePopOver($event)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">400 pts (Major Zones)</a>
      <a id="idPopOverShow600" @click="closePopOver($event)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">600 points</a>
      <a id="idPopOverShow200" @click="closePopOver($event)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">200 points</a>
      <a id="idPopOverShow100" @click="closePopOver($event)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">100 points</a>
      <a id="idPopOverShowOther" @click="closePopOver($event)" class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3" href="#0">Other (?)</a>
      <!-- <a class="f6 link dim ph3 pv2 mb2 dib black bg-white w-100 br3" href="#0">Button Text</a> -->
      <!-- <div class="w-100 bb mv2"></div> -->
      <ion-button class="popover-button" @click="closePopOver($event)">Cancel</ion-button>
      
      </center>
    </div>
  </div>

<!-- END Main HEADER -->
</ion-header>

  <!-- <ion-searchbar v-if="search" 
    v-model="searchText" 
    @ionInput="keyUpSearchText" 
    @ionBlur="search = false"
    placeholder="Filter tournaments">
  </ion-searchbar> -->
  

<ion-content padding v-touch:swipe="swipeDown">
  <ion-refresher @ionRefresh="doRefresh($event)" @ionPull="pullingRefresh($event)">
    <!-- <ion-refresher-content> </ion-refresher-content> -->
    <!-- <ion-refresher-content
      pullingIcon="arrow-dropdown" 
      pullingText="Pull to refresh" 
      refreshingSpinner="circles" 
      refreshingText="Refreshing...">
    </ion-refresher-content> -->
    <div id="puller">pull down to refresh</div>
  </ion-refresher>

  <!-- <div v-if="this.$parent.refreshingTournaments"><center>Refreshing Tournaments List</center></div> -->
  <div style="display: none;" id="home-content"><center>Refreshing Tournaments List</center></div>
  <!-- <p>If you get lost, the <a href="https://ionicframework.com/docs">docs</a> will be your guide.</p> -->
  
  <!-- <ion-button @click="showDialogAlert" full>Show Alert Box</ion-button>
  <ion-button v-on:click="showDialogAlert" full>Show Alert Box</ion-button> -->

  <!-- <ion-item-group  v-for="t in this.$parent.tournaments.items" :key="t.ID">
    <ion-item-divider color="light">A</ion-item-divider>
      <ion-item>Angola</ion-item>
      <ion-item>Argentina</ion-item>
    <ion-item-divider color="light">A</ion-item-divider>
      <ion-item>Angola</ion-item>
  
   <ion-item>
     {{ t.name }}
   </ion-item>
  </ion-item-group>

   <div v-for="t in this.$parent.tournaments.items" :key="t.ID">
     {{ t.name }}
   </div>
   -->
   
  <ion-list v-if="tournaments.length > -1">
    <!-- <ion-item-group> -->   
      <!-- <ion-item-divider color="light">
        <span class="f7 b fl ml mh3">
          Showing: {{ this.$parent.filteredTournaments.length }} of {{ this.$parent.tournaments.length }}
        </span>
        <span class="f7 b fr mh3">
          Filter: {{ this.$parent.filter }}
        </span>
      </ion-item-divider> -->
        
        <!-- <ion-item v-for="t in this.$parent.filteredTournaments" :key="t.ID"> -->
          <!-- <ion-card v-touch:swipe="swipeDown"> -->
          <ion-card class="cf" v-for="t in this.$parent.filteredTournaments" :key="t.ID">
            
            <div class="fl w-90 bg-white mv1" @click="tournamentClicked(t)">
              <span class="f6 b mw-80">{{ t.name }}</span>
              <br />
              {{ t.date }} - {{ t.city }}
            </div>
            <div class="fr w-10 bg-near-white tc mv1">
              <ion-icon v-if="!isFavorite(t.ID)" @click="addFavorite(t.ID)" name="star-outline" style="font-size: 25px;"></ion-icon>
              <ion-icon v-if="isFavorite(t.ID)" @click="removeFavorite(t.ID)" name="star" style="font-size: 25px;"></ion-icon> 
              <br /> {{t.points}}
            </div>
            
            <!-- <span class="f5 b mw-80">{{ t.name }}</span>
            <button class="f3" ion-label @click="tournamentClicked(t)">Details</button> -->
          </ion-card>
        <!-- </ion-item>  -->
    <!-- </ion-item-group> -->
  </ion-list>
  

</ion-content>
</ion-app>
</template>


<script>
import { Plugins } from '@capacitor/core';
import { messageBus } from '@/main'
import { filters } from '@/main'

export default {
  name: 'Home',
  data () {
    return {
      apiURLbase: 'https://api.geekjournal.com',
      tournaments: [],
      items: ["a", "b", "c"],
      search: false,
      searchText: ''
     // favorites: []
    }
  }, // end data
  methods: {

    setSearchVisibility(visible) {
      console.log("setSearchVisibility called with: ", visible)
      
      if(visible) {
        // set focus, and pop up keyboard
        // Must set timeout so DOM renders before we set focus
        setTimeout(() => {
          document.getElementById("searchBar").setFocus();
          // Plugins.Keyboard.setAccessoryBarVisible({isVisible: false});
          // Plugins.Keyboard.show();
        }, 150);
      } else {
        document.getElementById("searchBar").display = "none";
      }
      
    },
    pullingRefresh() {
      document.querySelector('#puller').innerHTML = "<center>Pull down, release to refresh</center>"
    },
    doRefresh(refresher) {
      document.querySelector('#puller').innerHTML = "<center>Refreshing...</center>"
      console.log('Begin async operation', refresher);
      // must need to send an event to refresh list
      this.$parent.refreshingTournaments = true;
      messageBus.$emit('refreshTournamentList', 'refresh');
      refresher.target.complete();
      // setTimeout(() => {
      //   console.log('Async operation has ended');
      //   refresher.target.complete();
      // }, 2000);
      
    },
    addFavorite(ID) {
      let i = this.$parent.favorites.indexOf(ID);
      if(i > -1) {
        console.log("item found, carry on")
        return; // already exists, so carry on
      }
      console.log("not found, adding")
      this.$parent.favorites.unshift(ID)
      this.storeFavorites();
    },
    removeFavorite(ID) {
      let i = this.$parent.favorites.indexOf(ID);
      if(i  > -1) {
        console.log("Removing item")
        // item was found, remove it, and save
        this.$parent.favorites.splice(i,1);
        this.storeFavorites();
      }
    },
    isFavorite(ID) {
      return (this.$parent.favorites.indexOf(ID) > -1 ? true : false);
    },
    async storeFavorites() {
      console.log("Storing favorites: ", this.$parent.favorites.toString());
      await Plugins.Storage.set({
        key: 'favorites',
        value: this.$parent.favorites.toString()
      });
    },
    async getFavoritesFromStore() {
      console.log("Loading favorites from store");
      const favs = await Plugins.Storage.get({ key: 'favorites' });
      let s = Object.values(favs); 
      if(s.length > 0) {
        this.$parent.favorites = s[0].split(",");
      }
      console.log("favorites: ", this.$parent.favorites)
    },
    async removeFavoritesFromStore() {
      await Plugins.Storage.remove({ key: 'favorites' });
    },
    keyUpSearchText(event) {

      // Reset items back to all of the items
      this.$parent.redisplayTournaments();
      this.$parent.filter = filters.CUSTOM;

      //console.log(event.key);
      console.log(event.target.value);
      // set val to the value of the searchbar
      const val = event.target.value;
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.$parent.filteredTournaments = this.$parent.filteredTournaments.filter((item) => {
          return (
            item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
            item.points.toLowerCase().indexOf(val.toLowerCase()) > -1 || 
            item.city.toLowerCase().indexOf(val.toLowerCase()) > -1 || 
            item.date.toLowerCase().indexOf(val.toLowerCase()) > -1 || 
            item.ID.toLowerCase().indexOf(val.toLowerCase()) > -1
          ); // end return statement
        })
      }
    },
    openPopOver($event) {
      console.log("openPopOver called", $event)
      document.querySelector('#mainPopOver').style.display = 'block';
    },
    closePopOver($event) {
      console.log("closePopOver called", $event.srcElement.id)
      document.querySelector('#mainPopOver').style.display = 'none'; 
    },
    goToAbout () {
      this.$router.push('about')
    }, // end goToAbout
    openMainMenu() {
      console.log("openMainMenu called")
      document.querySelector('ion-menu-controller').open('start')
    },
    openExternalURL(url) {
      open(url, '_blank'); 
    },
    tournamentClicked(t) {
      console.log("Tournament clicked: ", t.name, t.ID)
      this.$parent.selected = t;
      this.$router.push("/nav/" + t.ID)
    },
    filterTournaments() {
      console.log("Filter tournaments clicked")
      this.$router.push("/filter")
    },
    async showDialogAlert(){
      console.log("Enter showDialog");
      await Plugins.Modals.alert({
          title: 'Alert',
          message: 'This is an example alert box'
      });
    }, // showDialogAlert
    fetchTournaments() {
      console.log("fetching touraments")
      this.$http.get(this.apiURLbase + '/tournaments')
        .then(function(response) {
          console.log(response.body)
          this.tournaments = response.body;
          console.log("Tournaments Length ", this.tournaments.length)
        }, (response) => {
          console.log("failed to get tournaments", response.body)
        });
    },  // end fetchTournaments    
    swipeDown(swipeDirection) {
      console.log("Swipe down called:", swipeDirection)
      // this.$parent.refreshingTournaments = true;

      // document.querySelector('#home-content').style.display = "block";

      // must need to send an event to refresh list
      // messageBus.$emit('refreshTournamentList', 'refresh');
    }
  }, // end methods:
  created: function() {
    this.getFavoritesFromStore();
  }, // end created:
  updated: function() {
    
  },
  components: {

  }
}    
</script>

<style>

  /* The Modal (background) */
  .popover {
      display: none; /* Hidden by default */
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .popover-content {
      background-color: #fefefe;
      margin: 15% auto; /* 15% from the top and centered */
      margin-top: 30%;
      padding: 20px;
      border: 1px solid #888;
      width: 80%; /* Could be more or less, depending on screen size */
      border-radius: 15px;
  }

  /* The Close Button */
  .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
  }

  .close:hover,
  .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
  }

</style>