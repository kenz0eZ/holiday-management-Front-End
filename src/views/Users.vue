<template>
  <div class="about" style="overflow-y:hidden">
    <div style="margin-top: 50px; max-width: 80%; margin: 0 auto;">
      <v-tabs v-model="activeTab">
        <!-- Tab for "Active" -->
        <v-tab>
          Active
        </v-tab>
        <!-- Tab for "Archived" -->
        <v-tab>
          Inactive
        </v-tab>

        <!-- Tab content for "Active" -->
        <v-tab-item>
          <v-row>
            <!-- "Active/Archived" text -->
            <v-col cols="4">
              <v-card-text>Active</v-card-text>
            </v-col>
            <!-- Search input for an active user -->
            <v-col cols="4">
              <v-text-field
                  v-model="searchQuery"
                  label="Search for an active user"
                  outlined
                  clearable
                  dense
              ></v-text-field>
            </v-col>
            <!-- "Add Someone" button -->
            <v-col cols="4" class="text-right">
              <v-btn color="primary" @click="openDialog">Add Someone</v-btn>
            </v-col>
            <v-dialog max-width="500px" v-model="userDialog">
              <v-card>
                <v-card-title>Add Credentials</v-card-title>
                <v-row>
<!--                  Display name , surname ,-->
                <v-col cols="6">
                </v-col>
                  <v-col cols="6">
                  </v-col>
                </v-row>


<!--                  Make sure that we are going to take all of the input fields.-->
                    <v-card-text>
                    <v-text-field label="name" v-model="user.name"></v-text-field>
                      <v-text-field label="surname" v-model="user.surname"></v-text-field>
                      <v-text-field label="city" v-model="user.city"></v-text-field>
                      <v-text-field label="state" v-model="user.state"></v-text-field>
                      <v-text-field label="street" v-model="user.street"></v-text-field>
                      <v-text-field label="zip" v-model="user.zip"></v-text-field>
                      <v-text-field label="phone" v-model="user.phone.number"></v-text-field>
                      <v-text-field label="country" v-model="user.country"></v-text-field>
                      <v-text-field label="vacation days" v-model="user.vacation_days"></v-text-field>

<!--                      Important to know who-->
                      <v-menu>
                        <template v-slot:activator="{ on }">
                          <v-text-field label="date of birth" v-model="user.date_of_birth" v-on="on"></v-text-field>
                        </template>
                        <v-date-picker v-model="user.date_of_birth" @input="() => {}"></v-date-picker>
                      </v-menu>
<!--                      Need to add the calendar when i have the date of birth.-->
                      <v-text-field label="email" v-model="user.email"></v-text-field>
<!--                  We are going to have 2 roles, 1 manager, other worker.-->
                      <v-select label="role" :items="roleOptions" v-model="user.role"></v-select>
                    </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" @click="createUser" >Add User</v-btn>
                  <v-btn color="danger" @click="closeDialog">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>

          <!-- Display active user data using v-data-table -->
          <v-data-table :items="filteredUsers" :headers="headers">
            <template v-slot:item.delete="{ item }">
                <v-icon @click="deleteUser(item.id)" style="color:red;">mdi-delete</v-icon>
            </template>
<!--need to specify the edit like this . (interesting)-->
            <template v-slot:item.edit="{ item }">
              <v-icon @click="dialogOpenEdit(item)" style="color:orange;">mdi mdi-pencil</v-icon>
            </template>
<!--            Basica lly we are going to open a dialog when we want to edit the user with the name -->

            </v-data-table>
<!--          Outside of the v-data-tables are the dialogs.-->
<!--          TODO connect to the PATCH api, and send the information that needs to be changed.-->
          <v-dialog v-model="openEditDialog" max-width="500">
          <v-card elevation="2" class="overflow-x-hidden">
            <v-card-title>Edit User</v-card-title>
            <v-card-text>Edit a particular user!</v-card-text>
            <v-row style="padding:20px;">
              <v-col cols="6">
                <v-text-field label="change name" v-model="selectedUser.name"></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="change surname" v-model="selectedUser.surname"></v-text-field>
              </v-col>
            </v-row>
            <v-row style="padding:20px;">
              <v-text-field label="change email" v-model="selectedUser.email"></v-text-field>
            </v-row>
            <v-card-actions class="d-flex justify-end">
              <v-btn @click="editUser" class="primary">Save</v-btn>
              <v-btn @click="closeEditDialog">Cancel</v-btn>
            </v-card-actions>
          </v-card>
          </v-dialog>

        </v-tab-item>

        <!-- Tab content for "Archived" -->
        <v-tab-item>
          <v-card elevation="5" style="padding:10px; margin-bottom:20px;">
            <v-card-title>
              Deleted users
            </v-card-title>
          </v-card>
         <v-data-table :items="filteredUsers" :headers="headersInactive" hide-default-footer>

         </v-data-table>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      openEditDialog:false,
      selectedUser:{
        name:'',
        surname:'',
        id:'',
        email:'',
      },
      roleOptions: ['Worker', 'Manager'], // Items for the dropdown
      user:{
        country:null,
        street:null,
        city:null,
        zip:null,
        vacation_days:null,
        phone:{
          number: null,
        }
      },
      vacation_days:null,
      editDialog: false,
      searchQuery:"",
      userDialog:false,
      activeTab: 0,
      headers: [
        { text: "Name", value: "name" },
        { text: "Surname", value: "surname" },
        { text: "Email", value: "email" },
        { text:'Role', value:'role'},
        { text: "Delete", value: "delete" },
        { text:'Edit', value:"edit"}
      ],
      headersInactive:[
        { text: "Name", value: "name" },
        { text: "Surname", value: "surname" },
        { text: "Email", value: "email" },
        { text:'Role', value:'role'},
      ],
    };
  },
  async mounted() {
    await this.listUsers();
    console.log('Users data : ', this.users);
  },
  computed: {
    ...mapState(["users"]),
    filteredUsers(){
      return this.users.filter(user =>{
         return   user.name.toLowerCase().includes(this.searchQuery.toLowerCase())||
            user.surname.toLowerCase().includes(this.searchQuery.toLowerCase())||
            user.role.toLowerCase().includes(this.searchQuery.toLowerCase())
      })
    }
  },
  watch:{
    handler(searchQuery){
      return this.users.filter(user=>{
        user.name.toLowerCase().includes(searchQuery.toLowerCase())||
        user.surname.toLowerCase().includes(searchQuery.toLowerCase())
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      })
    },
  },
  methods: {
   dialogOpenEdit(user){
     this.selectedUser = {
       name:user.name,
       surname:user.surname,
       email:user.email,
       id:user.id,
     }
     return this.openEditDialog=true;
   },
    closeEditDialog(){
     return this.openEditDialog=false;
    },
    // Creating the user.
   //  Not sure if the createUser is going to take this kind of data.
   async createUser(){
      const body = {
        name:this.user.name,
        surname:this.user.surname,
        date_of_birth:this.user.date_of_birth,
        role:this.user.role,
        email:this.user.email,
        phone:this.user.phone,
        vacation_days:this.user.vacation_days,
        address:{
         state:this.user.state,
          city:this.user.city,
          zip:this.user.zip,
          street:this.user.street,
          country:this.user.country
        },
      };
      console.log('this is my body', body)
     await this.$store.dispatch("createUser",body);
    },

    openDialog(){
      return this.userDialog=true;
    },
    closeDialog(){
      return this.userDialog=false;
    },
    async listUsers() {
      await this.$store.dispatch('listUsers');
    },
    // Delete the user.
    async deleteUser(userId) {
    const deletedUser = this.$store.dispatch('deleteUser',userId);
    await this.$store.dispatch('listUsers');

    // TODO make sure that the same user ( cant delete it's self.)
    console.log(deletedUser);
    return deletedUser;
    },
    async editUser(){
     await this.$store.dispatch('editUser',this.selectedUser);
     this.closeEditDialog();
     await this.$store.dispatch('listUsers');
    },
  },
};
</script>
<style>
.v-application--wrap {
  height: 10px;
  max-width: 100vw;
}
</style>