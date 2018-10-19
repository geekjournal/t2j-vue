<template>
  <div class="buildinfo container">
    BUILDINFO.VUE
    <!-- Alert message="test" / -->
    <Alert v-if="alert" v-bind:message="alert"></Alert>
    <h1 class="page-header">{{ msg }} </h1>
    
    <table class="table table-striped table-bordered table-sm">
      <thead>
        <tr>
          <th class="th-sm">Points<i class="fa fa-sort float-right" aria-hidden="true"></i></th>
          <th>Date</th>
          <th>City</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in tournaments" :key="t.id">
          <td>{{ t.points }}</td>
          <td>{{ t.date }}</td>
          <td>{{ t.city }}</td>
          <td>{{ t.name }}</td>
        </tr>
      </tbody>
    
    </table>

    
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue';
  
  export default {
    name: 'BuildInfo',
    props: {
      msg: String
    },
    data () {
      return {
        tournaments: [],
        alert: ''
      }
    }, // end data
    methods: {
      fetchTournaments() {
        this.$http.get('http://localhost:8082/tournaments')
          .then(function(response) {
            console.log(response.body);
            // this.tournaments = response.body;
            this.tournaments = response.body.sort(function(a,b) {
              return parseInt(b.points) - parseInt(a.points);
            });
          });
      },
      sortPoint() {
          this.tournaments = this.tournaments.sort(function(a,b) {
            return parseInt(a.points - parseInt(b.points));
          }); // end sort of array
      } // end sortPoints
    },
    created: function() {
      if(this.$route.query.alert) {
        this.alert = this.$route.query.alert;
      }
      this.fetchTournaments();
    },
    updated: function() {
      // this.fetchTournaments();
    },
    components: {
      Alert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
