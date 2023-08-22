<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title class="headline">User Details</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Name" v-model="user.name"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Email" v-model="user.email"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    user: Object, // Passed from parent component
    value: Boolean, // Controls the visibility of the dialog
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
    closeDialog() {
      this.dialog = false; // Close the dialog
    },
  },
};
</script>