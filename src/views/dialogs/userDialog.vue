<template>
  <v-dialog v-model="dialog" max-width="900" persistent>
    <v-alert type="success" v-if="apiPassed"></v-alert>
    <v-card height="620" elevation="10">
      <v-card-title class="custom-text" style="background-color:#19003F; color:white;">User Details
        <v-spacer></v-spacer>
        <v-icon style="color:white; cursor:pointer;" @click="closeDialog">mdi mdi-close</v-icon>
      </v-card-title>

      <v-card-text>
        <!-- Profile Photo and Name/Department -->
        <v-row align="center" justify="space-between">
          <v-col cols="1">
            <v-avatar size="100" style="margin-top:20px;">
              <img
                src="https://media.fiction.com/or62db208a90c6073814b9143e/renders/1440566616234073760/1440566616234073760-9.webp"
                  style="width: 150px; border-radius: 50%; transition: transform 0.3s; cursor:pointer;"
              />
            </v-avatar>
          </v-col>
          <v-col cols="1">
            <div class="custom-text">{{ user.name }}</div>
<!--            <div class="caption">{{ user.department }}</div>-->
          </v-col>
          <v-col cols="10">
            <!-- Navigation Tabs -->
            <v-tabs v-model="activeTab">
              <v-tab href="#profile">Profile</v-tab>
<!--              <v-tab href="#details">Details</v-tab>-->
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
                  style="margin-top:10px;"
                  label="First Name"
                  v-model="userDetails.name"
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
                  v-model="userDetails.surname"
                  outlined
                  hide-details
                  dense
                  style="margin-top:10px;"
                  class="custom-text"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <!-- Email Address -->
            <v-col cols="6">
              <v-text-field
                  label="Email Address"
                  v-model="userDetails.email"
                  outlined
                  hide-details
                  dense
                  class="custom-text"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  label="Role"
                  v-model="userDetails.role"
                  outlined
                  readonly
                  hide-details
                  dense
                  class="custom-text"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  readonly
                  label="Vacation Days"
                  v-model="userDetails.vacation_days"
                  outlined
                  hide-details
                  dense
                  class="custom-text"
              ></v-text-field>
            </v-col>
<!--            <v-col cols="6">-->
<!--              <v-text-field-->
<!--                  label="Phone"-->
<!--                  v-model="user.phone"-->
<!--                  outlined-->
<!--                  hide-details-->
<!--                  dense-->
<!--                  class="custom-text"-->
<!--              ></v-text-field>-->
<!--            </v-col>-->
            <!-- Employment Start Date -->
          </v-row>
          <v-row>
            <!-- Date of Birth -->
            <v-col cols="6">
                  <v-text-field
                      label="Date of Birth"
                      append-icon="mdi-calendar"
                      outlined
                      v-model="userDetails.date_of_birth"
                      hide-details
                      dense
                      class="custom-text"
                  ></v-text-field>
            </v-col>
            <v-col cols="6" style="margin-top:-65px;">

              <v-text-field
                  label="Department"
                  :readonly="role ==='Employee'"
                  v-model="userDetails.company[0].name"
                  outlined
                  hide-details
                  dense
                  class="custom-text"
              ></v-text-field>
              <div style="margin-top:35px; font-size:16px; font-weight:bold;">
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
        <v-btn @click="saveChanges" style="position:absolute;right:120px; bottom:10px; background-color:#19003F; color:white; padding:20px;">Save</v-btn>
        <v-btn  @click="closeDialog" style="position:absolute;right:20px; bottom:10px;background-color:#19003F; color:white;padding:20px;">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import index from "vuex";
import {mapState} from "vuex";

export default {
  data() {
    return {
      activeTab: 'profile', // Set the default active tab
      apiPassed:false,
      getUserId : localStorage.getItem('id'),
      user: {
        profilePhotoUrl: 'URL_OF_PROFILE_PHOTO',
        role:null,
        name: this.userDetails,
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
    ...mapState({
      userDetails: state => state.userDetails,
    }),
    dialog: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      },
    },
  },
  async mounted() {
    await this.$store.dispatch('getUser',this.getUserId);
    this.role = localStorage.getItem('role');

  },
  methods: {
    closeDialog() {
      this.dialog = false;
    },

    async saveChanges() {
      if(this.userDetails.role==='Manager'){
        const body = {
          id: this.userDetails.id,
          name: this.userDetails.name,
          surname: this.userDetails.surname,
          email: this.userDetails.email,
          vacation_days: this.userDetails.vacation_days,
          date_of_birth: this.userDetails.date_of_birth,
          company:this.userDetails.company[0].name
        };
        // await this.$store.dispatch('updateUser', body);
        await this.$store.dispatch('editUser2', body)
        this.closeDialog();
      }
      if(this.userDetails.role==='Employee'){
        const body = {
          id: this.userDetails.id,
          name: this.userDetails.name,
          surname: this.userDetails.surname,
          email: this.userDetails.email,
          vacation_days: this.userDetails.vacation_days,
          date_of_birth: this.userDetails.date_of_birth,
        };

        // await this.$store.dispatch('updateUser', body);
        await this.$store.dispatch('editUser2', body);
        this.closeDialog();
      }
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