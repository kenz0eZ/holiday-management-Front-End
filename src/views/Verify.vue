<template>
  <div class="verify-email text-center">
    <h1>{{ message }}</h1>
    <p>Thank you for verifying your email!</p>
    <v-btn @click="redirectToLogin" outlined>Log In</v-btn>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      message: '',
    };
  },
  computed: {
    ...mapActions(['verifyEmail']),
  },
  mounted() {
    this.verifyEmailFromLink();
  },
  methods: {
    async verifyEmailFromLink() {
      try {
        const link = this.getVerificationLink();
        console.log('Generated Verification Link:', link);

        const response = await this.$store.dispatch('verifyEmail', link);
        console.log('Response from verifyEmail:', response);

        if (response.status === 201) {
          this.message = response.data.status || 'Email verification failed';
          // Handle success as needed
        } else if (response.status === 200) {
          this.message = response.data.status || 'Email verification failed';
        }
      } catch (error) {
        console.error('Failed to verify email:', error);
        // Handle error as needed
      }
    },
    getVerificationLink() {
      const url = new URL(window.location.href);
      const hostWithoutLocalhost = url.hostname === 'localhost' ? '' : url.hostname;
      return `${hostWithoutLocalhost}${url.pathname}${url.search}${url.hash}`;
    },
    redirectToLogin () {
       this.$router.push('/login');
    },
  },
};
</script>
<style scoped>
.verify-email {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}
</style>
