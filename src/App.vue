<template>
  <v-app>
    <v-main>
      <router-view />
      <AppBar v-if="shouldShowAppBar" />
      <Dashboard v-if="shouldShowDashboard" />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Dashboard from "./views/dashboard.vue";
import AppBar from "./views/AppBar.vue";

export default {
  name: "App",
  components: {
    Dashboard,
    AppBar,
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    shouldShowDashboard() {
      const shouldShow = this.isAuthenticated && this.$route.name === "Dashbo ard";
      console.log("shouldShowDashboard:", shouldShow);
      return shouldShow;
    },
    shouldShowAppBar() {
      // Hide AppBar on the '/login' route
      return this.$route.path !== '/login';
    },
  },
};
</script>