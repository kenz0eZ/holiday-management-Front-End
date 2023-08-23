<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="headline">User Details</v-card-title>
      <v-card-text>
        <!-- Profile Photo and Name/Department -->
        <v-row align="center" justify="space-between">
          <v-col cols="2">
            <v-avatar size="50">
              <img :src="user.profilePhotoUrl" alt="Profile Photo" />
            </v-avatar>
          </v-col>
          <v-col cols="5">
            <div class="subtitle-1">{{ user.name }}</div>
            <div class="caption">{{ user.department }}</div>
          </v-col>
          <v-col cols="5">
            <!-- Navigation Tabs -->
            <v-tabs v-model="activeTab">
              <v-tab href="#profile">Profile</v-tab>
              <v-tab href="#other-tabs">Other Tabs</v-tab>
              <!-- Add more tabs as needed -->
            </v-tabs>
          </v-col>
        </v-row>

        <!-- Profile Tab -->
          <v-row>
            <!-- First Name -->
            <v-col cols="6">
              <v-text-field label="First Name" v-model="user.firstName"></v-text-field>
            </v-col>
            <!-- Last Name -->
            <v-col cols="6">
              <v-text-field label="Last Name" v-model="user.lastName"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!-- Email Address -->
            <v-col cols="6">
              <v-text-field label="Email Address" v-model="user.email"></v-text-field>
            </v-col>
            <!-- Employment Start Date -->
            <v-col cols="6">
              <v-text-field label="Employment Start Date" v-model="user.employmentStartDate"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!-- Date of Birth -->
            <v-col cols="6">
              <v-text-field label="Date of Birth" v-model="user.dateOfBirth"></v-text-field>
            </v-col>
            <!-- Department -->
            <v-col cols="6">
              <v-text-field label="Department" v-model="user.department"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!-- Approver -->
            <v-col cols="6">
              <v-text-field label="Approver" v-model="user.approver"></v-text-field>
            </v-col>
          </v-row>

        <!-- Other Tabs Content -->
        <!-- Add content for other tabs here -->

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveChanges">Save</v-btn>
        <v-btn color="primary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'profile', // Set the default active tab
      user: {
        profilePhotoUrl: 'URL_OF_PROFILE_PHOTO',
        name: 'John Doe',
        department: 'HR',
        firstName: '',
        lastName: '',
        email: '',
        employmentStartDate: '',
        dateOfBirth: '',
        approver: ''
        // Add more user properties as needed
      }
    };
  },
  props: {
    users: Object, // Passed from parent component
    value: Boolean, // Controls the visibility of the dialog
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },
    saveChanges() {
      // Implement saving changes logic here
    }
  },
};
</script>