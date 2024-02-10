<template>
  <div>
    <!--  Calendar Days  -->
    <div class="d-flex justify-center align-center mb-2 mt-5">
      <v-btn style="color:white;" color="#19003F" @click="decrementYear" class="arrow-button">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <div class="current-year">{{ currentYear }}</div>
      <v-btn style="color:white;" color="#19003F" @click="incrementYear" class="arrow-button">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>

    <div class="ma-10">
      <div v-for="(monthGroup, groupIndex) in monthGroups" :key="groupIndex" class="month-group">
        <div v-for="(month, index) in monthGroup" :key="index" class="month elevation-5">
          <v-chip class="mb-5 text-center justify-center d-flex" style="color:white" color="#19003F">{{ getMonthName(month) }}</v-chip>
          <div class="days">
            <div v-for="day in getDaysInMonth(month)" :key="day - 1" class="day">
              <div v-if="isDayApproved(month, day)">
                <v-tooltip left nudge-left="20px" color="green">
                  <template v-slot:activator="{on}">
                    <v-icon color="green" v-on="on">mdi mdi-calendar-check</v-icon>
                  </template>
                  <h6 style="font-size:25px;">
                    Day : {{day}}
                  </h6>
                  <div v-for="user in getApprovedInquiryForDay  (month, day)">
                    <br>
                    <!--                    {{user.user_name  + ' ' + user.user_surname + ' ' +  user.type_name + ' ' + user.status_name }}-->
                    {{user.user_name}}
                    <br>
                    {{user.user_surname}}
                    <br>
                    <h6 style="font-size:15px; text-transform: uppercase">
                    {{user.type_name}}
                    </h6>
                    <br>
                  </div>
                  <h6 style="font-size:25px; margin:0px">
                    APPROVED
                  </h6>
                </v-tooltip>
              </div>
              <div v-if="isDayPending(month, day)">
                <v-tooltip left nudge-left="20px" color="orange">
                  <template v-slot:activator="{on}">
                    <v-icon color="orange" v-on="on">mdi mdi-calendar-question</v-icon>
                  </template>
                  <h6 style="font-size:25px;">
                    Day : {{day}}
                  </h6>
                  <div v-for="user in getPendingDay (month, day)">
                    <br>
                    <!--                    {{user.user_name  + ' ' + user.user_surname + ' ' +  user.type_name + ' ' + user.status_name }}-->
                    {{user.user_name}}
                    <br>
                    {{user.user_surname}}
                    <br>
                    <h6 style="font-size:15px; text-transform: uppercase">
                      {{user.type_name}}
                    </h6>
                    <br>
                  </div>
                  <h6 style="font-size:25px; margin:0px">
                    PENDING
                  </h6>
                </v-tooltip>
              </div>
              <div v-if="isDayDeclined(month, day)">
                <v-tooltip left nudge-left="20px" color="red">
                  <template v-slot:activator="{on}">
                    <v-icon color="red" v-on="on">mdi-calendar-remove</v-icon>
                  </template>
                  <h6 style="font-size:25px; margin-top:5px;">
                    Day : {{day}}
                  </h6>
                  <div v-for="user in getDeclinedDay(month, day)">
                    <br>
<!--                    {{user.user_name  + ' ' + user.user_surname + ' ' +  user.type_name + ' ' + user.status_name }}-->
                    {{user.user_name}}
                    <br>
                    {{user.user_surname}}
                    <br>
                    <h6 style="font-size:15px; text-transform: uppercase">
                      {{user.type_name}}
                    </h6>
                    <br>
                  </div>
                  <h6 style="font-size:25px; margin:0px">
                    DECLINED
                  </h6>
                </v-tooltip>
              </div>
              <!-- Check if the day is within the range of any pending inquiry -->
              <div v-if="!isDayPending(month, day) && !isDayApproved(month, day) && !isDayDeclined(month, day)">
                {{ day }}
              </div>
            </div>          </div>
        </div>
      </div>
    </div>
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
      getInquires : state =>state.allInqueries,
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
  async mounted () {
    this.$store.dispatch('vacationTypes');
    //console.log('INQURES ', this.getInquires);
  },
  methods: {
    getApprovedInquiryForDay(month, day) {
      return this.getInquires.filter(item => {
        const startDate = new Date(item.start);
        const endDate = new Date(item.end);
        const currentDate = new Date(this.currentYear, month - 1, day);
        return item.status_name === 'APPROVED' && currentDate >= startDate && currentDate <= endDate;
      });
    },
    getPendingDay(month, day) {
      return this.getInquires.filter(item => {
        const startDate = new Date(item.start);
        const endDate = new Date(item.end);
        const currentDate = new Date(this.currentYear, month - 1, day);
        return item.status_name === 'PENDING' && currentDate >= startDate && currentDate <= endDate;
      });
    },
    getDeclinedDay(month, day) {
      return this.getInquires.filter(item => {
        const startDate = new Date(item.start);
        const endDate = new Date(item.end);
        const currentDate = new Date(this.currentYear, month - 1, day);
        return item.status_name === 'DECLINED' && currentDate >= startDate && currentDate <= endDate;
      });
    },
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
       // console.log(response);
      } catch (error) {
       // console.error('Error fetching inqueries:', error);
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
      //  console.error('Error making reservation:', error);
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