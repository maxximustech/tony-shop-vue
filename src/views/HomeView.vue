<template>
  <h5>Token: {{$store.state.jwt_token}}</h5>
</template>

<script>
  import HelloWorld from '../components/HelloWorld'

  export default {
    name: 'Home',

    components: {
      HelloWorld,
    },
  }
</script>
