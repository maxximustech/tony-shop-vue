<template>
  <v-dialog
      v-model="show"
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
            @click="closePopUp"
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PopUp",
  watch:{
    dialog(val){
      this.show = val;
    }
  },
  props: {
    dialog: Boolean,
    dialogText: String
  },
  data: ()=>({
    show: false
  }),
  methods:{
    closePopUp(){
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

</style>