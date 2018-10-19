<template>
<ion-app>



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


  <div>
    <ion-button @click="this.$parent.openActionSheet" clear>
      <span style="float: middle;"><ion-icon large ios="ios-funnel" md="md-funnel" style="font-size: 25px;"></ion-icon></span>
    </ion-button>
    <span style="float: middle;"><ion-icon name="md-list" style="font-size: 25px;"></ion-icon></span>
    <span style="float: left;"> <ion-icon name="md-search" @click="this.$parent.refresh" style="font-size: 25px;"></ion-icon>  </span>
    <!-- <span style="float: right;"> <ion-icon name="md-refresh" style="font-size: 25px;"></ion-icon>  </span> -->
    <ion-button @click="this.$parent.refresh" clear>
        <ion-icon name="md-refresh" style="font-size: 25px;"></ion-icon>
      </ion-button>
    <span class="f7 b" style="float: right;">Displaying: {{ this.$parent.tournaments.length }} tournaments</span>

    <button ion-button block @click="this.$parent.openActionSheet">show action sheet</button>
  </div>

<!-- <ion-navbar>
    <ion-buttons start>
      <button ion-button icon-only>
        <ion-icon name="contact"></ion-icon>
        Left icon
      </button>
    </ion-buttons>

    <ion-buttons end>
      <button ion-button icon-only>
        Right icon
        <ion-icon name="search"></ion-icon>
      </button>
    </ion-buttons>
</ion-navbar> -->

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
        
        <ion-item v-for="t in this.$parent.tournaments" :key="t.ID" >
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
      items: ["a", "b", "c"]
    }
  }, // end data
  methods: {
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

      // must need to send an event
      messageBus.$emit('refreshTournamentList');
    }
  }, // end methods:
  created: function() {
    //this.fetchTournaments();
  }, // end created:
  updated: function() {
    
  },
  components: {

  }
}
</script>