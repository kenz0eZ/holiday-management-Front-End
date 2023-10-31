import Vue from 'vue';
import Vuex from 'vuex';
import authenticationRepo from '@/repository/authentication';
import authentication from "@/repository/authentication";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    users: [],
    deletedUsers:[],
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_DELETED_USERS(state,deletedUsers){
      state.deletedUsers = deletedUsers
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
    makeReservation({commit},body){
      return authenticationRepo.makeReservation(body);
    },
    createUser({commit},body){
      return authenticationRepo.createUser(body);
    },
    editUser({commit},body){
      return authenticationRepo.editUser(body);
    },
    async listUsers({commit}, token) {
      const response = await authenticationRepo.listUsers(token);
      commit('SET_USERS', response.data); // Commit the users to the state
      return response;
    },
    async listDeletedUsers({commit}) {
      const response = await authenticationRepo.listDeletedUsers();
      commit('SET_DELETED_USERS', response.data); // Commit the users to the state
      return response;
    },
    restoreUser({commit},id){
      return authenticationRepo.restoreUser(id);
    },
  },
});
