<template>
  <v-dialog v-model="dialog" max-width="900">
    <v-card height="620">
      <v-card-title class="custom-text">User Details</v-card-title>
      <v-card-text>
        <!-- Profile Photo and Name/Department -->
        <v-row align="center" justify="space-between">
          <v-col cols="3">
            <v-avatar size="100">
              <img
                  src="https://scontent.fskp4-2.fna.fbcdn.net/v/t39.30808-6/311995759_5155837401187500_2886514852781537434_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=a2f6c7&_nc_ohc=GCSLEBdC0b0AX-4F4IE&_nc_ht=scontent.fskp4-2.fna&oh=00_AfDMOp65f0YOx-J3I9Y0MhJ0mvLryIahma3sPWgfmxQO5g&oe=650BE879"
                  style="width: 100px; border-radius: 50%; transition: transform 0.3s; cursor:pointer;"
              />
            </v-avatar>
          </v-col>
          <v-col cols="4">
            <div class="custom-text">{{ user.name }}</div>
<!--            <div class="caption">{{ user.department }}</div>-->
          </v-col>
          <v-col cols="5">
            <!-- Navigation Tabs -->
            <v-tabs v-model="activeTab">
              <v-tab href="#profile">Profile</v-tab>
              <v-tab href="#details">Details</v-tab>
              <!-- Add more tabs as needed -->
            </v-tabs>
          </v-col>
        </v-row>

        <!-- Profile Tab -->
        <v-row v-if="activeTab==='profile'">
          <v-row>
            <!-- First Name -->
            <v-col cols="6">
              <v-text-field
                  label="First Name"
                  v-model="user.firstName"
                  outlined
                  hide-details
                  dense
                  class="custom-text"
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
                  class="custom-text"
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
                  class="custom-text"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  label="Phone"
                  v-model="user.phone"
                  outlined
                  hide-details
                  dense
                  class="custom-text"
              ></v-text-field>
            </v-col>
            <!-- Employment Start Date -->
            <v-col cols="6">
              <v-menu
                  ref="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"

              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                      label="Employment start date"
                      prepend-inner-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      hide-details
                      dense
                      class="custom-text"
                  ></v-text-field>
                </template>
                <v-date-picker

                    no-title
                    scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                      text
                      color="primary"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                      text
                      color="primary"
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
                  <v-text-field
                      label="Date of Birth"
                      append-icon="mdi-calendar"
                      outlined
                      v-model="user.dateOfBirth"
                      hide-details
                      dense
                      class="custom-text"
                  ></v-text-field>
              <v-row>
                <v-col cols="12" class="d-flex align-center mt-8">
                  <v-checkbox
                      label="Administrator"
                      class="custom-text"
                  ></v-checkbox>
                </v-col>
              </v-row>
              <v-row>
                <v-card-text style="font-size:15px;" class="custom-text">Administrators can access and change everything, including all settings.</v-card-text>
              </v-row>
            </v-col>
            <!-- Department -->
            <v-col cols="6" style="margin-top:160px;">
              <v-text-field
                  label="Department"
                  v-model="user.department"
                  outlined
                  hide-details
                  dense
                  class="custom-text"
              ></v-text-field>
              <div style="margin-top:15px;">
                <a href="/mycalendar" class="text-decoration-none">
                  <v-icon left color="primary" style="font-size:20px;">
                    mdi-calendar <!-- Calendar icon -->
                  </v-icon>
                  View Calendar
                </a>
              </div>

            </v-col>

          </v-row>
        </v-row>
        <v-row v-if="activeTab==='details'">
          <v-row>
            <v-col cols="12">
              <v-text-field
                  label="Job Title"
                  v-model="user.lastName"
                  outlined
                  hide-details
                  dense
                  class="custom-text"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Payroll ID"
                  v-model="user.lastName"
                  outlined
                  hide-details
                  dense
                  class="custom-text"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Phone"
                  v-model="user.lastName"
                  outlined
                  hide-details
                  dense
                  class="custom-text"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Emergency Contact"
                  v-model="user.lastName"
                  outlined
                  hide-details
                  dense
                  class="custom-text"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="Address"
                  v-model="user.lastName"
                  outlined
                  hide-details
                  dense
                  class="custom-text"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-row>


        <!-- Other Tabs Content -->
        <!-- Add content for other tabs here -->

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveChanges" style="position:absolute;right:100px; bottom:10px;">Save</v-btn>
        <v-btn color="primary" @click="closeDialog" style="position:absolute;right:20px; bottom:10px;">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import index from "vuex";

export default {
  data() {
    return {
      activeTab: 'profile', // Set the default active tab
      user: {
        profilePhotoUrl: 'URL_OF_PROFILE_PHOTO',
        name: 'Leo Pavlovski',
        department: 'HR',
        firstName: '',
        lastName: '',
        email: '',
        employmentStartDate: '',
        dateOfBirth: '',
        approver: '',
        phone: '',
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
    async saveChanges() {
      const body = {
        // id: this.userDetails.id,
        name: this.user.firstName,
        surname: this.user.lastName,
        phone: this.user.phone,
        email: this.user.email,
        // address: this.user.address,
        birthdate: this.user.dateOfBirth,
      };
      await this.$store.dispatch('updateUser', body);
      console.log('xD', body);
    }
  },
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');
div,h1,a,h2,h3,h4,h5,h6,p,li,ul{
  font-family:"Poppins", sans-serif !important;
}
</style>