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
              <v-btn color="primary" @click="addUser">Add Someone</v-btn>
            </v-col>
          </v-row>

          <!-- Display active user data using v-data-table -->
          <v-data-table
              :items="activeUsers"
              :headers="activeUserHeaders"
          ></v-data-table>
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
export default {
  data() {
    return {
      searchQuery: '',
      activeTab: 0, // Initially, "Active" tab is active (0-based index)
      activeUsers: [
        { Name: "John Doe", Department: "HR", StartDate: "2023-01-15", AllowanceThisYear: 5000, AllowanceNextYear: 5500, Options: "Edit, Delete" },
        { Name: "Jane Smith", Department: "Finance", StartDate: "2022-08-10", AllowanceThisYear: 4500, AllowanceNextYear: 4800, Options: "Edit, Delete" },
        { Name: "Mark Johnson", Department: "IT", StartDate: "2023-03-20", AllowanceThisYear: 5200, AllowanceNextYear: 5600, Options: "Edit, Delete" },
        // Add more dummy active user data as needed
      ],
      activeUserHeaders: [
        { text: "Name", value: "Name" },
        { text: "Start Date", value: "StartDate" },
        { text: "Allowance This Year", value: "AllowanceThisYear" },
        { text: "Allowance Next Year", value: "AllowanceNextYear" },
        { text: "Options", value: "Options" },
      ],
    };
  },
  mounted() {
    // this.getUser();
  },
  methods: {
    // getUser(){
    //   this.$store.dispatch('listUser')
    // },
    addUser() {
      // Handle the "Add Someone" button click event
      // You can implement the logic to add a user here
    },
  },
};
</script>
