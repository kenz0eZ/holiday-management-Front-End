import Vue from 'vue';
import Vuex from 'vuex';
import authenticationRepo from '@/repository/authentication';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    registerUser( { commit }, body) {
      return authenticationRepo.registerUser(body);
    },
    // eslint-disable-next-line no-unused-vars
    verificationLink( { commit }, body) {
      return authenticationRepo.verificationLink(body);
    },
    // eslint-disable-next-line no-unused-vars
    loginUser( { commit }, body) {
      return authenticationRepo.loginUser(body);
    },
    // eslint-disable-next-line no-unused-vars
    logOutUser( { commit }, token) {
      console.log('MODULE', token);
      return authenticationRepo.logOutUser(token);
    },

  },
});
