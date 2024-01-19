<template>
  <v-dialog v-model="dialog" max-width="1800">
    <v-card height="620">
      <!-- Displaying the notifications here. -->
      <v-card-title style="display: flex; justify-content: space-between; background-color: #19003F; color: white; border-radius: 0px !important;">
        <span>Notifications Table</span>
        <v-btn @click="closeDialog()">X</v-btn>
      </v-card-title>
      <v-data-table :items="inqueries" :headers="headers" class="elevation-3" height="500">
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.user_name }} {{ item.user_surname }}</td>
<!--            <td>{{ item.inquire_id }}</td>-->
<!--            <td>{{ item.user_id }}</td>-->
            <td>{{ item.user_email }}</td>
<!--            <td>{{ item.company_id }}</td>-->
            <td>{{ item.company_name }}</td>
<!--            <td>{{ item.type_id }}</td>-->
            <td>{{ item.type_name }}</td>
<!--            <td>{{ item.status_id }}</td>-->
            <td>{{ item.status_name }}</td>
            <td>{{ item.start }}</td>
            <td>{{ item.end }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      myRole:'',
      headers: [
        { text: 'User', value: 'user_name' },
        // { text: 'Inquire ID', value: 'inquire_id' },
        // { text: 'User ID', value: 'user_id' },
        { text: 'User Email', value: 'user_email' },
        // { text: 'Company ID', value: 'company_id' },
        { text: 'Company Name', value: 'company_name' },
        // { text: 'Type ID', value: 'type_id' },
        { text: 'Type Name', value: 'type_name' },
        // { text: 'Status ID', value: 'status_id' },
        { text: 'Status Name', value: 'status_name' },
        { text: 'Start', value: 'start' },
        { text: 'End', value: 'end' },``
      ],
    };
  },
  props: {
    users: Object,
    value: Boolean,
  },
  async mounted() {
  this.myRole=localStorage.getItem('role');
    if (this.myRole === 'Employee') {
      await this.$store.dispatch('getMyInqueries');
    }
  },
  computed: {
    inqueries() {
      return this.$store.state.setInq;
    },
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
      async getMyInqueries() {
        try {
          const response = await this.$store.dispatch('getMyInqueries');
          this.inqueries = response; // Assuming your response is an array of inqueries
        } catch (error) {
          console.error('Error fetching inqueries:', error);
        }
      },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap');
div, h1, a, h2, h3, h4, h5, h6, p, li, ul {
  font-family: "Poppins", sans-serif !important;
}
</style>
