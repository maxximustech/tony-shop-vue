<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn to="/about">About</v-btn>
      <v-btn to="/login">Log In</v-btn>
      <v-btn to="/signup">Sign Up</v-btn>
      <v-btn @click="logout()">Logout</v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  created(){
    setTimeout(()=>{
      this.$vuetify.theme.dark = true;
    }, 3000);
    if(this.$cookies.isKey('jwt_token')){
      this.$store.commit('setAuth',{
        token: this.$cookies.get('jwt_token'),
        user: {}
      });
    }
  },
  methods:{
    logout(){
      this.$cookies.remove('jwt_token');
      this.$store.commit('setAuth',{
        token: "",
        user: {}
      });
      this.$router.push('/login');
    }
  }
};
</script>
