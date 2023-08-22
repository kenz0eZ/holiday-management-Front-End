<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-title class="title">Time Mozaic</v-app-bar-title>
      <v-spacer></v-spacer>

      <!-- Text Buttons -->
      <v-btn text>My Calendar</v-btn>
      <v-btn text>Users</v-btn>
      <v-btn text>Settings</v-btn>

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
    <user-details-dialog v-model="showDetailsDialog" />
  </v-app>
</template>
<script>
import userDetailsDialog from "@/views/dialogs/UserDetailsDialog.vue";
import { mapState } from "vuex";

export default {
  components: {
    userDetailsDialog,
  },
  data: () => ({
    showDetailsDialog: false,
  }),
  computed: {
    ...mapState({
      // authToken: state => state.authToken,
    }),
  },
  mounted () {
    localStorage.getItem("authToken");
  },
    methods: {
      openDetailsDialog () {
        this.showDetailsDialog = true;
        console.log('DIALOG', this.showDetailsDialog);
      },
    menuActionClick () {
      const token = {
        token: localStorage.getItem('token'),
      };

      this.$store.dispatch('logOutUser', token);
      this.$router.push('/login');
      localStorage.removeItem('token');
      // if (action === 'profile') {
      //   this.profileDialog = true;
      //   this.consoleDialog = false;
      // } else if (action === 'console') {
      //   this.consoleDialog = true;
      //   this.profileDialog = false;
      // } else if (action === 'logout') {
      //   this.$store.dispatch('authentication/doLogout', 'user');
      // }
    },
  },
}
</script>
<style scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  margin-right: 12px;
}
</style>
