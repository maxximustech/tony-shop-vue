<template>
  <v-app>
    <v-main>
      <v-row>
        <v-col cols="12" sm="8" md="6" offset-sm="2" offset-md="3">
          <h3 class="mt-10 pa-5">Category</h3>
          <div class="text-right mb-4">
            <v-btn color="primary" @click="categoryDialog = true">
              Create New
            </v-btn>
          </div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Name
                </th>
                <th class="text-center">
                  Action
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                  v-for="item in categories"
                  :key="item.id"
              >
                <td class="pa-3">{{ item.name }}</td>
                <td class="text-center pa-3">
                  <v-btn color="orange">
                    Edit
                    <v-icon>mdi-square-edit-outline</v-icon>
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
        v-model="categoryDialog"
        width="500"
    >
      <v-card :loading="newCategoryloading" :disabled="newCategoryloading">
        <v-card-title class="text-h5">
          Create New Category
        </v-card-title>
          <v-text-field
              label="Name"
              outlined
              v-model="newCategoryName"
              class="mx-5"
          ></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red"
              text
              @click="categoryDialog = false"
          >
            Close
          </v-btn>
          <v-btn
              color="primary"
              text
              @click="createCategory"

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
  name: "Category",
  data: ()=>({
    newCategoryloading: false,
    dialog: false,
    dialogText: '',
    categoryDialog: false,
    newCategoryName: "Electronics",
    categories: [
      {
        id: 1,
        name: "Apple"
      },
      {
        id: 2,
        name: "Samsung"
      }
    ]
  }),
  methods:{
    createCategory(){
      this.newCategoryloading = true;
      fetch(this.$store.state.baseUrl+'product/category',{
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.jwt_token
        },
        body:JSON.stringify({
          name: this.newCategoryName
        })
      }).then(response=>{
        return response.json();
      }).then(data=>{
        if(data.status === 201){
          this.newCategoryName = '';
          this.categoryDialog = false;
        }
        this.dialog = true;
        this.dialogText = data.message;
        this.newCategoryloading = false;
      }).catch(err=>{
        this.dialog = true;
        this.dialogText = err.message;
        this.newCategoryloading = false;
      });
    }
  }
}
</script>

<style scoped>

</style>