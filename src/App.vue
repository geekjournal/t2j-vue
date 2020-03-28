<template>
  <!-- <div id="app"> -->
  <ion-app>
    <router-view></router-view>
    <!-- <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> -->

    <!-- Dialog to display license and ask user to accept license before use
    See main.js for vue-js-modal -->
    <modal
      name="dialog"
      :scrollable="false"
      height="auto"
      :max-height="600"
      :max-width="600"
      :adaptive="true"
      :clickToClose="false"
    >
      <div style="overflow-y: auto; height: 300px;">
        <div class="mb2 b pa2">
          NOTE: YOU MUST READ AND AGREE TO THE TERMS AND PRIVACY POLICY TO
          CONTINUE. SCROLL DOWN TO READ THE FULL TEXT.
        </div>
        <span v-html="licenseText"></span>
        <div class="pa2 b">
          By clicking "Accept" below, you are agreeing to abide by and be bound
          to the provided Terms & Conditions and Privacy Policy. If you do not
          wish to accept these terms, press "Decline." If you Decline, you are
          acknowleging that you will not use this website and/or systems
          affialiated with this site.
        </div>
      </div>
      <div class="ba tc bg-light-gray">
        <ion-button class="pr2" @click="acceptLicenseTerms">Accept</ion-button>
        <ion-button color="danger " class="pl2" @click="rejectLicenseTerms"
          >Decline</ion-button
        >
      </div>
    </modal>
    <!-- <ion-button @click="openLicenseAcceptanceDialog">Press me</ion-button> -->

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

        <div
          class="cf pv2 grow pointer"
          @click="
            openExternalURL(
              'https://tennislink.usta.com/tournaments/rankings/rankinghome.aspx'
            )
          "
        >
          <div class="fl w-20 tc">
            <ion-icon name="tennisball" style="font-size: 25px;"></ion-icon>
          </div>
          <div class="fr w-80 f4">
            Rankings/Records
          </div>
        </div>

        <div
          class="cf pv2 grow pointer"
          @click="
            openExternalURL(
              'https://tennislink.usta.com/leagues/reports/NTRP/FindRating.aspx'
            )
          "
        >
          <div class="fl w-20 tc">
            <ion-icon name="search" style="font-size: 25px;"></ion-icon>
          </div>
          <div class="fr w-80 f4">
            Ratings Search
          </div>
        </div>

        <div
          class="cf pv2 grow pointer"
          @click="openExternalURL(ustaSearchSite)"
        >
          <div class="fl w-20 tc">
            <ion-icon name="square-outline" style="font-size: 25px;"></ion-icon>
          </div>
          <div class="fr w-80 f4">
            USTA Tournaments
          </div>
        </div>

        <div
          class="cf pv2 grow pointer"
          @click="
            openExternalURL(
              'https://www.usta.com/en/home/about-usta/who-we-are/national/officiating-rules-and-regulations.html'
            )
          "
        >
          <div class="fl w-20 tc">
            <ion-icon name="md-document" style="font-size: 25px;"></ion-icon>
          </div>
          <div class="fr w-80 f4">
            Rules of Tennis
          </div>
        </div>

        <div class="cf pv2 bt grow pointer" @click="removeFavoritesFromStore">
          <div class="fl w-20 tc">
            <ion-icon name="star" style="font-size: 25px;"></ion-icon>
          </div>
          <div class="fr w-80 f4">
            Clear Favorites
          </div>
        </div>

        <div
          class="cf pv2 bt grow pointer"
          @click="
            openExternalURL('https://www.facebook.com/groups/379071872251830/')
          "
        >
          <div class="fl w-20 tc">
            <ion-icon name="logo-facebook" style="font-size: 25px;"></ion-icon>
          </div>
          <div class="fr w-80 f4">
            Facebook Group
          </div>
        </div>

        <div class="cf pv2 bt grow pointer" @click="goToAbout">
          <div class="fl w-20 tc">
            <ion-icon
              name="information-circle"
              style="font-size: 25px;"
            ></ion-icon>
          </div>
          <div class="fr w-80 f4">
            About
          </div>
        </div>

        <div class="cf pv2 grow pointer" @click="goToLicense">
          <div class="fl w-20 tc">
            <ion-icon name="md-clipboard" style="font-size: 25px;"></ion-icon>
          </div>
          <div class="fr w-80 f4">
            License
          </div>
        </div>

        <div class="cf pv2 bt grow" @click="goToSettings">
          <div class="fl w-20 tc">
            <ion-icon name="settings" style="font-size: 25px;"></ion-icon>
          </div>
          <div class="fr w-80 f4">
            Settings
          </div>
        </div>

        <div
          class="cf pv2 bt grow pointer"
          @click="openExternalURL('mailto:admin@geekjournal.com')"
        >
          <div class="fl w-20 tc">
            <ion-icon name="md-send" style="font-size: 25px;"></ion-icon>
          </div>
          <div class="fr w-80 f4">
            Send Feedback
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

    <ion-page class="show-page" main> </ion-page>
    <ion-menu-controller></ion-menu-controller>

    <!-- <ion-action-sheet-controller></ion-action-sheet-controller> -->
  </ion-app>
  <!-- </div> -->
</template>

// Built using the tutorial at: //
https://www.smashingmagazine.com/2018/07/mobile-apps-capacitor-vue-js/ // See
docs at: // https://ionicframework.com/docs/components // Capacitor docs for
building mobile are at: // Follow the Developer Workflow guide to get building:
// https://capacitor.ionicframework.com/docs/basics/workflow

<script>
import App from '@/App.vue';
import { Plugins } from '@capacitor/core';
import { ActionSheetOptionStyle } from '@capacitor/core';
import { messageBus } from '@/main';
import { filters } from '@/main';
import { displays } from '@/main';
import SettingsStore from '@/stores/settingsStore';
import LicenseText from 'raw-loader!@/assets/license.txt';
//import { vm } from '@/main'

// See docs
// https://capacitor.ionicframework.com/docs/apis/browser

export default {
  name: 'App',
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
      //apiURLbase: 'http://localhost:8080',
      sharedItems: SettingsStore.data,
      tournaments: [],
      filteredTournaments: [],
      selected: {},
      refreshingTournaments: false,
      filter: filters.ALL,
      display: displays.UPCOMING,
      favorites: [],
      licenseAccepted: false,
      licenseText: LicenseText,
    };
  },
  methods: {
    segmentChanged(ev) {
      console.log('Segment changed', ev);
    },
    exitApp() {
      Plugins.App.exitApp();
    },
    openMainMenu() {
      console.log('openMainMenu called');
      document.querySelector('ion-menu-controller').open('start');
    },
    closeMainMenu() {
      console.log('closeMainMenu called');
      document.querySelector('ion-menu-controller').close('start');
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
    acceptLicenseTerms() {
      this.licenseAccepted = true;
      this.storeLicenseAccepted();
      this.$modal.hide('dialog');
    },
    rejectLicenseTerms() {
      this.licenseAccepted = false;
      this.storeLicenseAccepted();
      this.$modal.hide('dialog');
      location.replace('https://dev-t2j.netlify.com');
    },
    openLicenseAcceptanceDialog() {
      this.$modal.show('dialog');
      // this.$modal.show('dialog', {
      //   title: 'License Agreement',
      //   text: LicenseText,
      //   buttons: [
      //     {
      //       title: 'I accept',
      //       handler: () => {
      //         // alert('Woot!');
      //         // TODO: set acceptance via this.storeLicenseAccepted()
      //         this.licenseAccepted = true;
      //         this.storeLicenseAccepted();
      //         this.$modal.hide('dialog');
      //       },
      //     },
      //     {
      //       title: 'Decline', // Button title
      //       default: true, // Will be triggered by default if 'Enter' pressed.
      //       handler: () => {
      //         this.licenseAccepted = false;
      //         this.storeLicenseAccepted();
      //         this.$modal.hide('dialog');
      //         location.replace('https://fortylove.net');
      //       }, // Button click handler
      //     },
      //   ],
      // });
    },
    async openActionSheet() {
      console.log('openActionSheet called');
      let promptRet = await Plugins.Modals.showActions({
        title: 'Photo Options',
        header: 'Title',
        message: 'Select an option to perform',
        options: [
          { title: 'Upload' },
          {
            title: 'Remove',
            style: ActionSheetOptionStyle.Destructive,
          },
          {
            title: 'Cancel',
            style: ActionSheetOptionStyle.Cancel,
          },
        ],
      });
      console.log('You selected', promptRet);
    },
    goToAbout() {
      this.closeMainMenu();
      this.$router.push('about');
    }, // end goToAbout
    goToLicense() {
      this.closeMainMenu();
      this.$router.push('license');
    },
    openExternalURL(url) {
      open(url, '_blank');
      this.closeMainMenu();
    },
    goToSettings() {
      this.closeMainMenu();
      this.$router.push('settings');
    },
    eventHandlerRefreshTournamentList(msg) {
      console.log('Received Refresh Tournaments EVENT: ', msg);
      this.fetchTournaments();
      this.refreshingTournaments = false;
      document.querySelector('#home-content').style.display = 'none';
    },
    eventHandlerRedisplayTournamentList(msg) {
      console.log('redisplay Tournament List called: ', msg);
      this.filter = msg;
      this.redisplayTournaments();
    },
    redisplayTournaments() {
      switch (this.filter) {
        case filters.SIX_HUNDRED:
          console.log('Filtering to 600');
          this.filteredTournaments = this.tournaments.filter(
            t => t.points == '600'
          );
          console.log('Filtered tments: ', this.filteredTournaments);
          break;
        case filters.FOUR_HUNDRED:
          console.log('Filtering to 400');
          this.filteredTournaments = this.tournaments.filter(
            t => t.points == '400'
          );
          console.log('Filtered tments: ', this.filteredTournaments);
          break;
        case filters.TWO_HUNDRED:
          console.log('Filtering to 200');
          this.filteredTournaments = this.tournaments.filter(
            t => t.points == '200'
          );
          console.log('Filtered tments: ', this.filteredTournaments);
          break;
        case filters.ONE_HUNDRED:
          console.log('Filtering to 100');
          this.filteredTournaments = this.tournaments.filter(
            t => t.points == '100'
          );
          console.log('Filtered tments: ', this.filteredTournaments);
          break;
        case filters.OTHER:
          console.log('Filtering to OTHER');
          this.filteredTournaments = this.tournaments.filter(
            t => t.points == '?'
          );
          console.log('Filtered tments: ', this.filteredTournaments);
          break;
        case filters.FAVORITES:
          this.filteredTournaments = this.tournaments.filter(t =>
            this.favorites.indexOf(t.ID) > -1 ? true : false
          );
          break;
        case filters.ALL:
        default:
          this.filteredTournaments = this.tournaments;
          console.log('Filtering to ALL');
          this.filter = filters.ALL;
          break;
      } // end switch

      switch (this.display) {
        case displays.UPCOMING:
          console.log('Display set to show upcoming');
          this.filteredTournaments = this.filteredTournaments.filter(t => {
            let date = new Date(t.date);
            let now = new Date();

            let diffDays = Math.abs(now.getTime() - date.getTime());
            diffDays = diffDays / (1000 * 60 * 60 * 24);
            if (date >= now || diffDays < 3) {
              return true;
            }
            return false;
          });
          break;
        case displays.PAST:
          console.log('Display set to show past');
          this.filteredTournaments = this.filteredTournaments.filter(t => {
            let date = new Date(t.date);
            let now = new Date();

            let diffDays = Math.abs(now.getTime() - date.getTime());
            diffDays = diffDays / (1000 * 60 * 60 * 24);
            if (date < now && diffDays > 3) {
              return true;
            }
            return false;
          });
          this.filteredTournaments.sort(function(a, b) {
            let dateA = new Date(a.date),
              dateB = new Date(b.date);
            return dateB - dateA; // sort decending
          }); // end sort
          break;
        case displays.ALL:
        default:
          console.log('Display set to show all');
          this.filteredTournaments = this.filteredTournaments;
          this.display = displays.ALL;
          break;
      }

      // store in localStorage
      this.storeTournamentFilter();
      this.storeTournamentDisplay();
    },
    async storeTournamentFilter() {
      if (!this.filter) {
        return;
      }
      console.log('Storing tournament filter: ', this.filter);
      await Plugins.Storage.set({
        key: 'filter',
        value: this.filter.toString(),
      });
    },
    async storeTournamentDisplay() {
      if (!this.display) {
        return;
      }
      console.log('Storing tournament display: ', this.display);
      await Plugins.Storage.set({
        key: 'display',
        value: this.display.toString(),
      });
    },
    async storeLicenseAccepted() {
      console.log(
        'Storing license acceptance: ',
        this.licenseAccepted.toString()
      );
      await Plugins.Storage.set({
        key: 'licenseAccepted',
        value: this.licenseAccepted.toString(),
      });
    },
    async getTournamentFilter() {
      console.log('Loading filter from store');
      const f = await Plugins.Storage.get({ key: 'filter' });
      let s = Object.values(f);
      if (s.length > 0) {
        this.filter = s[0];
      }

      console.log('filter: ', this.filter);
    },
    async getTournamentDisplay() {
      console.log('Loading display from store');
      const f = await Plugins.Storage.get({ key: 'display' });
      let s = Object.values(f);
      if (s.length > 0) {
        this.display = s[0];
      } else {
        this.display = displays.UPCOMING;
      }

      console.log('filter: ', this.filter);
    },
    async getLicenseAccepted() {
      console.log('Loading license acceptance from store');
      const f = await Plugins.Storage.get({ key: 'licenseAccepted' });
      let s = Object.values(f);
      if (s.length > 0) {
        if (s[0] == 'true') {
          this.licenseAccepted = true;
        } else {
          this.licenseAccepted = false;
        }
      } else {
        this.licenseAccepted = false;
      }

      console.log('licenseAccepted: ', this.licenseAccepted);

      if (!this.licenseAccepted) {
        this.openLicenseAcceptanceDialog();
      }
    },
    fetchTournaments() {
      console.log('fetching touraments');
      this.$http
        .get(this.apiURLbase + '/tournaments', { params: { tksode: 5928475 } }) // random param so we can kill this client serverside if needed
        .then(
          function(response) {
            console.log(response.body);
            this.tournaments = response.body;
            this.redisplayTournaments();
          },
          response => {
            console.log('failed to get tournaments', response.body);
          }
        );
      //this.refreshingTournaments = false;
    }, // end fetchTournaments
    refresh() {
      console.log('refresh called');
      this.fetchTournaments();
    },
    goBack() {
      this.$router.go(-1);
    }, // end goBack()
  },
  mounted: function() {},
  created: function() {
    document.addEventListener('backbutton', this.goBack, false);

    messageBus.$on(
      'refreshTournamentList',
      this.eventHandlerRefreshTournamentList
    );
    messageBus.$on(
      'redisplayTournamentList',
      this.eventHandlerRedisplayTournamentList
    );

    this.getLicenseAccepted();
    this.getTournamentFilter();
    this.getTournamentDisplay();
    this.fetchTournaments();
    this.redisplayTournaments();
  },
  components: {
    App,
  },
  computed: {
    ustaSearchSite() {
      let today = new Date();
      let month = today.getMonth() + 1; // month returns as zero based indexing, we need January to start at 1, not zero
      let year = today.getFullYear();
      console.log('Date, Month and year: ', today, month, year);
      let urlStart =
        'https://m.tennislink.usta.com/TournamentSearch/searchresults.aspx?typeofsubmit=&action=2&keywords=&tournamentid=&sectiondistrict=8096&city=&state=TX&zip=&month=';
      let urlMiddle = '&startdate=&enddate=&day=&year=';
      let urlEnd =
        '&division=D5115&category=&surface=&onlineentry=&drawssheets=&usertime=&sanctioned=-1&agegroup=A&searchradius=-1';
      let url = urlStart + month + urlMiddle + year + urlEnd;
      return url;
    },
  }, // end computed
};

// function onBackKeyDown(e) {
//   e.preventDefault();
//   // alert('Back Button is Pressed!');
//   App.goBack(); // go back one screen
// }
</script>

<style></style>
