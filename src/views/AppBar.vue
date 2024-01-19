<template>
  <div>
    <v-app-bar app style="background-color:#19003F">
      <v-app-bar-title class="title" style="color: white;" @click="navigateToWallChart">Time Mozaic</v-app-bar-title>
      <v-spacer></v-spacer>

      <!-- Text Buttons -->
      <v-btn text style="color:white" @click="navigateToWallChart">WallChart</v-btn>
      <v-btn text style="color:white" @click="navigateToCalendar">My Calendar</v-btn>
      <v-btn text style="color:white" @click="navigateToUsers">Users</v-btn>

      <!-- Icon Buttons -->
      <div v-if="this.testRole==='Manager'">
        <v-tooltip bottom >
          <template v-slot:activator="{on}">
            <v-btn icon v-on="on">
              <v-icon color="white" @click="inqueriesDialog">mdi mdi-file-multiple</v-icon>
            </v-btn>
          </template>
          <span>List Inqueries</span>
        </v-tooltip>
      </div>


        <!--
              </div>
                  My inqueries -->
      <div v-if="this.testRole==='Employee'">
        <v-tooltip bottom  color="#19003F">
          <template v-slot:activator="{on}">
            <v-btn icon v-on="on">
              <v-icon @click="notificationDialog" color="white">mdi mdi-file-document</v-icon>
            </v-btn>
          </template>
          <span>My inqueries</span>
        </v-tooltip>
      </div>

<!--      This is goin to be the dialog for the notifications-->
      <!-- Avatar Menu -->
      <v-menu bottom left offset-y origin="top right" transition="scale-transition">
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="ml-2" min-width="0" v-bind="attrs" v-on="on" id="mdi-account" rounded>
            <v-icon class="mr-3">mdi-account</v-icon>
            <span class="initials">TM</span>
          </v-btn>
        </template>

        <v-list dense>
          <v-list-item @click="openDetailsDialog">
            <v-list-item-icon>
              <v-icon color="#19003F"> mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-weight: bold;">My Details</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="menuActionClick('signOut')">
            <v-list-item-icon>
              <v-icon color="#19003F">mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-title style="font-weight: bold;">Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <user-dialog
        v-model="showDetailsDialog"
        :users="userDetails"
    ></user-dialog>

    <notification-dialog
        v-model="openNotificationDialog"
    ></notification-dialog>
    <inqueries
        v-model="openInqueries"
    ></inqueries>


  </div>
</template>

<script>
import UserDialog from "./dialogs/userDialog.vue";
import NotificationDialog from "./dialogs/NotificationDialog.vue";
import Inqueries from "./dialogs/Inqueries.vue";
import {mapGetters, mapState} from "vuex";

export default {
  components: {
    UserDialog,
    NotificationDialog,
    Inqueries
  },
  computed:{
    ...mapState({
      roleName: state => state.roleName,
    }),
    ...mapGetters(['getRoleName'])
  },
  mounted() {
    this.testRole=localStorage.getItem('role');
    },
  data() {
    return {
      showDetailsDialog: false,
      openNotificationDialog:false,
      openInqueries:false,
      getRole:'',
      testRole:'',
      id:null,
      userDetails: {
        // name: "John Doe", // Example user details
        // email: "john@example.com",
        // password:'1234',
        token:null,
      },
    };
  },
  methods: {
    async getMyInqueries() {
      try {
        const response = await this.$store.dispatch('getMyInqueries');
        this.inqueries = response; // Assuming your response is an array of inqueries
      } catch (error) {
        console.error('Error fetching inqueries:', error);
      }
    },
    async notificationDialog() {
      this.openNotificationDialog = true;
      await this.getMyInqueries(); // Fetch the latest data before opening the dialog
    },
    inqueriesDialog(){
      this.openInqueries=true;
    },
    openDetailsDialog() {
      this.showDetailsDialog = true;
    },
    async menuActionClick(action) {
      if (action === "signOut") {
         var token = localStorage.getItem('token');
        // console.log(token);
        const body = {
          token:token
        };
        await this.$store.dispatch('logOutUser', body);
        localStorage.removeItem('id')
       await this.$router.push('/login');
      }
    },
    // async getUser(id){
    //   await this.$store.dispatch('getUser',id);
    // },
    navigateToCalendar() {
      if (this.$route.name !== 'mycalendar') {
        this.$router.push({ name: 'mycalendar' });
      }
    },
    navigateToUsers() {
      if (this.$route.name !== 'users') {
        this.$router.push({ name: 'users' });
      }
    },
    navigateToWallChart() {
      if (this.$route.name !== 'dashboard') {
        this.$router.push({ name: 'dashboard' });
      }
    },
  },


};
</script>

<style scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  margin-right: 12px;
}
</style>
