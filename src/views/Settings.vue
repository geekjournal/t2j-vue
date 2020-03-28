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
      <div class="mb4 f3">
        Set Font Size
      </div>

      <div>
        <ion-button @click="increaseFont">A+</ion-button>
        <ion-button @click="decreaseFont">A-</ion-button>
        <ion-button @click="resetToDefault" class="ml3 f4"
          >Reset to Default</ion-button
        >
      </div>

      <ion-card class="cf pointer">
        <div class="fl w-90 bg-white mv1 pl2 pv2">
          <span
            class="b dark-gray mw-80"
            :style="{ 'font-size': fontSize + 'rem' }"
            >EXAMPLE: Tournament Name</span
          >
          <br />
          <span class="mid-gray" :style="{ fontSize: fontSize + 'rem' }"
            >00/00/0000 - Austin, TX</span
          >
          <br />
          <!-- <span class="mid-gray">{{ getDeadline(t) }}</span> -->
          <span class="mid-gray" :style="{ 'font-size': fontSize2 + 'rem' }"
            >enter by 00/00/0000 12:00 PM(Central Time)
          </span>
          <br />
          <!-- <span class="f7 mid-gray">status: {{t.status}}</span> -->
        </div>
        <div class="fr w-10 bg-white tc mv1 pv1">
          <ion-icon
            name="star-outline"
            class="yellow"
            style="font-size: 25px;"
          ></ion-icon>
          <br />
          <span class="dark-blue">400</span>
        </div>

        <!-- <span class="f5 b mw-80">{{ t.name }}</span>
            <button class="f3" ion-label @click="tournamentClicked(t)">Details</button> -->
      </ion-card>

      <!-- <ion-button @click="goBackHome()" full>Go Back!</ion-button> -->
    </ion-content>
  </ion-app>
</template>

<script>
import { Plugins } from '@capacitor/core';
import { messageBus } from '@/main';
export default {
  name: 'Settings',
  data() {
    return {
      fontSize: 1,
      defaultFontSize: 1,
      fontSize2: 0.75,
      defaultFontSize2: 0.75,
    };
  },
  methods: {
    goBackHome() {
      messageBus.$emit('settings-change');
      this.$router.push('/');
    }, // end go back home
    resetToDefault() {
      this.fontSize = this.defaultFontSize;
      this.fontSize2 = this.defaultFontSize2;
      this.saveSize();
    },
    increaseFont() {
      this.fontSize += 0.25;
      this.fontSize2 += 0.25;
      this.saveSize();
    },
    decreaseFont() {
      this.fontSize < 0.5 ? (this.fontSize = 0.25) : (this.fontSize -= 0.25);
      this.fontSize2 < 0.5 ? (this.fontSize2 = 0.25) : (this.fontSize2 -= 0.25);
      this.saveSize();
    },
    async saveSize() {
      console.log('saving fontSize: ', this.fontSize);
      await Plugins.Storage.set({
        key: 'fontSize',
        value: this.fontSize.toString(),
      });
      console.log('saving fontSize2: ', this.fontSize2);
      await Plugins.Storage.set({
        key: 'fontSize2',
        value: this.fontSize2.toString(),
      });
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
  }, // end methods
  created() {
    // TODO load font size from storage
    this.getFontSize();
  },
};
</script>
