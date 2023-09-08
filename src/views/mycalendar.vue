<template>
  <div>
    <!-- Button to Open the Date Selection Dialog -->
    <div style="display:flex; align-items:center; justify-content: space-around; width:90%;margin:auto; padding-top:20px;">
      <img
          src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
          style="width: 100px; border-radius: 50%; transition: transform 0.3s; cursor:pointer;"
          @mouseover="scaleImage"
          @mouseout="resetImage"
      />
      <div class="mr-auto ml-5">
        <v-card-text style="font-size:17px; color:orangered;">Leo Pavlovski</v-card-text>
        <v-icon @click="decrementYear" color="primary"  v-if="currentYear > MIN_YEAR">mdi-chevron-left</v-icon>
        <!-- Display Current Year -->
        <span class="current-year">September {{ currentYear }} to October {{currentYear +1  }}</span>
        <!-- Right Arrow Button -->
        <v-icon @click="incrementYear" color="primary" class="arrow-button">mdi-chevron-right</v-icon>
      </div>
      <div>
        <a  style="margin-right:50px; text-decoration:none;" @click="openCalendarIntegrationDialog">Calendar integrations</a>
        <v-dialog v-model="calendarIntegrationDialog" max-width="500px">
          <v-card>
            <v-card-title class="headline">Calendar connections</v-card-title>
            <v-card-text>
              Your own Timetastic bookings instantly in your favorite calendar app.
              <br /><br />
              <!-- Google Calendar -->
              <v-row align="center" class="d-flex justify-space-between">
                <v-col cols="2">
                  <v-icon>mdi-google</v-icon>
                </v-col>
                <v-col cols="10">
                  Google Calendar
                  <v-btn color="primary" style="margin-left:150px;">Connect</v-btn>
                </v-col>
              </v-row>
              <br />
              <!-- Outlook Connect -->
              <v-row >
                <v-col cols="2">
                  <v-icon>mdi-facebook</v-icon>
                </v-col>
                <v-col cols="10">
                  Google Calendar
                  <v-btn color="primary" style="margin-left:150px;">Connect</v-btn>
                </v-col>
              </v-row>
              <br /><br />
              <!-- Calendar Subscriptions -->
              <strong>Calendar subscriptions</strong>
              <p>iCal feeds work in most calendar apps. Bookings can take an hour to sync.</p>
              <p>Your leave</p>
              <a :href="webcalLink" target="_blank">{{ webcalLink }}</a>
              <br /><br />
              <p>Need help setting these up? There are detailed guides in the help center.</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="closeCalendarIntegrationDialog">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </div>

      <v-tooltip bottom>
        <template v-slot:activator="{on}">
          <v-btn @click="openDateSelectionDialog" class="btn-animation" color="primary" style="width:30px; height:60px; font-size:40px; border-radius: 50%;" v-on="on">+</v-btn>
        </template>
        <div style="text-align:center;">
          <v-icon style="color:orange; margin-right:5px;">mdi-calendar</v-icon>
          <span style="margin-top:10px;">Add Date</span>
        </div>

      </v-tooltip>

    </div>
    <div style="width:200px; position:absolute;top:8.2rem;right:1.5rem;">
      <v-card class="info-card">
        <v-card-title class="card-title">Year end May 2024</v-card-title>
        <v-card-text>
          <div class="card-info">
            <div class="info-item">Days</div>
            <div class="info-item">Contractual allowance <span class="info-value">19</span></div>
            <div class="info-item">Time in lieu <span class="info-value">-</span></div>
            <div class="info-item">Total <span class="info-value">19</span></div>
            <div class="info-item">Holiday <span class="info-value">10</span>
            </div>
            <div class="info-item">Days remaining <span class="info-value">16</span></div>
          </div>
        </v-card-text>
      </v-card>

      <v-card v-if="hasReservations('holiday')" class="mt-10">
        <v-card-title class="card-title">Holiday Days</v-card-title>
        <v-card-text class="d-flex align-center mt-10">
          <v-icon color="primary" style="margin-top:-10px;">mdi-beach</v-icon>
          <div class="info-item ml-2">Holiday<span class="info-value">{{ getReservedDays('holiday') }} days</span></div>
        </v-card-text>
      </v-card>
      <!-- Show the card for Meeting Days if there are meeting reservations -->
      <v-card v-if="hasReservations('meeting')" class="mt-10">
        <v-card-title class="card-title">Meeting Days</v-card-title>
        <v-card-text class="d-flex align-center mt-10">
          <v-icon color="red" style="margin-top:-10px;">mdi-account-group</v-icon>
          <div class="info-item ml-2">Meeting<span class="info-value">{{ getReservedDays('meeting') }} days</span></div>
        </v-card-text>
      </v-card>
    </div>


    <!-- Date Selection Dialog -->
    <v-dialog v-model="dialogVisible" max-width="800px">
      <v-card class="elevation-12">
        <v-card-title style="font-size:19px">Reserve a Date Range</v-card-title>
        <v-card-text>
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
              <v-btn @click="reserveDateRange" :disabled="!valid" color="primary">Reserve</v-btn>
              <v-btn @click="closeDateSelectionDialog" color="error">Cancel</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <div class="month-container">
      <div v-for="(monthGroup, groupIndex) in monthGroups" :key="groupIndex" class="month-group">
        <div v-for="(month, index) in monthGroup" :key="index" class="month">
          <h4 class="month-title">{{ getMonthName(month) }}</h4>
          <div class="days">
            <div v-for="day in getDaysInMonth(month)" :key="day" class="day">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-if="isDayReserved(month, day)">
                    <v-icon v-on="on" class="reserved-icon" :color="isDayReserved(month, day) === 'holiday' ? 'blue' : 'red'">
                      {{ isDayReserved(month, day) === 'holiday' ? 'mdi-beach' : 'mdi-account-group' }}
                    </v-icon>
                  </div>
                  <div v-else>
                    <span v-if="isDayReserved(month, day)">
                    {{ 'This day is reserved' }}
                  </span>
                    <p v-else>{{ day }}</p>
                  </div>
                </template>
                <span>This day is reserved {{day}}</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- Table to display all reserved date ranges -->
    <v-data-table :items="reservedDateRanges" :headers="tableHeaders" style="width: 500px;"></v-data-table>
  </div>
</template>

<script>
export default {
  watch:{
    currentYear:'updateCalendar',
  },
  data() {
    return {
      holidayReservations: [], // Array to store holiday reservations
      meetingReservations: [], // Array to store meeting reservations
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

      startDate: null,
      endDate: null,
      valid: true,
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
    };
  },
  computed: {
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
  },
  methods: {
    hasReservations(eventType) {
      if (eventType === 'holiday') {
        return this.holidayReservations.length > 0;
      } else if (eventType === 'meeting') {
        return this.meetingReservations.length > 0;
      }
      return false;
    },
    getReservedDays(eventType) {
      let reservationsArray;
      if (eventType === 'holiday') {
        reservationsArray = this.holidayReservations;
      } else if (eventType === 'meeting') {
        reservationsArray = this.meetingReservations;
      }

      return reservationsArray.reduce((totalDays, reservation) => {
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
        const daysDiff = (end - start) / (1000 * 60 * 60 * 24) + 1;
        return totalDays + daysDiff;
      }, 0);
    },


    openCalendarIntegrationDialog() {
      this.calendarIntegrationDialog = true;
    },
    closeCalendarIntegrationDialog(){
      this.calendarIntegrationDialog = false;
    },
    scaleImage(event) {
      event.target.style.transform = 'translateY(10px)'; // Scale up the image on hover
    },
    resetImage(event) {
      event.target.style.transform = 'scale(1)'; // Reset the image scale on hover out
    },

    incrementYear() {
      this.currentYear++;
    },
    decrementYear() {
      if (this.currentYear > this.MIN_YEAR) {
        this.currentYear--;
      }
    },
    openDateSelectionDialog() {
      this.dialogVisible = true;
    },
    closeDateSelectionDialog() {
      this.dialogVisible = false;
    },
    validateDateRange() {
      this.valid = this.startDate <= this.endDate;
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


      // Reset form and close the dialog
      this.startDate = null;
      this.endDate = null;
      this.selectedEventType = null; // Reset the event type
      this.valid = true;
      this.$refs.dateRangeForm.resetValidation();
      this.dialogVisible = false;

    },
    getMonthName(month) {
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return monthNames[month - 1];
    },
    getDaysInMonth(month) {
      const daysInMonth = new Date(new Date().getFullYear(), month, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    },
    isDayReserved(month, day) {
      const reservedDay = this.reservedDateRanges.find((range) => {
        const start = new Date(range.startDate);
        const end = new Date(range.endDate);
        const current = new Date(new Date().getFullYear(), month - 1, day);
        return current >= start && current <= end;
      });

      return reservedDay !== undefined ? reservedDay.eventType : null;
    },
  },
};
</script>

<style>

.info-card {
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
}

.card-title {
  background-color: #007bff;
  color: #ffffff;
  padding: 10px;
  font-size: 18px;
  text-align: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.card-info {
  padding: 15px;
}

.info-item {
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-value {
  font-weight: bold;
  margin-left: 10px;
}

.icon {
  font-size: 18px;
  color: #007bff;
  margin-right: 5px;
}

.arrow-button {
  width: 30px;
  height: 30px;
  font-size: 20px;
}

.current-year {
  font-size: 18px;
  margin: 0 10px; /* Adjust spacing as needed */
}

/* Custom CSS for styling */
.month-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 70%;
  margin: auto;
}

.month-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.month {
  flex: 1 0 calc(20.33% - 20px); /* Adjust the width as needed */
  margin: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  height:370px;
}

.month-title {
  font-size: 1rem;
  margin-bottom: 10px;
  margin-left:10px;
}

.days {
  display: flex;
  flex-wrap: wrap;
}

.day {
  width: calc(100% / 9); /* Display 7 days per row */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  border-radius: 5px;
  background-color: #fff;
  transition: background-color 0.2s ease-in-out;
  cursor:pointer;
}

.day:hover {
  background-color: #f0f0f0; /* Highlight on hover */
}
.reserved-icon {
  font-size: 24px; /* Adjust the size as needed */
  color: #ff5733; /* Adjust the color as needed */
}

.btn-animation:hover{
  transform:rotate(35deg);
  transition:0.5s;

}

</style>