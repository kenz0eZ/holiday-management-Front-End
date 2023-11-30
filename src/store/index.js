import Vue from 'vue';
import Vuex from 'vuex';
import authenticationRepo from '@/repository/authentication';
import authentication from "@/repository/authentication";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
    users: [],
    vacationType: [],
    deletedUsers:[],
    inqueries:[],
    roleName: '',
    allInqueries:[],
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    GET_INQUERIES(state, inqueries) {
      state.inqueries = inqueries;
    },
    GET_ALL_INQUERIES(state,allInqueries){
      state.allInqueries = allInqueries
    },
    SET_VACATION_TYPES(state, commit) {
      state.vacationType = commit;
    },
    SET_DELETED_USERS(state,deletedUsers){
      state.deletedUsers = deletedUsers
    },
    SET_ROLE_NAME(state, payload){
      console.log('payload', payload);
      state.roleName = payload
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
    verifyEmail({commit}, body) {
      console.log('BODY', body);
      return authenticationRepo.verifyEmail(body);
    },
    // eslint-disable-next-line no-unused-vars
    async loginUser({ commit }, body) {
      try {
        const response = await authenticationRepo.loginUser(body);
        const roleName = response.data.role;
        commit('SET_ROLE_NAME', roleName);

        return response;
      } catch (error) {
        // Handle error or rethrow it
        throw error;
      }
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
    async getMyInqueries({commit}, token) {
      const response = await authenticationRepo.getMyInqueries(token);
      commit('GET_INQUERIES', response.data); // Commit the users to the state
      return response;
    },
    async getInqueries({commit}, token) {
      const response = await authenticationRepo.getInqueries(token);
      commit('GET_ALL_INQUERIES', response.data); // Commit the users to the state
      return response;
    },

    async vacationTypes({commit}, token) {
      const response = await authenticationRepo.vacationTypes(token);
      commit('SET_VACATION_TYPES', response); // Commit the users to the state
      return response;
    },
    async listDeletedUsers({commit}) {
      const response = await authenticationRepo.listDeletedUsers();
      commit('SET_DELETED_USERS', response.data); // Commit the users to the state
      return response;
    },
    restoreUser({commit},id){
      return authenticationRepo.restoreUser(id)
          ;
    },
  },
});