<template>
<ion-app>
<ion-header>
  <ion-toolbar color="primary">
    <ion-title v-show="!search">
      Draws
    </ion-title>
    
    <ion-buttons slot="start">
      <ion-button @click="goBack()">
        <ion-icon name="arrow-back" style="font-size: 25px;"></ion-icon>
      </ion-button>
    </ion-buttons>

    <ion-buttons slot="end" v-show="!search">
      <ion-button @click="search = !search">
        <ion-icon id="search-icon" name="md-search"  style="font-size: 25px;"></ion-icon>
      </ion-button>
    </ion-buttons>

    <ion-searchbar id="searchBar" v-show="search" 
      v-model="searchText" 
      @ionInput="keyUpSearchText" 
      @ionBlur="hideSearchBar($event)"
      placeholder="Find a draw" 
      v-observe-visibility="{ callback: setSearchVisibility, throttle: 300 }"
    >
    </ion-searchbar>

  </ion-toolbar>
</ion-header>
<ion-content padding>

  <!-- <ion-button @click="goBack()" full>Go Back!</ion-button> -->

  <div>
    <center v-for="(item, index) in drawCategories" :key="item" class="pr2 mv3">
      <button @click="selectionMade(item, index)" class="br3 center w-90">
        <ion-label class="mv3">
          <!-- <strong>{{ item }}, {{ index }}</strong> -->
          <strong>{{ item }}</strong>
        </ion-label>
      </button>
    </center>
  </div>
  

</ion-content>
</ion-app>
</template>

<script>
export default {
  name: 'DrawNav',
  data () {
    return {
      search: false,
      searchText: '',
      drawCategories: []
    }
  }, // end data
  methods: {
    goBackHome () {
      this.$router.push('/')
    }, // end go back home
    goBack () {
      if(this.search) {
        this.hideSearchBar();
      } else {
        this.$router.go(-1); // navigate back one screen
      }
    },
    hideSearchBar(e) {
      console.log("hide search bar called")
      if(!this.search) {
        console.log("search already false, doing nothing")
        document.getElementById("searchBar").style.display = "none";
      } else {
        console.log("search is true, hiding anyway")
        document.getElementById("searchBar").style.display = "none";
      }
      this.searchText = ''; // reset search text, not working? 
      if(e) {   // guess we have to do this instead
        e.target.value = '';
      }
      // reset filter of draws
      this.drawCategories = this.$parent.selected.drawCategories;
    },
    setSearchVisibility(visible) {
      console.log("setSearchVisibility called with (call, search): ", visible, this.search)
      
      if(visible) {
        // set focus, and pop up keyboard
        // Must set timeout so DOM renders before we set focus
        setTimeout(() => {
          document.getElementById("searchBar").setFocus();
          // Plugins.Keyboard.setAccessoryBarVisible({isVisible: false});
          // Plugins.Keyboard.show();
        }, 150);
      } else {
        document.getElementById("searchBar").style.display = "none";
        if(this.search) { // have to flip it if search is true but we were called to hide it, not sure why
          this.search = false;
        }
      }
    },
    keyUpSearchText(event) {

      // Reset items back to all of the items
      this.drawCategories = this.$parent.selected.drawCategories;

      //console.log(event.key);
      console.log(event.target.value);
      // set val to the value of the searchbar
      const val = event.target.value;
      // if the value is an empty string don't filter the items
      
      if (val && val.trim() != '') {
        this.drawCategories = this.$parent.selected.drawCategories.filter((item) => {
          return (
            item.toLowerCase().indexOf(val.toLowerCase()) > -1 
          ); // end return statement
        })
      }
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
    this.drawCategories = this.$parent.selected.drawCategories;
  } // end created
}
</script>