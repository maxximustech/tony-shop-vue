<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col cols="12" sm="10" md="8" offset-sm="1" offset-md="2">
          <h3 class="mt-10 pa-5">Products</h3>
          <div class="text-right mb-4">
            <v-btn color="primary" @click="productDialog = true">
              Create New
            </v-btn>
          </div>
          <v-simple-table class="pa-5">
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-center">
                  Image
                </th>
                <th class="text-center">
                  Title
                </th>
                <th class="text-center">
                  Price
                </th>
                <th class="text-center">
                  Last Updated
                </th>
                <th class="text-right">
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in products"
                  :key="item.id"
              >
                <td class="pa-3">
                  <v-avatar>
                    <img
                        src="https://cdn.vuetifyjs.com/images/john.jpg"
                        alt="John"
                    >
                  </v-avatar>
                </td>
                <td class="pa-3">{{ item.title }}</td>
                <td class="pa-3">N{{ item.price.toLocaleString("en-GB") }}</td>
                <td class="pa-3">
                  {{item.updatedAt}}
                </td>
                <td class="text-right pa-3">
                  <v-btn fab color="orange" @click="">
                    <v-icon>mdi-square-edit-outline</v-icon>
                  </v-btn>
                  <v-btn class="ml-4" fab color="red" @click="">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-main>
    <v-dialog
        v-model="productDialog"
        width="500"
    >
      <v-card :loading="newProductloading" :disabled="newProductloading">
        <v-card-title class="text-h5">
          Create New Product
        </v-card-title>
        <v-text-field
            label="Title"
            outlined
            class="mx-5"
            v-model="newProduct.title"
        ></v-text-field>
        <v-textarea
            label="Description"
            outlined
            class="mx-5"
            v-model="newProduct.description"
        ></v-textarea>
        <v-select
            :items="categories"
            item-text="name"
            item-value="id"
            label="Category"
            outlined
            class="mx-5"
            v-model="newProduct.category"
        ></v-select>
        <v-file-input
            label="Image"
            outlined
            class="mx-5"
            v-model="newProduct.image"
        ></v-file-input>
        <v-text-field
            label="Price"
            outlined
            type="number"
            class="mx-5"
            v-model="newProduct.price"
        ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red"
              text
              @click="productDialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="primary"
              text
              @click=""

          >
            Create
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
  name: "Product",
  created(){
    this.getCategory();
  },
  data: ()=>({
    dialog: '',
    dialogText: '',
    productDialog: false,
    newProductloading: false,
    products: [
      {
        id: 1,
        imageUrl: '',
        title: 'Iphone 11 Pro',
        price: '50000',
        updatedAt: '2012-12-12'
      }
    ],
    newProduct: {
      title: '',
      description: '',
      image: '',
      price: '',
      category: ''
    },
    categories: []
  }),
  methods: {
    getProducts(){
      fetch(this.$store.state.baseUrl+'products',{
        method: 'GET',
        headers: {
          'Authorization': this.$store.state.jwt_token
        }
      }).then(response=>{
        return response.json();
      }).then(data=>{
        if(data.status === 200){
          this.products = data.products
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
    },
    getCategory(){
      fetch(this.$store.state.baseUrl+'category',{
        method: 'GET',
        headers: {
          'Authorization': this.$store.state.jwt_token
        }
      }).then(response=>{
        return response.json();
      }).then(data=>{
        if(data.status === 200){
          this.categories = data.category.map(c=>{
            return {
              name: c.name,
              id: c.id
            }
          });
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
    },
  }
}
</script>

<style scoped>

</style>