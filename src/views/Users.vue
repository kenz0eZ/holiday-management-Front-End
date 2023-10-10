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
          <v-data-table :items="users" :headers="headers"></v-data-table>
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
      searchQuery: "",
      activeTab: 0, // Initially, "Active" tab is active (0-based index)
      headers: [
        // Define your table headers here
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Surname", value: "surname" },
        { text: "Email", value: "email" },
        // Add more headers as needed
      ],
    };
  },
  async mounted() {
    await this.listUsers();
    console.log('Users data : ', this.users);
  },
  computed: {
    ...mapState(["users"]),
  },
  methods: {
    async listUsers() {
      var token = localStorage.getItem('token');
      const body = {
        token: token
      };
      await this.$store.dispatch('listUsers', body);
    },
  },
};
</script>