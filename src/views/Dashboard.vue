<template>
  <div class="about">
<!--    TODO make the v-select where i will have all of the users. (active)-->
<!--    Now when i selected the nikola user for example. I need to display only that user.-->
    <v-row style="margin-left:20px;">
      <v-col cols="2">
        <v-select v-model="selectedUser" :items="users" item-text="name" label="Select a user"></v-select>
      </v-col>

    </v-row>
      <v-row>
<!--        <v-col>-->
<!--          <v-card width="300" style="margin-left:10px;" class="pa-2">-->
<!--            <v-card-title>Users</v-card-title>-->
<!--              <div v-for="user in users" :key="user.id" style="display:flex; margin:10px 0px;">-->
<!--                <v-avatar size="50" color="red">-->
<!--                  <div style="display:flex; align-items:center; justify-content: center; text-align:center; margin-top:15px; color:white; font-size:20px;">-->
<!--                    <p>{{ user.name.charAt(0).toUpperCase() }}</p>-->
<!--                    <p style="margin-left:1px">{{ user.surname.charAt(0).toUpperCase() }}</p>-->
<!--                  </div>-->
<!--                </v-avatar>-->
<!--                <div style="display:flex; align-items:center; justify-content: center; font-size:13px;">-->
<!--                  <p style="margin-left:10px;">{{user.name}}</p>-->
<!--                  <p style="margin-left:10px;">{{user.surname}}</p>-->
<!--                </div>-->
<!--              </div>-->
<!--          </v-card>-->
<!--        </v-col>-->
      </v-row>
    <v-row class="calendar-row" style="padding: 10px; max-width: 1200px; margin: 0 auto;">
      <div class="calendar-container">
        <div style="display: flex; flex-wrap: wrap; justify-content: center;">
          <v-btn v-for="(day, index) in calendarDays" :key="index" class="day-cell" @click="openDialog">
            {{ day }}
          </v-btn>
          <v-dialog v-model="openDaysDialog" max-width="1000" persistent>
          <v-card >
            <v-card-title>Calendar Form</v-card-title>
            <v-form ref="dateRangeForm" v-model="valid">
              <v-row>
                <!-- Start Date Input -->
                <v-col cols="6" sm="6">
                  <v-date-picker
                      v-model="startDate"
                      label="Start Date"
                      required
                      @input="validateDateRange"
                      no-title
                  ></v-date-picker>
                </v-col>

                <!-- End Date Input -->
                <v-col cols="12" sm="6">
                  <v-date-picker
                      v-model="endDate"
                      label="End Date"
                      required
                      @input="validateDateRange"
                      no-title
                  ></v-date-picker>
                </v-col>
              </v-row>
              <v-select v-model="selectedEventType" :items="eventTypes" label="Event Type" item-text="text" item-value="value">
                <template v-slot:selection="{ item }">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon :color="item.value === 'holiday' ? 'blue' : 'red'">{{ eventTypeIcons[item.value] }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-select>


              <!-- Error Message -->
              <v-alert v-if="!valid" type="error">Please select a valid date range.</v-alert>

              <!-- Submit Button -->
              <v-card-actions>
                <v-btn @click="makeReservation" :disabled="!valid" color="primary">Reserve</v-btn>
                <v-btn @click="closeDateSelectionDialog" color="error">Cancel</v-btn>
              </v-card-actions>
            </v-form>

            <v-card-actions class="d-flex float-end" style="position:absolute; bottom:0; right:0;">
              <v-btn color="red" style="color:white;" @click="closeDialog">Close</v-btn>
            </v-card-actions>
          </v-card>
          </v-dialog>
        </div>
      </div>
    </v-row>

<!--    What we need to do is get the users, print their data.-->
  </div>
</template>
<script>
import {mapState} from "vuex";
import {formatDate} from "fullcalendar";

export default {
  data(){
    return {
      holidayDetailsDialog:false,
      meetingDetailsDialog: false, // Flag to control the dialog visibility
      meetingReservationDates: [], // Array to store meeting reservation dates
      holidayReservations: [], // Array to store holiday reservations
      meetingReservations: [], // Array to store meeting reservations
      type:1,
      currentYear: new Date().getFullYear(),
      MIN_YEAR: 2000, // Change this to your desired minimum year
      eventTypes: [
        { text: 'Holiday', value: 'holiday' },
        { text: 'Meeting', value: 'meeting' },
        // Add more event types here
      ],
      eventType: null,
      selectedEventType: 'meeting',
      calendarIntegrationDialog: false,
      webcalLink: 'webcal://app.timetastic.co.uk/Feeds/MyFavouritesCalendar/13fc2f75-aa2f-44b2-a9b7-294adc723ca2',
      reservedStartDate: null,
      reservedEndDate: null,
      eventTypeIcons: {
        holiday: 'mdi-beach',
        meeting: 'mdi-account-group',
        // Add more event types and icons as needed
      },
      dialogVisible: false,
      reservedDateRanges: [],
      tableHeaders: [
        { text: "Start Date", value: "startDate" },
        { text: "End Date", value: "endDate" },
      ],
      valid: true,
      startDate:null,
      endDate:null,
      openDaysDialog:false,
      days:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      month: 10, // Example: 10 represents November
      year: 2023, // Example: 2023
      selectedUser:{
        name:'',
        surname:'',
      }
    }
  },
  computed:{

    lastMeetingReservationDate() {
      const meetingReservations = this.reservedDateRanges.filter(
          (range) => range.eventType === 'meeting'
      );

      if (meetingReservations.length > 0) {
        // Find the reservation with the latest end date
        const lastReservation = meetingReservations.reduce((latest, reservation) => {
          return new Date(reservation.endDate) > new Date(latest.endDate) ? reservation : latest;
        });

        // Format the date as needed (e.g., using a date formatting library)
        return formatDate(lastReservation.endDate); // Replace formatDate with your formatting logic
      }

      return 'No meeting reservations'; // Message when there are no meeting reservations
    },


    lastHolidayReservationDate() {
      const meetingReservations = this.reservedDateRanges.filter(
          (range) => range.eventType === 'holiday'
      );
      if (meetingReservations.length > 0) {
        // Find the reservation with the latest end date
        const lastReservation = meetingReservations.reduce((latest, reservation) => {
          return new Date(reservation.endDate) > new Date(latest.endDate) ? reservation : latest;
        });

        // Format the date as needed (e.g., using a date formatting library)
        return formatDate(lastReservation.endDate); // Replace formatDate with your formatting logic
      }

      return 'No meeting reservations'; // Message when there are no meeting reservations
    },


    getReservedIcon() {
      return (eventType) => {
        return eventType === 'holiday' ? 'reserved-icon mdi-beach' : 'reserved-icon mdi-account-group';
      };
    },

    monthGroups() {
      // Split the months into groups of 4
      const groups = [];
      for (let i = 0; i < 12; i += 4) {
        groups.push([i + 1, i + 2, i + 3, i + 4]);
      }
      return groups;
    },

  // Initialize the Active Users here. Only the active ones.
    ...mapState(["users"]),
    calendarDays() {
      const firstDayOfMonth = new Date(this.year, this.month, 1).getDay(); // Get the day of the week for the 1st day of the month
      const daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
      const calendar = [];

      // Define the order of days of the week starting from Monday
      const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

      // Calculate the index of the first day in the 'daysOfWeek' array
      const startingDayIndex = daysOfWeek.indexOf('M');

      for (let i = 1; i <= daysInMonth; i++) {
        const dayIndex = (i + startingDayIndex - 1) % 7;
        calendar.push(daysOfWeek[dayIndex] + ' ' + i);
      }

      return calendar;
    },
  },
  methods:{
    makeReservation(){
      const body = {
        start:this.startDate,
        end:this.endDate,
        type:this.type
      }
      this.$store.dispatch('makeReservation',body);
    },
    closeDateSelectionDialog() {
      this.dialogVisible = false;
    },
    reserveDateRange() {
      this.reservedStartDate = this.startDate;
      this.reservedEndDate = this.endDate;

      this.reservedDateRanges.push({
        startDate: this.startDate,
        endDate: this.endDate,
        eventType: this.selectedEventType, // Store the selected event type
      });
      console.log('Selected Event Type:', this.selectedEventType);
      console.log('Event Type Icon Class:', this.eventTypeIcons[this.selectedEventType]);

      if (this.selectedEventType === 'holiday') {
        this.holidayReservations.push({
          startDate: this.startDate,
          endDate: this.endDate,
        });
      } else if (this.selectedEventType === 'meeting') {
        this.meetingReservations.push({
          startDate: this.startDate,
          endDate: this.endDate,
        });
      }
      // Getting the date here.
      console.log(this.startDate);
      console.log(this.endDate);

      // Reset form and close the dialog
      this.startDate = null;
      this.endDate = null;
      this.selectedEventType = null; // Reset the event type
      this.valid = true;
      this.$refs.dateRangeForm.resetValidation();
      this.dialogVisible = false;

    },
    validateDateRange() {
      this.valid = this.startDate <= this.endDate;
    },
    async listUsers() {
      await this.$store.dispatch('listUsers');
    },
    openDialog() {
    this.openDaysDialog = true;
    },
    closeDialog() {
      this.openDaysDialog = false;
    }
  },

  async mounted() {
    await this.listUsers();
    console.log('Users data : ', this.users);
  },
}

</script>

<style scoped>
.about {
  /* Your existing styles for the .about container */
}

.calendar-title {
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 10px;
}

.calendar-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.calendar-row {
  display: flex;
  width: 100%;
}

.day-cell {
  flex: 1;
  text-align: center;
  padding-left:10px;
  padding-right:10px;
  border: 1px solid #ccc;
  cursor:pointer;
}

/* Add more styling as needed */

</style>