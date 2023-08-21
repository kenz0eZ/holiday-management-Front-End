<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm3>
        <v-checkbox v-model="landscape" hide-details label="Landscape"></v-checkbox>
      </v-flex>
      <v-flex xs12 sm3>
        <v-checkbox v-model="reactive" hide-details label="Reactive"></v-checkbox>
      </v-flex>
    </v-layout>

    <v-date-picker v-model="picker" :landscape="landscape" :reactive="reactive"></v-date-picker>

    <v-dialog
        v-model="dialogVisible"
        max-width="500px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Selected Date</span>
        </v-card-title>

        <v-card-text>
          You selected: {{ selectedDate }}
          <!-- Additional Form Elements -->
          <v-form>
            <v-text-field v-model="name" label="Who for (name)"></v-text-field>
            <v-select v-model="type" :items="types" label="Type" dense outlined></v-select>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="startingDate" label="Starting date" v-bind="attrs" v-on="on" outlined readonly></v-text-field>
              </template>
              <v-date-picker v-model="startingDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="$refs.menu.save(startingDate)">OK</v-btn>
                <v-btn text @click="$refs.menu.cancel()">Cancel</v-btn>
              </v-date-picker>
            </v-menu>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="endingDate" label="Ending date" v-bind="attrs" v-on="on" outlined readonly></v-text-field>
              </template>
              <v-date-picker v-model="endingDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="$refs.menu.save(endingDate)">OK</v-btn>
                <v-btn text @click="$refs.menu.cancel()">Cancel</v-btn>
              </v-date-picker>
            </v-menu>
            <v-radio-group v-model="timeOfDay">
              <v-radio label="Morning" value="morning"></v-radio>
              <v-radio label="Afternoon" value="afternoon"></v-radio>
            </v-radio-group>
            <v-text-field v-model="reason" label="Reason" outlined></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialogVisible = false">Close</v-btn>
          <v-btn color="primary" @click="sendRequest">Send Request</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picker: new Date().toISOString().substr(0, 10),
      landscape: false,
      reactive: false,
      dialogVisible: false,
      name: '',
      type: '',
      types: ['Holiday', 'Unpaid Leave', 'Sick Leave', 'Maternity', 'Paternity', 'Meeting'],
      startingDate: '',
      endingDate: '',
      timeOfDay: '',
      reason: '',
    };
  },
  computed: {
    selectedDate() {
      return new Date(this.picker).toLocaleDateString();
    },
  },
  methods: {
    sendRequest() {
      // Implement your logic to send the request here
      console.log('Request Sent');
    },
  },
  watch: {
    picker() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style scoped>
/* Add styling for the form elements here */
.v-form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
}

.v-text-field,
.v-select,
.v-radio-group {
  margin-bottom: 15px;
}
</style>
