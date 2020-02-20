cd<template>
  <ion-app>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          The Traveling Circus | License
        </ion-title>
        <ion-buttons slot="start">
          <ion-button @click="goBackHome()">
            <ion-icon name="arrow-back" style="font-size: 25px;"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      <span v-html="licenseText"></span>
      <!-- <ion-button @click="goBackHome()" full>Go Back!</ion-button> -->
    </ion-content>
  </ion-app>
</template>

<script>
import LicenseText from 'raw-loader!@/assets/license.txt';

export default {
  name: 'License',
  data() {
    return {
      licenseText: LicenseText,
    };
  },
  methods: {
    goBackHome() {
      this.$router.push('/');
    }, // end go back home
  }, // end methods
};
</script>
