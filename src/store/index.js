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
    updateInquery:null,
    userDetails:[],
    setInq:[],
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
    SET_ROLE_NAME(state, roleName) {
      state.roleName = roleName;
    },
    UPDATE_INQUIRE_STATUS(state,update){
      state.updateInquery = update;
    },
    GET_USER_DETAILS(state,payload){
      state.userDetails = payload;
    },
    SET_INQUERIES(state, inqueries) {
      state.setInq = inqueries;
    },
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
      return authenticationRepo.verifyEmail(body);
    },
    // eslint-disable-next-line no-unused-vars
    async loginUser({ commit }, body) {
      try {
        const response = await authenticationRepo.loginUser(body);
        const roleName = response.data.role;
        commit('SET_ROLE_NAME', roleName);
      //  console.log('THIS IS RESP : ' , response);
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
    async updateUser({commit},id){
      return await authenticationRepo.updateUser(id);
    },
    async getUser({commit},id){
      const response = await authenticationRepo.getUser(id);
      commit('GET_USER_DETAILS', response.data);
      return response.data;
      // return authenticationRepo.getUser(id);

    },
      makeReservation({commit},body){
        return authenticationRepo.makeReservation(body);
      },
    async updateInquire({ commit }, body) {
      try {
        const response = await authenticationRepo.updateInquireStatus(body);
        // Commit a mutation if needed
        commit('UPDATE_INQUIRE_STATUS', response);
        return response; // Return the updated data if needed
      } catch (error) {
        console.error('Failed to update inquiry status:', error);
        throw error;
      }
    },
    createUser({commit},body){
      return authenticationRepo.createUser(body);
    },
    editUser({commit},body){
      return authenticationRepo.editUser(body);
    },
    editUser2({commit},body){
      return authenticationRepo.editUser2(body);
    },
    async listUsers({commit}, token) {
      const response = await authenticationRepo.listUsers(token);
      commit('SET_USERS', response.data); // Commit the users to the statecon
      return response;
    },
    async getMyInqueries({ commit }, token) {
      try {
        const response = await authenticationRepo.getMyInqueries(token);
        // Commit the new inquiries to the state
        commit('SET_INQUERIES', response);
      } catch (error) {
        console.error('Error fetching inqueries:', error);
      }
    },
    async getInqueries({commit}, token) {
      const response = await authenticationRepo.getInqueries(token);
      commit('GET_ALL_INQUERIES', response); // Commit the users to the state
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
  getters: {
    getRoleName: (state) => state.roleName,
  },
});