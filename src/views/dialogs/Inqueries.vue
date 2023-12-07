<template>
  <v-dialog v-model="dialog" max-width="1500">
    <v-card height="620 ">
      <!-- Displaying the notifications here. -->
        <v-card-title style="background-color: #3788d8; color: white; border-radius: 0px !important; display:flex; align-items: center; justify-content:space-between; position:sticky; top:0; z-index:1000;">Notifications Table
          <v-icon @click="closeDialog" style="cursor:pointer; color:white;">mdi mdi-close</v-icon>
        </v-card-title>

      <v-data-table  :items="inqueries" :headers="headers" fixed-header class="elevation-5"  height="500">
        <template v-slot:item="{ item }">
          <tr>
            <td class="font-weight-medium">{{ item.user_name }} {{ item.user_surname }}</td>
<!--            <td>{{ item.inquire_id }}</td>-->
<!--            <td>{{ item.user_id }}</td>-->
            <td class="font-weight-medium">{{ item.user_email }}</td>
<!--            <td>{{ item.company_id }}</td>-->
            <td class="font-weight-medium">{{ item.company_name }}</td>
<!--            <td>{{ item.type_id }}</td>-->
            <td class="font-weight-medium">{{ item.type_name }}</td>
            <td v-if="item.type_name==='Vacation'">
              <v-icon color="primary">mdi mdi-airplane</v-icon>
            </td>
            <td v-if="item.type_name==='Day Off'">
              <v-icon color="orange">mdi mdi-car</v-icon>
            </td>
            <td v-if="item.type_name==='Remote'">
              <v-icon color="red">mdi mdi-home</v-icon>
            </td>
            <td v-if="item.type_name==='Unpaid'">
              <v-icon color="green">mdi mdi-emoticon-sad</v-icon>
            </td>

<!--            <td>{{ item.status_id }}</td>-->
              <td v-if="item.status_name ==='PENDING'">
                <v-chip color="primary">{{ item.status_name }}</v-chip>
              </td>

            <td v-if="item.status_name ==='DECLINED'">
              <v-chip color="red" style="color:white">{{ item.status_name }}</v-chip>
            </td>
            <td v-if="item.status_name ==='APPROVED'">
              <v-chip color="green" style="color:white">{{ item.status_name }}</v-chip>
            </td>
            <td>{{ item.start }}</td>
            <td>{{ item.end }}</td>
            <td v-if="item.status_name === 'PENDING'">
              <v-icon @click="approveInquiry(item)" color="green">mdi-check</v-icon>
            </td>
            <td v-if="item.status_name === 'PENDING'">
              <v-icon @click="declineInquiry(item)" color="red">mdi-close</v-icon>
            </td>
            <td v-if="item.status_name === 'APPROVED'">
              <v-tooltip right>
                <template v-slot:activator="{on}">
                  <v-icon style="margin-left:70px;" color="green" v-on="on">mdi-checkbox-marked</v-icon>
                </template>
                <span>Approved</span>
              </v-tooltip>

            </td>

            <td v-if="item.status_name === 'APPROVED'">
            </td>
            <td v-if="item.status_name === 'DECLINED'">
              <v-tooltip right>
                <template v-slot:activator="{on}">
                    <v-icon color="red" style="margin-left:70px;" v-on="on">mdi-close-box</v-icon>
                </template>
                <span>Declined</span>
              </v-tooltip>
            </td>
            <td v-if="item.status_name === 'DECLINED'">
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
        { text: 'Icon', value: 'icon' },
        // { text: 'Status ID', value: 'status_id' },
        { text: 'Status Name', value: 'status_name' },
        { text: 'Start', value: 'start' },
        { text: 'End', value: 'end' },
        { text: 'Accept', value:'accept' },
        { text: 'Decline',value:'decline' },
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
    console.log('inqueries : ', this.inqueries);
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
    changeStatusNames(){
      if(this.inqueries.type_name === 'PENDING'){
        return 'Pending'
      }
      if(this.inqueries.type_name === 'DAY_OFF'){
        return 'Day Off'
      }
      if(this.inqueries.type_name === 'REMOTE'){
        return 'Remote'
      }
      return this.inqueries;
    },
    approveInquiry(item) {
      console.log('APPROVE', item);
      console.log(item.inquire_id);

      const statusId = 3; // Set the desired status_id

      this.$store.dispatch('updateInquire', { inquireId: item.inquire_id, statusId })
          .then(updatedData => {
            console.log('Update successful:', updatedData);
            // Handle the response or perform additional actions
          })
          .catch(error => {
            console.error('Failed to update inquiry status:', error);
            // Handle the error appropriately
          });
    },
    declineInquiry(item) {
      console.log('DECLINE', item);
      console.log(item.inquire_id);

      const statusId = 2; // Set the desired status_id

      this.$store.dispatch('updateInquire', { inquireId: item.inquire_id, statusId })
          .then(updatedData => {
            console.log('Update successful:', updatedData);
            // Handle the response or perform additional actions
          })
          .catch(error => {
            console.error('Failed to update inquiry status:', error);
            // Handle the error appropriately
          });
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
