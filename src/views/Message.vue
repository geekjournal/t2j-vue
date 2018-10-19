<template>
  <div class="message container">
  MESSAGE.VUE class=message
    <h1 class="page-header">Message is: {{ message }}</h1>

    
  </div>
</template>

<script>
// @ is an alias to /src



export default {
  name: 'Message',
  components: {
    
  },
  props: { message: "Hello" },
  data () {
    return {
    
    }
  }
}
</script>