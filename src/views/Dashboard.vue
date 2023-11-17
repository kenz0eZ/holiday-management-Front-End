<template>
  <v-app class="overflow-y-hidden">
    <div style="overflow-y:hidden">
      <v-container>
        <div class="ma=2" style="display:flex;align-items:flex-start;justify-content: center;">
          <div style="margin-right:10px;">
            <v-btn @click="prevMonth" rounded color="blue" style="color:white; font-size:10px;">Previous Month</v-btn>
          </div>
          <div>
            <v-btn @click="nextMonth" rounded color="blue" style="color:white; font-size:10px;">Next Month</v-btn>
          </div>
          <v-col cols="8">
            <h2 class="text-right mt-5" style="font-size:15px; letter-spacing:1px;">{{ monthNames[month] }} {{ year }}</h2>
          </v-col>
          <v-col cols="1">
            <v-btn class="btn-animation ml-10" color="primary" style="width:30px; height:60px; font-size:40px; border-radius: 50%;">+</v-btn>
          </v-col>
        </div>
        <!-- Day names row -->
        <!-- Days row -->
        <v-row class="mt-5">
          <v-col v-for="day in daysInMonth" :key="day" cols="1" class="elevation-1" style="cursor:pointer;">
            <div @click="selectDate(day)" style="font-size: 12px;" class="d-flex align-center justify-center flex-column-reverse">
              {{ day }}
              <div style="font-size: 10px;">{{ getDayName(day) }}</div>
              <v-icon v-if="!selectedUser && getDayName(day)==='Mon'" class="mdi mdi-airplane" color="blue"></v-icon>
              <v-icon v-if="!selectedUser && getDayName(day)==='Fri'" class="mdi mdi-car-hatchback" color="orange"></v-icon>
              <v-icon v-if="!selectedUser && getDayName(day)==='Tue'" class="mdi mdi-bus-school" color="green"></v-icon>
              <v-icon v-else-if="getIconForDay(day)" :class="getIconClass(getIconForDay(day))" :color="getIconColor(getIconForDay(day))" style="font-size:20px;"></v-icon>
            </div>
          </v-col>
        </v-row>
        <!--      <div v-for="user in users" :key="user.id">-->
        <!--        {{user.name}}-->
        <!--      </div>-->
        <div>
          <v-row class="mt-10">
            <v-col cols="6">
              <p>Active Users</p>
            </v-col>
            <v-col cols="6" style="padding-left:30px;">
              <p>Select Users</p>
            </v-col>
          </v-row>

        </div>
      </v-container>

    </div>

    <v-row style="padding-left:160px; padding-right:100px;">
      <v-col cols="6">
        <v-data-table
            :items="users"
            :headers="headers"
            :items-per-page="5"
            class="elevation-1"
        >
        </v-data-table>
      </v-col>
      <v-col cols="5">
        <v-row class="mt-5">
            <v-select v-model="selectedUser" :items="users" item-text="name" label="Select User" @change="updateUserIcon"></v-select>
        </v-row>
      </v-col>
    </v-row>

  </v-app>
</template>

<script>
export default {
  data() {
    return {
      headers:[
        {text: 'ID' , value : 'id'},
        {text : 'Name', value :'name'},
        {text:'Surname', value:'surname'}
      ],
      selectedUser: null,
      users: [], // Assuming you have a list of users here
      userIcons: {}, // Store user icons dynamically


      daysInMonth: [],
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      monthNames: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
  },
  methods: {
    getIconForDay(day) {
      // Return the icon associated with the selected user
      return this.userIcons[this.selectedUser?.id];
    },
    getIconClass(icon) {
      return icon ? `mdi mdi-${icon}` : ''; // Add the mdi prefix to the icon class
    },
    getIconColor(icon) {
      // Customize icon colors based on your requirements
      if (icon === 'umbrella') return 'blue';
      if (icon === 'car-hatchback') return 'red';
      if (icon === 'airplane') return 'green';
      return '';
    },
    updateUserIcon() {
      // Update the user icon based on the selected user
      // For demonstration purposes, generating a random icon here
      const randomIcons = ['umbrella', 'car-hatchback', 'airplane'];
      const randomIcon = randomIcons[Math.floor(Math.random() * randomIcons.length)];

      this.$set(this.userIcons, this.selectedUser?.id, randomIcon);
    },
    selectDate(day) {
      // Implement your logic when a date is selected
      console.log(`Selected date: ${this.year}-${this.month + 1}-${day}`);
    },
    generateCalendar() {
      const totalDays = new Date(this.year, this.month + 1, 0).getDate();
      this.daysInMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
    },
    getDayName(day) {
      const date = new Date(this.year, this.month, day ); // Add 1 to consider the first day of the month
      return this.dayNames[date.getDay()];
    },
    prevMonth() {
      if (this.month === 0) {
        this.year--;
        this.month = 11;
      } else {
        this.month--;
      }
      this.generateCalendar();
    },
    async listUsers(){
    const response= await this.$store.dispatch('listUsers');
    this.users = response.data;
    },
    nextMonth() {
      if (this.month === 11) {
        this.year++;
        this.month = 0;
      } else {
        this.month++;
      }
      this.generateCalendar();
    },
  },
  mounted() {
    this.generateCalendar();
    this.listUsers();
  },
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
