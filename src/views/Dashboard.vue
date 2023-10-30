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
          <div v-for="(day, index) in calendarDays" :key="index" class="day-cell">
            {{ day }}
          </div>
        </div>
      </div>
    </v-row>

<!--    What we need to do is get the users, print their data.-->
  </div>
</template>
<script>
import {mapState} from "vuex";

export default {
  data(){
    return {
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
    async listUsers() {
      await this.$store.dispatch('listUsers');
    },
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