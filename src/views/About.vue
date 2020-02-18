<template>
  <ion-app>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>
          The Traveling Circus | About
        </ion-title>
        <ion-buttons slot="start">
          <ion-button @click="goBackHome()">
            <ion-icon name="arrow-back" style="font-size: 25px;"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content padding>
      Made with <span class="red">&hearts;</span> by a tennis enthusiast.
      <!-- <ion-button @click="goBackHome()" full>Go Back!</ion-button> -->
    </ion-content>
  </ion-app>
</template>

<script>
export default {
  name: 'About',
  methods: {
    goBackHome() {
      this.$router.push('/');
    }, // end go back home
  }, // end methods
};
</script>
