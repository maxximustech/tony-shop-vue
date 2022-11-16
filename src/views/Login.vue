<template>
  <v-app>
    <v-main>
      <v-row class="text-center">
        <v-col cols="12">
          <v-img
              src="/img/logo.png"
              class="my-3"
              contain
              height="70"
          />
        </v-col>
        <v-col class="px-12 px-md-0" cols="12" md="6" lg="4" offset-md="3" offset-lg="4">
          <v-text-field
              label="Username"
              outlined
              v-model="username"
          ></v-text-field>
          <v-text-field
              label="Password"
              outlined
              type="password"
              v-model="password"
          ></v-text-field>
          <v-btn :loading="loginLoading" @click="logIn()" color="primary" large>Log In</v-btn>
        </v-col>
      </v-row>
    </v-main>
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <v-card class="pa-5">

        <v-card-text>
          {{ dialogText }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="dialog = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import PopUp from "@/components/PopUp";
export default {
  name: "Login",
  watch:{

  },
  components: {PopUp},
  data: ()=>({
    username: "",
    password: "",
    dialog: false,
    dialogText: "",
    loginLoading: false
  }),
  methods: {
    logIn(){
      this.loginLoading = true;
      fetch(this.$store.state.baseUrl+"auth",{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
        })
      }).then(response=>{
        return response.json();
      }).then(data=>{
        this.loginLoading = false;
        if(data.status === 200){
          this.$store.commit('setAuth',{
            token: data.token,
            user: data.user,
            permissions: data.permissions
          });
          this.$cookies.set('jwt_token',data.token);
          this.$router.push('/');
        }else{
          this.dialogText = data.message;
          this.dialog = true;
        }
      }).catch(err=>{
        this.dialogText = err.message;
        this.dialog = true;
      });
    }
  }
}
</script>

<style scoped>

</style>