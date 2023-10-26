<template>
  <div class="about">
<!--    TODO make the v-select where i will have all of the users. (active)-->
<!--    Now when i selected the nikola user for example. I need to display only that user.-->
    <v-row style="margin-left:20px;">
      <v-col cols="2">
        <v-select v-model="selectedUser" :items="users" item-text="name" label="Select a user"></v-select>
      </v-col>

    </v-row>
      <v-row>
        <v-col>
          <v-card width="300" style="margin-left:10px;" class="pa-2">
            <v-card-title>Users</v-card-title>
              <div v-for="user in users" :key="user.id" style="display:flex; margin:10px 0px;">
                <v-avatar size="50" color="red">
                  <div style="display:flex; align-items:center; justify-content: center; text-align:center; margin-top:15px; color:white; font-size:20px;">
                    <p>{{ user.name.charAt(0).toUpperCase() }}</p>
                    <p style="margin-left:1px">{{ user.surname.charAt(0).toUpperCase() }}</p>
                  </div>
                </v-avatar>
                <div style="display:flex; align-items:center; justify-content: center; font-size:13px;">
                  <p style="margin-left:10px;">{{user.name}}</p>
                  <p style="margin-left:10px;">{{user.surname}}</p>
                </div>
              </div>
          </v-card>
        </v-col>
      </v-row>

<!--    What we need to do is get the users, print their data.-->
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  data(){
    return {
      selectedUser:{
        name:'',
        surname:'',
      }
    }
  },
  computed:{
  // Initialize the Active Users here. Only the active ones.
    ...mapState(["users"]),
  },
  methods:{
    async listUsers() {
      await this.$store.dispatch('listUsers');
    },
  },
  async mounted() {
    await this.listUsers();
    console.log('Users data : ', this.users);
  },
}

</script>