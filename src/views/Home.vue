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
  </ion-toolbar>

  <!-- Sub HEADER -->
  <div>
    <ion-button @click="this.$parent.openActionSheet" clear>
      <span style="float: middle;"><ion-icon large ios="ios-funnel" md="md-funnel" style="font-size: 25px;"></ion-icon></span>
    </ion-button>
    <ion-button @click="filterTournaments">
      <span style="float: middle;"><ion-icon name="md-list" style="font-size: 25px;"></ion-icon></span>
    </ion-button>
    <span style="float: left;"> <ion-icon name="md-search" @click="this.$parent.refresh" style="font-size: 25px;"></ion-icon>  </span>
    <!-- <span style="float: right;"> <ion-icon name="md-refresh" style="font-size: 25px;"></ion-icon>  </span> -->
    <ion-button @click="this.$parent.refresh" clear>
        <ion-icon name="md-refresh" style="font-size: 25px;"></ion-icon>
      </ion-button>
    <span class="f7 b" style="float: right;">Displaying: {{ this.$parent.tournaments.length }} tournaments</span>

    <button ion-button block @click="this.$parent.openActionSheet">
      show action sheet
    </button>
    <ion-button @click="openPopOver">
        Open Popover
    </ion-button>
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


<ion-content padding v-touch:swipe="swipeDown">

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
      <ion-item-divider color="light">Unsorted</ion-item-divider>
        
        <ion-item v-for="t in this.$parent.filteredTournaments" :key="t.ID" >
          <!-- <ion-card v-touch:swipe="swipeDown"> -->
          <ion-card>
            <div class="f4 mw-100">{{ t.name }}</div>
            <button class="f3" ion-label @click="tournamentClicked(t)">Details</button>
          </ion-card>
        </ion-item> 
    <!-- </ion-item-group> -->
  </ion-list>
  

</ion-content>
</ion-app>
</template>


<script>
import { Plugins } from '@capacitor/core';
import { messageBus } from '@/main'

export default {
  name: 'Home',
  data () {
    return {
      apiURLbase: 'https://api.geekjournal.com',
      tournaments: [],
      items: ["a", "b", "c"],
    }
  }, // end data
  methods: {
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
      this.$parent.refreshingTournaments = true;

      document.querySelector('#home-content').style.display = "block";

      // must need to send an event to refresh list
      messageBus.$emit('refreshTournamentList');
    }
  }, // end methods:
  created: function() {
    
    
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