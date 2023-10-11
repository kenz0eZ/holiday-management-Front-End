import Vue from 'vue';
import Vuex from 'vuex';
import authenticationRepo from '@/repository/authentication';
import authentication from "@/repository/authentication";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    users: [],
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    registerUser({commit}, body) {
      return authenticationRepo.registerUser(body);
    },
    // eslint-disable-next-line no-unused-vars
    verificationLink({commit}, body) {
      return authenticationRepo.verificationLink(body);
    },
    // eslint-disable-next-line no-unused-vars
    loginUser({commit}, body) {
      return authenticationRepo.loginUser(body);
    },
    // eslint-disable-next-line no-unused-vars
    logOutUser({commit}, token) {
      return authenticationRepo.logOutUser(token);
    },
    deleteUser({commit},id){
      return authenticationRepo.deleteUser(id);
    },
    async listUsers({commit}, token) {
      const response = await authenticationRepo.listUsers(token);
      commit('SET_USERS', response.data); // Commit the users to the state
      return response;
    }
  },
  async updateUser({commit}, body) {
    const res = await authentication.updateUser(body);
    return res;
  },
});
