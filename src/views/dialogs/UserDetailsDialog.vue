
  <v-dialog v-model="dialog" max-width="1000" width="100%">
    <v-card>
      <v-card-title class="headline">User Details</v-card-title>
      <v-card-text>
        <!-- Add your content for user details here -->
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


<script>
export default {
  props: {
    value: Boolean,
  },
  data() {
    return {
      dialog: this.value,
    };
  },
  methods: {
    closeDialog() {
      this.$emit('input', false); // Close the dialog
    },
  },
};
</script>
