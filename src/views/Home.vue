<template>
  <ion-app>
    <!-- Main HEADER -->
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title v-show="!search">
          {{ appTitle }}
        </ion-title>

        <ion-buttons slot="start" v-show="search">
          <ion-button @click="hideSearchBar(null)" bg-white>
            <ion-icon name="arrow-back" style="font-size: 25px;"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="start" v-show="!search">
          <ion-button @click="this.$parent.openMainMenu">
            <ion-icon name="md-menu" style="font-size: 25px;"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end" v-show="!search">
          <ion-button @click="filterTournaments">
            <ion-icon name="md-funnel" style="font-size: 25px;"></ion-icon>
          </ion-button>
          <!-- <ion-button @click="setSearchVisibility()"> -->
          <ion-button @click="search = !search">
            <ion-icon
              id="search-icon"
              name="md-search"
              style="font-size: 25px;"
            ></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-searchbar
          id="searchBar"
          v-show="search"
          v-model="searchText"
          @ionInput="keyUpSearchText"
          @ionBlur="hideSearchBar($event)"
          placeholder="Filter tournaments"
          v-observe-visibility="{
            callback: setSearchVisibility,
            throttle: 300,
          }"
        >
        </ion-searchbar>
      </ion-toolbar>

      <!-- <ion-searchbar id="searchBar" v-show="search"
    v-model="searchText"
    @ionInput="keyUpSearchText"
    @ionBlur="hideSearchBar"
    placeholder="Filter tournaments"
    v-observe-visibility="{ callback: setSearchVisibility, throttle: 300 }"
  >
  </ion-searchbar> -->

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

        <span class="f7 fl ml mh3 mv1 dark-blue">
          Showing: {{ this.$parent.filteredTournaments.length }} of
          {{ this.$parent.tournaments.length }}
        </span>
        <span class="f7 fr mh3 mv1 dark-blue">
          Filter: {{ this.$parent.filter }}
        </span>

        <!-- Default Segment -->
        <ion-segment
          @ionChange="segmentChanged($event)"
          :value="this.$parent.display"
          color="medium"
        >
          <ion-segment-button value="all">
            <ion-label>All</ion-label>
          </ion-segment-button>
          <ion-segment-button value="upcoming">
            <ion-label>Upcoming</ion-label>
          </ion-segment-button>
          <ion-segment-button value="past">
            <ion-label>Past</ion-label>
          </ion-segment-button>
        </ion-segment>

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
            <a
              id="idPopOverShowAll"
              @click="closePopOver($event)"
              class="f6 link dim ba ph3 pv2 mb2 dib  w-100 br3"
              href="#0"
              >Show All</a
            >
            <a
              id="idPopOverShowMZ"
              @click="closePopOver($event)"
              class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3"
              href="#0"
              >400 pts (Major Zones)</a
            >
            <a
              id="idPopOverShow600"
              @click="closePopOver($event)"
              class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3"
              href="#0"
              >600 points</a
            >
            <a
              id="idPopOverShow200"
              @click="closePopOver($event)"
              class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3"
              href="#0"
              >200 points</a
            >
            <a
              id="idPopOverShow100"
              @click="closePopOver($event)"
              class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3"
              href="#0"
              >100 points</a
            >
            <a
              id="idPopOverShowOther"
              @click="closePopOver($event)"
              class="f6 link dim ba ph3 pv2 mb2 dib black w-100 br3"
              href="#0"
              >Other (?)</a
            >
            <!-- <a class="f6 link dim ph3 pv2 mb2 dib black bg-white w-100 br3" href="#0">Button Text</a> -->
            <!-- <div class="w-100 bb mv2"></div> -->
            <ion-button class="popover-button" @click="closePopOver($event)"
              >Cancel</ion-button
            >
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

    <!-- native scrolling, add overflow-scroll=”false” -->
    <!-- <ion-content padding v-touch:swipe="swipeDown" overflow-scroll="false"> -->
    <ion-content padding>
      <ion-refresher
        @ionRefresh="doRefresh($event)"
        @ionPull="pullingRefresh($event)"
      >
        <!-- <ion-refresher-content
      pullingIcon="arrow-dropdown"
      pullingText="Pull to refresh"
      refreshingSpinner="circles"
      refreshingText="Refreshing...">
    </ion-refresher-content> -->

        <div id="puller">pull down to refresh</div>
      </ion-refresher>

      <!-- <div v-if="this.$parent.refreshingTournaments"><center>Refreshing Tournaments List</center></div> -->
      <div style="display: none;" id="home-content">
        <center>Refreshing Tournaments List</center>
      </div>
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

      <ion-list v-if="this.$parent.filteredTournaments.length > -1">
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
        <ion-card
          class="cf pointer"
          v-for="t in this.$parent.filteredTournaments"
          :key="t.ID"
        >
          <div
            class="fl w-90 bg-white mv1 pl2 pv2"
            @click="tournamentClicked(t)"
          >
            <span
              class="b dark-gray mw-80"
              :style="{ 'font-size': fontSize + 'rem' }"
              >{{ t.name }}</span
            >
            <br />
            <span class="mid-gray" :style="{ fontSize: fontSize + 'rem' }"
              >{{ t.date }} - {{ t.location }}</span
            >
            <br />
            <!-- <span class="mid-gray">{{ getDeadline(t) }}</span> -->
            <span class="mid-gray" :style="{ 'font-size': fontSize2 + 'rem' }"
              ><span v-html="getDeadline(t)" />
            </span>
            <br />
            <!-- <span class="f7 mid-gray">status: {{t.status}}</span> -->
          </div>
          <div class="fr w-10 bg-white tc mv1 pv1">
            <ion-icon
              v-if="!isFavorite(t.ID)"
              @click="addFavorite(t.ID)"
              name="star-outline"
              class="yellow"
              style="font-size: 25px;"
            ></ion-icon>
            <ion-icon
              v-if="isFavorite(t.ID)"
              @click="removeFavorite(t.ID)"
              name="star"
              class="yellow"
              style="font-size: 25px;"
            ></ion-icon>
            <br />
            <span class="dark-blue">{{ t.points }}</span>
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
import { messageBus } from '@/main';
import { filters } from '@/main';
// import { displays } from '@/main'

export default {
  name: 'Home',
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
    return {
      apiURLbase: 'https://api.geekjournal.com',
      tournaments: [],
      items: ['a', 'b', 'c'],
      fontSize: 1,
      fontSize2: 0.75,
      search: false,
      searchText: '',
      // favorites: []
    };
  }, // end data
  methods: {
    segmentChanged(ev) {
      console.log('Segment changed', ev);
      this.$parent.display = ev.target.value;
      //this.hideSearchBar(); // will also call redisplay tournaments
      this.$parent.redisplayTournaments(); // redisplay tournaments
    },
    hideSearchBar(e) {
      if (e) {
        e.preventDefault(); // this allows the event to propogate by essentialy saying we didn't handle it
      }

      console.log('hide search bar called');
      if (!this.search) {
        console.log('search already false, doing nothing');
        document.getElementById('searchBar').style.display = 'none';
      } else {
        console.log('search is true, hiding anyway');
        document.getElementById('searchBar').style.display = 'none';
      }
      this.searchText = ''; // reset search text, not working?
      if (e) {
        // guess we have to do this instead
        e.target.value = '';
      }
      this.$parent.filter = filters.ALL; // reset filter
      this.$parent.redisplayTournaments(); // redisplay tournaments
    },
    setSearchVisibility(visible) {
      console.log(
        'setSearchVisibility called with (call, search): ',
        visible,
        this.search
      );

      if (visible) {
        // set focus, and pop up keyboard
        // Must set timeout so DOM renders before we set focus
        setTimeout(() => {
          document.getElementById('searchBar').setFocus();
          // Plugins.Keyboard.setAccessoryBarVisible({isVisible: false});
          // Plugins.Keyboard.show();
        }, 150);
      } else {
        document.getElementById('searchBar').style.display = 'none';
        if (this.search) {
          // have to flip it if search is true but we were called to hide it, not sure why
          this.search = false;
        }
      }
    },
    pullingRefresh() {
      document.querySelector('#puller').innerHTML =
        '<center>continue pulling to refresh</center>';
    },
    doRefresh(refresher) {
      document.querySelector('#puller').innerHTML =
        '<center>Refreshing...</center>';
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
      if (i > -1) {
        console.log('item found, carry on');
        return; // already exists, so carry on
      }
      console.log('not found, adding');
      this.$parent.favorites.unshift(ID);
      this.storeFavorites();
    },
    removeFavorite(ID) {
      let i = this.$parent.favorites.indexOf(ID);
      if (i > -1) {
        console.log('Removing item');
        // item was found, remove it, and save
        this.$parent.favorites.splice(i, 1);
        this.storeFavorites();
      }
    },
    isFavorite(ID) {
      return this.$parent.favorites.indexOf(ID) > -1 ? true : false;
    },
    async getFontSize() {
      console.log('Loading fontSize from store');
      const f = await Plugins.Storage.get({ key: 'fontSize' });
      let s = Object.values(f);
      if (s.length > 0) {
        if (s[0] != null) {
          this.fontSize = Number(s[0]);
        }
      }
      console.log('fontSize: ', this.fontSize);

      console.log('Loading fontSize2 from store');
      const f2 = await Plugins.Storage.get({ key: 'fontSize2' });
      s = Object.values(f2);
      if (s.length > 0) {
        if (s[0] != null) {
          this.fontSize2 = Number(s[0]);
        }
      }
      console.log('fontSize2: ', this.fontSize2);
    },
    async storeFavorites() {
      console.log('Storing favorites: ', this.$parent.favorites.toString());
      await Plugins.Storage.set({
        key: 'favorites',
        value: this.$parent.favorites.toString(),
      });
    },
    async getFavoritesFromStore() {
      console.log('Loading favorites from store');
      const favs = await Plugins.Storage.get({ key: 'favorites' });

      let s = Object.values(favs);

      if (s.length > 0 && s[0] != null) {
        this.$parent.favorites = s[0].split(',');
      }
      console.log('favorites: ', this.$parent.favorites);
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
        this.$parent.filteredTournaments = this.$parent.filteredTournaments.filter(
          item => {
            return (
              item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
              item.points.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
              item.location.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
              item.date.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
              item.ID.toLowerCase().indexOf(val.toLowerCase()) > -1
            ); // end return statement
          }
        );
      }
    },
    openPopOver($event) {
      console.log('openPopOver called', $event);
      document.querySelector('#mainPopOver').style.display = 'block';
    },
    closePopOver($event) {
      console.log('closePopOver called', $event.srcElement.id);
      document.querySelector('#mainPopOver').style.display = 'none';
    },
    goToAbout() {
      this.$router.push('about');
    }, // end goToAbout
    openMainMenu() {
      console.log('openMainMenu called');
      document.querySelector('ion-menu-controller').open('start');
    },
    openExternalURL(url) {
      open(url, '_blank');
    },
    tournamentClicked(t) {
      console.log('Tournament clicked: ', t.name, t.ID);
      this.$parent.selected = t;
      this.$router.push('/nav/' + t.ID);
    },
    filterTournaments() {
      console.log('Filter tournaments clicked');
      this.$router.push('/filter');
    },
    async showDialogAlert(msg) {
      console.log('Enter showDialog');
      await Plugins.Modals.alert({
        title: 'Alert',
        message: msg,
      });
    }, // showDialogAlert
    fetchTournaments() {
      console.log('fetching touraments');
      this.$http.get(this.apiURLbase + '/tournaments').then(
        function(response) {
          console.log(response.body);
          this.tournaments = response.body;
          console.log('Tournaments Length ', this.tournaments.length);
        },
        response => {
          console.log('failed to get tournaments', response.body);
        }
      );
    }, // end fetchTournaments
    swipeDown(swipeDirection) {
      console.log('Swipe down called:', swipeDirection);
      // this.$parent.refreshingTournaments = true;

      // document.querySelector('#home-content').style.display = "block";

      // must need to send an event to refresh list
      // messageBus.$emit('refreshTournamentList', 'refresh');
    },
    getDeadline(t) {
      let today = new Date();
      let deadDate = new Date(t.entries_close);

      if (t.entries_close) {
        let diffDays = Math.abs(today.getTime() - deadDate.getTime());
        diffDays = diffDays / (1000 * 60 * 60 * 24);

        if (deadDate < today || diffDays > 10) {
          // return "deadline: " + t.deadline ;
          return "<span class=''>" + 'enter by: ' + t.entries_close + '</span>';
        } else {
          return (
            "<span class='red'>" + 'enter by: ' + t.entries_close + '</span>'
          );
        }
      }

      //return "entries open: " + t.entriesOpen;
      return '';

      // let today = new Date();
      // let month = today.getMonth();
      // let year = today.getFullYear();
      // console.log("Date, Month and year: ", today, month, year)

      // return "hello";
    },
    eventHandlerLoadSettings() {
      this.getFontSize();
    },
  }, // end methods:
  created: function() {
    this.getFavoritesFromStore();
    this.getFontSize();
    messageBus.$on('settings-change', this.eventHandlerLoadSettings);
  }, // end created:
  updated: function() {},
  components: {},
  computed: {}, // end computed
};
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
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
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
