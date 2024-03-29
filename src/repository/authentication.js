import axios, {patch, put} from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

const apiClientNoAuth = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

apiClient.interceptors.request.use(
    (config) => {
        // Retrieve the token from local storage or wherever you store it
        const token = localStorage.getItem('token'); // Replace with your token retrieval logic

        // If a token is available, add it to the request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default {
    async registerUser (body) {
        try {
            const response = await apiClient.post("/register", body);
            localStorage.setItem('token', response.data.token);
            return response; // Return the full response object
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                throw error.response.data.errors;
            } else {
                console.error('Failed to Register:', error);
                throw error;
            }
        }
    },
    async listUsers() {
        try {
            const response = await apiClient.get("api/user", {
            });
            return response.data; // Return the response data
        } catch (error) {
            console.error('Failed to list users:', error);
            throw error;
        }
    },
    async getMyInqueries() {
        try {
            const response = await apiClient.get("api/myInquires", {
            });
            return response.data; // Return the response data
        } catch (error) {
            console.error('Failed to list users:', error);
            throw error;
        }
    },
    async getInqueries() {
        try {
            const response = await apiClient.get("api/inquire", {
            });
            return response.data; // Return the response data
        } catch (error) {
            console.error('Failed to list users:', error);
            throw error;
        }
    },
    async vacationTypes() {
        try {
            const response = await apiClient.get("api/types", {
            });
            return response.data; // Return the response data
        } catch (error) {
            console.error('Failed to list users:', error);
            throw error;
        }
    },
    async listDeletedUsers() {
        try {
            const response = await apiClient.get("api/archivedUsers", {
            });
            return response.data; // Return the response data
        } catch (error) {
            console.error('Failed to list users:', error);
            throw error;
        }
    },


    async getUser(id) {
        try {
            const response = await apiClient.get(`api/user/${id}`, {
            });
            return response.data; // Return the response data
        } catch (error) {
            console.error('Failed to list users:', error);
            throw error;
        }
    },

    async logOutUser (token){
        try {
            const response = await apiClient.post("/logout", token)
            localStorage.removeItem('token');
            return response;
        } catch (error) {
            console.error('Failed to Logout:', error);
            throw error;
        }
    },
    async verificationLink(body) {
        const token = localStorage.getItem('token');
        try {
            const response = await apiClient.post(
                "/email/verification-notification",
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Adding the bearer token to the headers
                    }
                }
            );

            return response; // Return the full response object
        } catch (error) {
            console.error('Failed to send verification link:', error);
            throw error;
        }
    },
    async loginUser (body) {
        try {
            const response = await apiClient.post("/login", body);
            localStorage.setItem('token', response.data.token);
            return response; // Return the full response object
        } catch (error) {
            console.error('Failed to Login:', error);
            throw error;
        }
    },
    async updateInquireStatus({ inquireId, statusId }) {
        try {
            const response = await apiClient.patch(`api/inquire/${inquireId}`, { status_id: statusId });
            return response.data; // Return the updated data if needed
        } catch (error) {
            console.error('Failed to update inquiry status:', error);
            throw error;
        }
    },
    async createUser (body) {
        try {
            const response = await apiClient.post("api/user", body);
            return response; // Return the full response object
        } catch (error) {
            console.error('Failed to Login:', error);
            throw error;
        }
    },
    async deleteUser (id) {
        try {
            const response = await apiClient.delete(`api/user/${id}`);
            return response; // Return the full response object
        } catch (error) {
            console.error('Failed to Login:', error);
            throw error;
        }
    },
    // async updateUser (user) {
    //     try {
    //         const response = await apiClient.patch(`api/user/${id}`);
    //         return response; // Return the full response object
    //     } catch (error) {
    //         console.error('Failed to Login:', error);
    //         throw error;
    //     }
    // },
    async editUser(user){
      try{
          const response = await apiClient.patch(`api/user/${user.id}`, {
              name: user.name,
              surname: user.surname,
              email:user.email,
          });
          return response;
      }
      catch(error){
          throw error;
      }
    },
    async editUser2(user){
        try{
            const response = await apiClient.patch(`api/user/${user.id}`, {
                name: user.name,
                surname: user.surname,
                email:user.email,
                vacation_days:user.vacation_days,
                company:user.company,
                date_of_birth:user.date_of_birth,
            });
            return response;
        }
        catch(error){
         //   console.log(error);
            throw error;
        }
    },
    async makeReservation(body){
      const response = await apiClient.post('api/inquire',body)
        return response;
    },

    async restoreUser(user){
        try{
            const response = await apiClient.patch(`api/restoreUser/${user.id}`);
            return response;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    },
    async verifyEmail(link) {
        try{
            const response = await apiClientNoAuth.get(`${link}`);
            return response;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

};
