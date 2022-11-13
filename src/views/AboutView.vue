<template>
  <div class="about">
    <h1>{{$store.state.count}}</h1>
  </div>
</template>
<script>
export default {
  created(){
    //this.$store.dispatch('asyncUpdateCount',70);
    this.$store.commit('updateCount',40);
  }
}
</script>
