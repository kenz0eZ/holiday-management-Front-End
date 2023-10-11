<template>
  <div class="about">
    <div style="margin-top: 50px; max-width: 80%; margin: 0 auto;">
      <v-tabs v-model="activeTab">
        <!-- Tab for "Active" -->
        <v-tab>
          Active
        </v-tab>
        <!-- Tab for "Archived" -->
        <v-tab>
          Archived
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
              <v-btn color="primary">Add Someone</v-btn>
            </v-col>
          </v-row>

          <!-- Display active user data using v-data-table -->
          <v-data-table :items="filteredUsers" :headers="headers">
            <template v-slot:item.delete="{ item }">
                <v-icon @click="deleteUser(item.id)" style="color:red;">mdi-delete</v-icon>
            </template>
            <template v-slot:item.edit="{ item }">
              <v-icon @click="editUser(item.id)" style="color:orange">mdi-pencil</v-icon>
            </template>
          </v-data-table>
          <v-dialog v-model="editDialog" max-width="500px">
            <v-card>
              <v-card-title>Edit User</v-card-title>
                              <v-card-text>
                                <v-form @submit.prevent="updateUser">
<!--                                  <v-text-field v-model="editedUser.name" label="Name"></v-text-field>-->
<!--                                  <v-text-field v-model="editedUser.surname" label="Surname"></v-text-field>-->
<!--                                  <v-text-field v-model="editedUser.email" label="Email"></v-text-field>-->
<!--&lt;!&ndash;                                   Add more fields as needed &ndash;&gt;-->
                                </v-form>
                              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="updateUser">Save</v-btn>
                <v-btn color="red" @click="closeEditDialog">Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-tab-item>

        <!-- Tab content for "Archived" -->
        <v-tab-item>
          <div>
            <h2>Archived Users</h2>
            <ul>
              <!-- Display dummy archived user data -->
              <li>User 1 (Archived)</li>
              <li>User 2 (Archived)</li>
              <li>User 3 (Archived)</li>
              <!-- Add more archived user data as needed -->
            </ul>
          </div>
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
      editDialog: false,
      searchQuery:"",
      activeTab: 0,
      headers: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Surname", value: "surname" },
        { text: "Email", value: "email" },
        { text:'Role', value:'role'},
        { text: "Delete", value: "delete" },
        { text:'Edit', value:"edit"}
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
    editUser(){
      return this.editDialog=true;
    },
    closeEditDialog() {
      this.editDialog = false;
      this.editedUser = {
        id: null,
        name: "",
        surname: "",
        email: "",
      };
    },

    async updateUser() {
      try {
        this.closeEditDialog();
      } catch (error) {
        console.error('Failed to update user:', error);
        // Handle errors
      }
    },

    async listUsers() {
      await this.$store.dispatch('listUsers');
    },
    async deleteUser(userId){
    const deletedUser = this.$store.dispatch('deleteUser',userId);
    await this.$store.dispatch('listUsers');
    console.log(deletedUser);
    return deletedUser;
    }
  },
};
</script>