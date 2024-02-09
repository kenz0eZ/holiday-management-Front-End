<template>
  <v-container>
    <v-row align="center" justify="center" >
          <v-col cols="12" sm="10">
            <v-card class="elevation-10 mt-10" style="border-radius:50px;">
             <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="6">
                      <div class="mx-2 mt-15">
                        <h2
                          class="text-center"
                        >Login to Your Account</h2>
                        <h5
                          class="mt-6 text-center"
                        >
                          Login to your account so you can continue builiding
                          <br>and editing your onboarding flows</h5>
                        <p style="border-bottom:1px solid #ccc; margin-top:30px;"></p>
                          <v-card class="px-10 ml-3 elevation-10" style="border-radius:15px;">
                              <v-text-field
                                  v-model="user.email"
                                  label="Email"

                                  dense
                                  color="#19003F"
                                  autocomplete="false"
                                  class="mt-10 pt-10"
                              />
                              <v-text-field
                                  v-model="user.password"
                                  label="Password"
                                  dense
                                  class="mt-5"
                                  color="#19003F"
                                  autocomplete="false"

                              />
                              <v-row>
                                <v-col cols="12" sm="7">
                                  <v-checkbox

                                      label="Remember Me"
                                      class="mt-5"
                                      color="#19003F"
                                  > </v-checkbox>
                                </v-col>
                                <!--                              <v-col cols="12" sm="5">-->
                                <!--                                <span class="caption blue&#45;&#45;text">Forgot password</span>-->
                                <!--                              </v-col>-->
                              </v-row>
                              <v-btn @click="login" color="#19003F" style="color:white;" width="100%" class="mt-3 mb-10" rounded>Log in</v-btn>

                              <!--                         <h5-->
                              <!--                          class="text-center  grey&#45;&#45;text mt-4 mb-3"-->
                              <!--                        >Or Log in using</h5>-->
                              <div class="d-flex  justify-space-between align-center mx-10 mb-16">
                                <!--                        <v-btn depressed outlined color="grey">-->
                                <!--                          <v-icon color="red">fab fa-google</v-icon>-->
                                <!--                        </v-btn>-->
                                <!--                        <v-btn depressed outlined color="grey">-->
                                <!--                          <v-icon color="blue">fab fa-facebook-f</v-icon>-->
                                <!--                        </v-btn>-->
                                <!--                        <v-btn depressed outlined color="grey">-->
                                <!--                          <v-icon color="light-blue lighten-3">fab fa-twitter</v-icon>-->
                                <!--                        </v-btn>-->
                              </div>
                          </v-card>

                      </div>
                    </v-col>
                    <v-col md="6">
                    <div style="text-align: center; background-color: #19003F; height: 100%;"  class="d-flex align-center justify-center flex-column">
                      <v-card-text class="white--text" >
                        <h2 class="text-center mt-13">Don't Have an Account Yet?</h2>
                        <h4
                          class="text-center mt-3"
                        >Let's get you all set up so you can start creating your your first  onboarding experience</h4>
                      </v-card-text>
                      <div class="text-center" style="width:80%;">
                        <v-btn @click="step++" class="mt-2" style="width:100%;" rounded>SIGN UP</v-btn>
                      </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row >
                    <v-col cols="12" md="6">
                     <div style="text-align: center; background-color: #19003F; height: 100%;" class="d-flex align-center justify-center flex-column">
                      <v-card-text class="white--text" >
                        <h2 class="text-center mt-13 ">Alredy Signed up?</h2>
                        <h4
                          class="text-center mt-3"
                        >Log in to your account so you can continue building and  editing your onboarding flows</h4>
                      </v-card-text>
                      <div class="text-center" style="width:80%;">
                        <v-btn @click="step++" class="mt-2" style="width:100%;" rounded>Log in</v-btn>
                      </div>
                      </div>
                    </v-col>

                    <v-col>
                      <v-card-text class="mt-12">
                        <h2
                          class="text-center"
                        >Sign Up for an Account</h2>
                        <h4
                          class="text-center mt-7"
                        >Let's get you all set up so you can start creating your
                          first onboarding experience </h4>
                        <v-card class="mt-15 pa-5 mr-5" style="border-radius:15px;" elevation="10">
                                <v-text-field
                                    v-model="user.name"
                                    label="First Name"
                                    color="#19003F"
                                />
                                <v-text-field
                                    v-model="user.surname"
                                    label="Last Name"
                                    class="mt-n3"
                                    color="#19003F"
                                />
                            <v-text-field
                                v-model="user.email"
                                label="Email"
                                class="mt-n3"
                                color="#19003F"
                            />
                            <v-text-field
                                v-model="user.password"
                                label="Password"
                                type="password"
                                color="#19003F"
                                class="mt-n3"
                            />
                          <v-text-field
                              v-model="user.password_confirmation"
                              label="Password Confirmation"
                              type="password"
                              color="#19003F"
                              class="mt-n3"
                              @input="checkPasswords"
                          />
                          <div v-if="errorMessage" class="error-message d-flex justify-space-around pb-3 mt-n3">
            <span v-for="(error, key) in errorMessage" :key="key">
                <span v-for="message in error">{{ message }}</span><br>
            </span>
                          </div>
                          <div style="width:90%" class="d-flex align-center justify-center mx-5 m">
                            <v-btn @click="register" style="color:white;" color="#19003F" width="100%" rounded >Sign up</v-btn>
                          </div>
                        </v-card>
                      </v-card-text>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
      </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex';


export default {
  data() {
    return {
      passwordSame : false,
      step: 1,
      user: {
        name: '',
        surname: '',
        email: '',
        is_manager:false,
        password: null,
        password_confirmation: null,
        date_of_birth: '1999-06-25'
      },
      registrationResponse: null,
      verificationResponse: null,
      loginResponse: null,
      errorMessage: '',
      props: {
        source: String
      },
    };
  },
  computed: {
    ...mapActions(['registerUser', 'loginUser']),
  },
  methods: {
    checkPasswords(){
      if (this.user.password_confirmation === this.user.password){
        return true;
      }
      return false;
    },

    async login() {
      const body = {
        email: this.user.email,
        password: this.user.password,
      };

      this.loginResponse = await this.$store.dispatch('loginUser', body);

      if (this.loginResponse && this.loginResponse.status === 200) {
        const token = this.loginResponse.data.token;
        const role = this.loginResponse.data.role;
        const userId = this.loginResponse.data.user.id;
        localStorage.setItem('token', token);
        localStorage.setItem('role',role);
        localStorage.setItem('id', userId );

        // await this.$store.dispatch('setAuthToken', token);
        if(role==='Employee'){
          await this.$router.push('/mycalendar');
        }
        if(role ==='Manager'){
          await this.$router.push('/dashboard')
        }

      }
    },

    async register() {
      const body = this.user;

      try {
        this.registrationResponse = await this.$store.dispatch('registerUser', body);

        if (this.registrationResponse && (this.registrationResponse.status === 201 || this.registrationResponse.status === 200)) {
          this.step = 1;
          const body = {
            email: this.registrationResponse.data.user.email,
            token: this.registrationResponse.data.token,
          };
          this.verificationResponse = await this.$store.dispatch('verificationLink', body);
        }
      } catch (error) {
        // Handle error response from the API
        console.error('Registration Error:', error);
        this.errorMessage = error;
      }
    },
  },
};
</script>
<style scoped>
.error-message {
  color: red;
  text-align: center;
  animation: blink-animation 1s infinite alternate; /* Blinking animation */
}

@keyframes blink-animation {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.v-application .rounded-bl-xl {
    border-bottom-left-radius: 300px !important;
}
.v-application .rounded-br-xl {
    border-bottom-right-radius: 300px !important;
}
</style>
