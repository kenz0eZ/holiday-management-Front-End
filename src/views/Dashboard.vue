<template>
  <v-app>

    <div >
      <v-row v-if="loading" justify="center" style="margin-top:0.1px;">
        <v-progress-linear indeterminate color="primary"></v-progress-linear>
      </v-row>
      <div>

        <div style="overflow-y:hidden;">
          <div style="display:flex; margin-top:17px; margin-left:37px;">
            <div style="margin-right:5px; margin-left:3px;">
              <v-btn @click="prevMonth" style="color:white; font-size:10px; background-color:#19003F">Previous Month</v-btn>
            </div>
            <div>
              <v-btn @click="nextMonth" style="color:white; font-size:10px; background-color:#19003F">Next Month</v-btn>
            </div>
            <div style="display:flex;align-items:center;justify-content: flex-end; margin-top:-10px; margin-right:37px;" class="ml-auto">
              <h2 class="text-right" style="font-size:15px; letter-spacing:1px; margin-right:15px; font-weight: bold;">{{ monthNames[month] }} {{ year }}</h2>
              <v-btn class="btn-animation " style="width:30px; height:60px; font-size:30px; border-radius: 50%; background-color:#19003F;color:white;">+</v-btn>
            </div>
          </div>
          <!-- Day names row -->
          <!-- Days row -->
          <v-row class="mt-5" style="padding:50px;">
            <v-col v-for="day in daysInMonth" :key="day" cols="1" class="elevation-3" style="cursor:pointer; border:.1px dotted black;">
              <div @click="selectDate(day)" style="font-size: 12px;" class="d-flex align-center justify-center flex-column-reverse ma-0 pa-0">
                <h6 style="font-size:13px;">{{day}}</h6>
                <div style="font-size: 13px; color:#19003F" class="ma-0 pa-0">{{ getDayName(day) }}</div>
                <v-icon v-if="!selectedUser && getDayName(day)==='Mon'" class="mdi mdi-airplane" color="blue"></v-icon>
                <v-icon v-if="!selectedUser && getDayName(day)==='Fri'" class="mdi mdi-car-hatchback" color="orange"></v-icon>
                <v-icon v-if="!selectedUser && getDayName(day)==='Tue'" class="mdi mdi-bus-school" color="green"></v-icon>
                <v-icon v-else-if="getIconForDay(day)" :class="getIconClass(getIconForDay(day))" :color="getIconColor(getIconForDay(day))" style="font-size:20px;"></v-icon>
              </div>
            </v-col>
          </v-row>
        </div>

        <!--      <div v-for="user in users" :key="user.id">-->
        <!--        {{user.name}}-->
        <!--      </div>-->
<!--        <div style="margin-left:40px; background-color:#19003F;color:white; padding-left:10px;  height: 30px; width:97%;">-->
<!--            <v-row>-->
<!--              <v-col cols="6" style="margin-top:-5px;">-->
<!--                <p class="text-center">Active Users</p>-->
<!--              </v-col>-->
<!--              <v-col cols="6" style="padding-left:30px; margin-top:-5px;">-->
<!--                <p class="text-center">Select Users</p>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--        </div>-->
<!--        <div style="overflow:auto; max-height:600px;">-->
<!--          <v-row style="padding: 50px;" justify="center">-->
<!--            <v-col xs="12" sm="6" md="6" lg="6">-->
<!--              <v-data-table-->
<!--                  :items="users"-->
<!--                  :headers="headers"-->
<!--                  :items-per-page="5"-->
<!--                  class="elevation-15"-->
<!--                  height="500"-->

<!--              ></v-data-table>-->
<!--            </v-col>-->
<!--            <v-col xs="12" sm="6" md="4" lg="6" style="padding: 10px; margin-top:15px;">-->
<!--              <v-row>-->
<!--                <v-card elevation="12" width="100%" style="padding:15px;" height="560">-->
<!--                  <v-select-->
<!--                      v-model="selectedUser"-->
<!--                      :items="users"-->
<!--                      item-text="name"-->
<!--                      label="Select User"-->
<!--                      @change="updateUserIcon"-->
<!--                  ></v-select>-->
<!--                </v-card>-->

<!--              </v-row>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </div>-->
      </div>
    </div>
<!--Maybe do a footer-->

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
  loading:false,

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
    async listUsers() {
      try {
        this.loading = true;
        const response = await this.$store.dispatch('listUsers');
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        this.loading = false;
      }
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
