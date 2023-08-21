<template>
  <v-app>
    <v-app-bar app>
      <!-- Top left buttons -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>App Title</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
      <div class="text-center">
        <v-menu
            bottom
            left
            offset-y
            origin="top right"
            transition="scale-transition"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn
                class="ml-2"
                min-width="0"
                v-bind="attrs"
                v-on="on"
                id="mdi-account"
                rounded
            >
              <span class="mr-3"> avatartInitials </span>
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-list :tile="false" nav dense>
            <template>
              <div style="text-align: center">
                <span > roleUser </span>
                <v-divider></v-divider>
              </div>
              <v-list-item-group
              >
                <v-list-item
                >
                  <v-list-item-icon>
                    <v-icon mdi-clock></v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title @click="menuActionClick">aaa</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </template>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
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
    menuActionClick () {
      const token = {
        token: localStorage.getItem('token'),
      };

      this.$store.dispatch('logOutUser', token);
      this.$router.push('/');
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

<style>
</style>
