<template>
<ion-app>
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>
      The Traveling Circus | Draws
    </ion-title>
        <ion-buttons slot="start">
          <ion-button @click="goBack()">
            <ion-icon name="arrow-back" style="font-size: 25px;"></ion-icon>
          </ion-button>
        </ion-buttons>
        <!-- <ion-buttons slot="end">
          <ion-button @click="this.$parent.openMainMenu">
            <ion-icon name="md-menu" style="font-size: 25px;"></ion-icon>
          </ion-button>
        </ion-buttons> -->
  </ion-toolbar>
</ion-header>
<ion-content padding>

  <!-- <ion-button @click="goBack()" full>Go Back!</ion-button> -->

  
  <div v-for="(item, index) in this.$parent.selected.drawCategories" :key="item">
    <button @click="selectionMade(item, index)">
      <ion-label>
        <strong>{{ item }}, {{ index }}</strong>
      </ion-label>
    </button>
  </div>
  

</ion-content>
</ion-app>
</template>

<script>
export default {
  name: 'DrawNav',
  data () {
    return {
    
    }
  }, // end data
  methods: {
    goBackHome () {
      this.$router.push('/')
    }, // end go back home
    goBack () {
      this.$router.go(-1); // navigate back one screen
    },
    selectionMade(item, index) {
      console.log("picked item: ", item, index)
      let url = this.$parent.selected.url + '#&&s=7' + 'Draws' + (index +2);
      console.log("launching draw URL: ", url)
      open(url, '_blank');      
    } // end selectionMade
  },  // end methods
  created: function() {
    console.log("Creating DrawNav for t.ID=", this.$route.params.id, this.$parent.selected.ID, this.$parent.tournaments.length);

  } // end created
}
</script>