<template>
  <v-app>
    <v-main>
      <v-container>
        <template v-if="carts.length > 0">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="3" v-for="item in carts" :key="item.id">
              <v-card
                  class="mx-auto"
                  max-width="350"
                  outlined
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-1">
                      {{item.Product.title}}
                    </v-list-item-title>
                    <v-text-field
                        label="Quantity"
                        outlined
                        type="number"
                        dense
                        class="mt-1"
                        v-model="item.qty"
                        @change="item.qty = item.qty < 1 ? 1 : item.qty"
                    ></v-text-field>
                    <h4 class="mt-n3">N{{(item.Product.price * item.qty).toLocaleString('en-GB')}}</h4>
                  </v-list-item-content>
                  <v-list-item-avatar
                      tile
                      size="80"
                      color="grey"
                  >
                    <v-img :src="item.Product.imageUrl"></v-img>
                  </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                  <v-btn
                      outlined
                      rounded
                      text
                  >
                    Remove
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-container>
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
export default {
  name: "Cart",
  created(){
    this.getCart();
  },
  data: ()=>({
    carts: [],
    dialog: false,
    dialogText: false
  }),
  methods:{
    getCart(){
      fetch(this.$store.state.baseUrl+'cart',{
        method: 'GET',
        headers: {
          Authorization: this.$store.state.jwt_token
        }
      }).then(response=>{
        return response.json();
      }).then(data=>{
        if(data.status === 200){
          this.carts = data.carts
        }else{
          this.dialog = true;
          this.dialogText = data.message;
        }
        if(data.status === 401){
          this.$cookies.remove('jwt_token');
          this.$store.commit('setAuth',{
            token: "",
            user: {}
          });
          this.$router.push('/login');
        }
        if(data.status === 403){
          this.$router.push('/');
        }
      }).catch(err=>{
        this.dialog = true;
        this.dialogText = err.message;
      });
    }
  }
}
</script>

<style scoped>

</style>