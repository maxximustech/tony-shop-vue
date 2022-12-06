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
              label="Email"
              outlined
              type="email"
              v-model="email"
          ></v-text-field>
          <v-text-field
              label="Password"
              outlined
              type="password"
              v-model="password"
          ></v-text-field>
          <v-select
              :items="genderItems"
              item-text="text"
              item-value="value"
              outlined
              v-model="gender"
          ></v-select>
          <v-btn :loading="signUpLoading" @click="signUp" color="primary" large>Sign Up</v-btn>
        </v-col>
      </v-row>
      <PopUp :dialog="dialog" :dialogText="dialogText" @dialogClosed="dialog = false"/>
    </v-main>
  </v-app>
</template>

<script>
import PopUp from '../components/PopUp';
export default {
  name: "SignUp",
  metaInfo(){
    return {
      title: 'Sign Up'
    }
  },
  components: {
    PopUp
  },
  data: () => ({
    genderItems: [{
      text: 'Male',
      value: 'male'
    },
      {
        text: 'Female',
        value: 'female'
      }],
    username: "",
    email: "",
    password: "",
    gender: "male",
    signUpLoading: false,
    dialog: false,
    dialogText: ""
  }),
  methods:{
    signUp(){
      this.signUpLoading = true;
      fetch(this.$store.state.baseUrl+"auth",{
        method: "PUT",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password,
          gender: this.gender
        })
      }).then(response=>{
        return response.json();
      }).then(data=>{
        this.signUpLoading = false;
        this.dialogText = data.message;
        this.dialog = true;
      }).catch(err=>{
        this.dialogText = err.message;
        this.dialog = true;
      });
    },
  }
}
</script>

<style scoped>

</style>