<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-title class="title" style="color: white;" @click="navigateToWallChart">Time Mozaic</v-app-bar-title>
      <v-spacer></v-spacer>

      <!-- Text Buttons -->
      <v-btn text style="color:white" @click="navigateToWallChart">WallChart</v-btn>
      <v-btn text style="color:white" @click="navigateToCalendar">My Calendar</v-btn>
      <v-btn text style="color:white" @click="navigateToUsers">Users</v-btn>

      <!-- Icon Buttons -->
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-email</v-icon>
      </v-btn>

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
              <v-icon>mdi-dark mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Details</v-list-item-title>
          </v-list-item>
          <v-list-item @click="menuActionClick('preferences')">
            <v-list-item-icon>
              <v-icon>mdi-wrench</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Preferences</v-list-item-title>
          </v-list-item>
          <v-list-item @click="menuActionClick('help')">
            <v-list-item-icon>
              <v-icon>mdi-help</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Help & Support</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="menuActionClick('signOut')">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <user-details-dialog
        v-model="showDetailsDialog"
        :users="userDetails"
    ></user-details-dialog>
  </v-app>
</template>

<script>
import UserDetailsDialog from "@/views/dialogs/userDialog.vue"; // Adjust the path as needed

export default {
  components: {
    UserDetailsDialog,
  },
  data() {
    return {
      showDetailsDialog: false,
      userDetails: {
        name: "John Doe", // Example user details
        email: "john@example.com",
      },
    };
  },
  methods: {
    openDetailsDialog() {
      this.showDetailsDialog = true;
    },
    menuActionClick(action) {
      if (action === "signOut") {
        // Handle sign out action
      }
      // Handle other menu actions
    },
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
