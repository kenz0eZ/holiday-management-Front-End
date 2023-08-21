<template>
  <div class="yearly-calendar">
    <MonthCalendar v-for="monthIndex in 12" :key="monthIndex" :monthIndex="monthIndex" :year="year" />
  </div>
</template>

<script>
import MonthCalendar from './MonthCalendar.vue'; // Path to your MonthCalendar component

export default {
  components: {
    MonthCalendar,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.yearly-calendar {
  display: flex;
  grid-template-columns: repeat(3, 1fr); /* Adjust the number of columns as needed */
  gap: 20px;
}
</style>