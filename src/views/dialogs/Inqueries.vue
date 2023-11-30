<template>
  <v-dialog v-model="dialog" max-width="1500">
    <v-card height="620">
      <!-- Displaying the notifications here. -->
      <v-card-title style="background-color: #3788d8; color: white; border-radius: 0px !important;">Notifications Table</v-card-title>
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
              <td v-if="item.status_name ==='PENDING'">
                <v-chip color="primary">{{ item.status_name }}</v-chip>
              </td>
            <td v-if="item.status_name ==='DECLINED'">
              <v-chip color="red">{{ item.status_name }}</v-chip>
            </td>
            <td v-if="item.status_name ==='APPROVED'">
              <v-chip color="green">{{ item.status_name }}</v-chip>
            </td>
            <td>{{ item.start }}</td>
            <td>{{ item.end }}</td>
            <td v-if="item.status_name === 'PENDING'">
              <v-icon @click="approveInquiry(item)">mdi-check</v-icon>
            </td>
            <td v-if="item.status_name === 'PENDING'">
              <v-icon @click="declineInquiry(item)">mdi-close</v-icon>
            </td>
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
      getRole:null,
      myRole:'',
      id:null,
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
        { text: 'End', value: 'end' },
        { text: '' },
        { text: '' },
      ],
      inqueries: null,
      statuses:null,
    };
  },
  props: {
    users: Object,
    value: Boolean,
  },
  async mounted() {
    this.myRole=localStorage.getItem('role');
    if(this.myRole==='Manager'){
      await this.getInqueries();
    }
      // this.statuses= this.inqueries.map(inqueries => inqueries.status_name);
    },
  computed: {
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
    handleHeaderIconClick(action) {
      // Handle click events for approve and decline icons in the header
      if (action === 'approve') {
        // Perform the necessary action for approve
      } else if (action === 'decline') {
        // Perform the necessary action for decline
      }
    },

    approveInquiry(item) {
      console.log('APPROVE', item);
    },

    declineInquiry(item) {
      console.log('DECLINE', item);
    },
    closeDialog() {
      this.dialog = false;
    },
    async getUser(id){
      const res = await this.$store.dispatch('getUser',id);
      this.getRole = res.data.role;
      this.id = res.data.id;
    },
    async getInqueries() {
      try {
        const response = await this.$store.dispatch('getInqueries');
        this.inqueries = response; // Assuming your response is an array of inqueries
        this.id = response.user_id;
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
