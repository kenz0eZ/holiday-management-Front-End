<template>
  <div>
    <!-- Button to Open the Date Selection Dialog -->

    <div style="display:flex; align-items:center; justify-content: space-around; width:90%;margin:auto; padding-top:20px;">
<!--      Need to fix the image, take something different URL has expired when using a facebook img-->
      <img
          v-if="roleName === 'Manager'"
          src="https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3159137/manager-clipart-md.png"
          style="width: 100px; border-radius: 50%; transition: transform 0.3s; cursor:pointer;"
          @mouseover="scaleImage"
          @mouseout="resetImage"
      />
      <img
          v-else
          src="https://png.pngtree.com/png-vector/20220901/ourmid/pngtree-company-employee-avatar-icon-wearing-a-suit-png-image_6133899.png"
          style="width: 150px; border-radius: 50%; transition: transform 0.3s; cursor:pointer;"
          @mouseover="scaleImage"
          @mouseout="resetImage"
      />
      <div class=" ml-5">
        <!--       Credentials-->
        <v-card-text style="font-size:17px" class="custom-text">
          <h6 style="color:#19003F; font-size:16px" class="text-uppercase"> {{userDetails.name}} {{userDetails.surname}}</h6>
        </v-card-text>
      </div>
      <div class="d-flex">

<!--        <v-icon @click="decrementYear" color="#19003F"  v-if="currentYear > MIN_YEAR">mdi-chevron-left</v-icon>-->
<!--        &lt;!&ndash; Display Current Year &ndash;&gt;-->
<!--        <h6 class="current-year custom-text"> {{ currentYear }}  {{currentYear +1  }}</h6>-->
<!--        &lt;!&ndash; Right Arrow Button &ndash;&gt;-->
<!--        <v-icon @click="incrementYear" color="#19003F" class="arrow-button">mdi-chevron-right</v-icon>-->
      </div>

        <v-chip v-if="roleName !== 'Manager'" color="#19003F" style="color:white; cursor: pointer;" class="mr-5">Reserved Days :{{userDetails.vacation_days}}</v-chip>

      <v-tooltip bottom color="#19003F">
        <template v-slot:activator="{on}">
          <v-btn @click="openDateSelectionDialog" class="btn-animation" color="#19003F" style="width:30px; height:60px; font-size:40px; border-radius: 50%; color:white;" v-on="on">+</v-btn>
        </template>
        <div style="text-align:center;">
          <v-icon style="color:white; margin-right:5px;">mdi-calendar</v-icon>
          <span style="margin-top:10px;">Add Date</span>
        </div>
      </v-tooltip>
    </div>

    <v-dialog v-model="dialogVisible" max-width="400px">
      <v-card class="elevation-12 overflow-hidden">
        <div class="overflow-hidden">
          <v-card-title style="font-size:19px; background-color:#19003F; color:white; position:fixed; width: 400px; z-index:1" >
            Reserve a Date Range
            <v-spacer></v-spacer>
            <v-icon color="white" @click="closeDateSelectionDialog">mdi mdi-close</v-icon>
          </v-card-title>
          <!-- Your other content goes here -->
        </div>

        <v-card-text>
          <v-form ref="dateRangeForm" v-model="valid">
              <v-card class="elevation-3">
                <v-col cols="6" sm="6" style="margin-top:80px;">
                  <v-date-picker
                      v-model="startDate"
                      label="Start Date"
                      required
                      @input="validateDateRange"
                      no-title
                  ></v-date-picker>
                </v-col>
              </v-card>
              <v-card class="elevation-3 mt-5">
                <v-col cols="6" sm="6">
                  <v-date-picker
                      v-model="endDate"
                      label="End Date"
                      required
                      @input="validateDateRange"
                      no-title
                  ></v-date-picker>
                </v-col>
              </v-card>
            <v-select
                v-model="selectedEventType"
                :items="vacationType"
                item-text="name"
                @input="validateSelection"
                item-value="id"
                label="test"
                dense
                color="#19003F"
                class="mt-2"
                hide-details
                outlined>
             </v-select>
            <!-- Error Message -->
            <v-alert v-if="!valid" type="warning" class="mt-5">Please select a valid date range.</v-alert>

            <!-- Submit Button -->
            <v-card-actions class="float-end">
              <v-btn @click="makeReservation" :disabled="!validate" color="#19003F" style="color:white;">Reserve</v-btn>
              <v-btn @click="closeDateSelectionDialog" color="secondary">Cancel</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

<!--  Calendar Days  -->
    <div class="ma-10">
      <div v-for="(monthGroup, groupIndex) in monthGroups" :key="groupIndex" class="month-group">
        <div v-for="(month, index) in monthGroup" :key="index" class="month elevation-5">
          <v-chip class="mb-5 text-center justify-center d-flex" style="color:white" color="#19003F">{{ getMonthName(month) }}</v-chip>
          <div class="days">
            <div v-for="day in getDaysInMonth(month)" :key="day - 1" class="day">
              <!-- Check if the day is within the range of any pending inquiry -->
              <div v-if="isDayPending(month, day)">
                <v-chip color="white"  style="color:blue; font-size:25px;">?</v-chip>
              </div>
              <div v-if="isDayApproved(month, day)">
                <v-icon color="orange">mdi-checkbox-marked-circle</v-icon>
              </div>
              <div v-if="isDayDeclined(month, day)">
                <v-icon color="red">mdi-close</v-icon>
              </div>
              <div v-if="!isDayPending(month,day) && !isDayApproved(month,day) && !isDayDeclined(month,day)">
                {{day}}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
<!--    Add a loader in the v-data-table to make a better UI -->
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {

      headers: [
        { text: 'Company', value: 'company_name',  sortable: true, },
        { text: 'Type', value: 'type_name' },
        { text: 'Status', value: 'status_name' },
        { text: 'Start', value: 'start' },
        { text: 'End', value: 'end' },
      ],
      holidayDetailsDialog:false,
      inqueries: null,
      meetingDetailsDialog: false, // Flag to control the dialog visibility
      meetingReservationDates: [], // Array to store meeting reservation dates
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
      validate:false,
      selectedEventType: '',
      calendarIntegrationDialog: false,
      webcalLink: 'webcal://app.timetastic.co.uk/Feeds/MyFavouritesCalendar/13fc2f75-aa2f-44b2-a9b7-294adc723ca2',

      startDate: null,
      endDate: null,
      valid: true,
      selectedVacation:false,
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
    ...mapState({
      vacationType: state => state.vacationType,
      userDetails:state =>state.userDetails,
      getInquires : state =>state.setInq,
      roleName: state => state.roleName,
    }),
    monthGroups() {
      // Split the months into groups of 4
      const groups = [];
      for (let i = 0; i < 12; i += 4) {
        groups.push([i + 1, i + 2, i + 3, i + 4]);
      }
      return groups;
    },
  },
  watch:{
    currentYear:'updateCalendar',
  },
  async mounted () {
    this.$store.dispatch('vacationTypes');
    await this.getMyInqueries();
    console.log('Inquires : ' , this.inqueries);
    console.log('INQURES ', this.getInquires);
    },
  methods: {
    isDayPending(month, day) {
      // Check if there is any pending inquiry for the current month and day
      return this.getInquires.some(item => {
        const startDate = new Date(item.start);
        const endDate = new Date(item.end);
        const currentDate = new Date(this.currentYear, month - 1, day);
        return item.status_name === 'PENDING' && currentDate >= startDate && currentDate <= endDate;
      });
    },
    isDayApproved(month, day) {
      return this.getInquires.some(item => {
        const startDate = new Date(item.start);
        const endDate = new Date(item.end);
        const currentDate = new Date(this.currentYear, month - 1, day);
        return item.status_name === 'APPROVED' && currentDate >= startDate && currentDate <= endDate;
      });
    },
    isDayDeclined(month, day) {
      return this.getInquires.some(item => {
        const startDate = new Date(item.start);
        const endDate = new Date(item.end);
        const currentDate = new Date(this.currentYear, month - 1, day);
        return item.status_name === 'DECLINED' && currentDate >= startDate && currentDate <= endDate;
      });
    },
    isMonthInRange(item, currentMonth) {
      // Parse the start and end dates of the inquiry to compare with the current month
      const startDate = new Date(item.start);
      const endDate = new Date(item.end);

      // Check if the current month is within the start and end dates of the pending inquiry
      return currentMonth >= startDate.getMonth() && currentMonth <= endDate.getMonth();
    },
    isPendingForDay(item) {
      // Add your logic to check if the item's status is "PENDING" and if the item's date matches the current day
      return item.status_name === 'PENDING';
    },
    async getMyInqueries() {
      try {
        const response = await this.$store.dispatch('getMyInqueries');
        console.log(response);
      } catch (error) {
        console.error('Error fetching inqueries:', error);
      }
    },
  validateSelection(){
    this.validate=true;
  },
    async makeReservation() {
      const body = {
        type: this.selectedEventType,
        start: this.startDate,
        end: this.endDate
      }

      try {
        // Dispatch the makeReservation action
        await this.$store.dispatch('makeReservation', body);

        // Once the reservation is made, fetch the updated data
        await this.getMyInqueries();

        // Reset your form or perform any other actions
        this.closeDateSelectionDialog();
        this.startDate = '';
        this.endDate = '';
        this.selectedEventType = '';

      } catch (error) {
        console.error('Error making reservation:', error);
      }
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
.month-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.month {
  flex: 1 0 calc(20.33% - 20px); /* Adjust the width as needed */
  margin: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  height:370px;
  @media (max-width: 768px) {
    /* Adjust the layout for screens with a maximum width of 768px (or any other desired breakpoint) */
    flex-basis: calc(50% - 20px); /* Two columns on smaller screens */
    margin: 5px;
  }
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

  @media (max-width: 768px) {
    /* Adjust the layout for screens with a maximum width of 768px (or any other desired breakpoint) */
    width: calc(100% / 7); /* Back to one column on smaller screens */
    font-size: 14px; /* Adjust the font size for days on smaller screens */
  }
  &.reserved {
    background-color: #ffcccc; /* Set a background color for reserved days */
    border: 1px solid #ff5733; /* Set a border color for reserved days */
  }

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
.primary{
  color:#19003F;
}

</style>