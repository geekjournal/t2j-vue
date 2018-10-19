<template>
  <div class="alert alert-warning alert-dismissible" role="alert">
    ALERT.VUE class=alert

    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    <strong>{{ message }}</strong> 
  </div>
  
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Alert',
  props: [ 'message' ],
  data () {
    return {
      msg: "I am sam"
    
    }
  },
  components: {
  
  }
}
</script>
