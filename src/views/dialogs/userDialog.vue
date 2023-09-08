<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="headline">User Details</v-card-title>
      <v-card-text>
        <!-- Profile Photo and Name/Department -->
        <v-row align="center" justify="space-between">
          <v-col cols="3">
            <v-avatar size="100">
              <img
                  src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
                  style="width: 100px; border-radius: 50%; transition: transform 0.3s; cursor:pointer;"
              />            </v-avatar>
          </v-col>
          <v-col cols="4">
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
              <v-text-field
                  label="First Name"
                  v-model="user.firstName"
                  outlined
                  hide-details
                  dense
              ></v-text-field>
            </v-col>
            <!-- Last Name -->
            <v-col cols="6">
              <v-text-field
                  label="Last Name"
                  v-model="user.lastName"
                  outlined
                  hide-details
                  dense
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!-- Email Address -->
            <v-col cols="6">
              <v-text-field
                  label="Email Address"
                  v-model="user.email"
                  outlined
                  hide-details
                  dense
              ></v-text-field>
            </v-col>
            <!-- Employment Start Date -->
            <v-col cols="6">
              <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date"
                      label="Employment start date"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      hide-details
                      dense
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <!-- Date of Birth -->
            <v-col cols="6">
              <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      v-model="date"
                      label="Date of Birth"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      hide-details
                      dense
                  ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                      @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(date)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <!-- Department -->
            <v-col cols="6">
              <v-select
                  label="Department"
                  v-model="user.department"
                  outlined
                  hide-details
                  dense
              ></v-select>
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
<style>
.avatar-placeholder {
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 50%; /* Makes it a circle */
}
</style>