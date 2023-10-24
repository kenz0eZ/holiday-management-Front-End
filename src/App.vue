<template>
  <v-app>
    <v-main>
      <router-view />
      <AppBar v-if="shouldShowAppBar" />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import AppBar from "./views/AppBar.vue";

export default {
  name: "App",
  components: {
    AppBar,
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    shouldShowAppBar() {
      // Hide AppBar on the '/login' route
      return this.$route.path !== '/login';
    },
  },
};
</script>
