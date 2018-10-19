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
<ion-content padding>

  <!-- <ion-button @click="goBackHome()" full>Go Back!</ion-button> -->

  
  <div v-for="item in this.$parent.selected.mainContent" :key="item">
    
      <button @click="selectionMade(item)">
        <ion-label>
          <strong>{{ item }}</strong>
        </ion-label>
      </button>
    
  </div>
  

</ion-content>
</ion-app>
</template>

<script>
export default {
  name: 'TournamentDetaillNav',
  data () {
    return {
    
    }
  }, // end data
  methods: {
    goBackHome () {
      this.$router.push('/')
    }, // end go back home
    selectionMade(item) {
      console.log("picked item: ", item)
      let url = this.$parent.selected.url;
      switch(item) {
        case 'Important Info':
          console.log("url to route to: ", url + '#&&s=0')
          open(url + '#&&s=0', '_blank');
          //this.$router.push(this.$parent.selected.url + '#&&s=0')
          break;
        case 'Applicants':
          console.log("url to route to: ", url + '#&&s=1')
          open(url + '#&&s=1', '_blank');
          break;
        case 'Competitors':
          console.log("url to route to: ", url + '#&&s=5')
          open(url + '#&&s=5', '_blank');
          break;
        case 'Seeds':
          console.log("url to route to: ", url + '#&&s=6')
          open(url + '#&&s=6', '_blank');
          break;
        case 'Draws':
          console.log("url to route to: ", url + '#&&s=7')
          //open(url + '#&&s=7', '_blank');
          this.$router.push("/drawnav/" + this.$parent.selected.ID)
          break;
        case 'Results':
          console.log("url to route to: ", url + '#&&s=8Results0')
          open(url + '#&&s=8Results0', '_blank');
          break;
        default: 
          break;
      } // end switch

    } // end selectionMade
  },  // end methods
  created: function() {
    console.log("Creating NAV for t.ID=", this.$route.params.id, this.$parent.selected.ID, this.$parent.tournaments.length);

  } // end created
}
</script>