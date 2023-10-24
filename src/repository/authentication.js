import axios, {patch, put} from "axios";

const apiClient = axios.create({
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
            return response; // Return the full response object
        } catch (error) {
            console.error('Failed to Register:', error);
            throw error;
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
    async logOutUser (token){
        try {
            const response = await apiClient.post("/logout", token)
            return response;
        } catch (error) {
            console.error('Failed to Logout:', error);
            throw error;
        }
    },
    async verificationLink(body) {
        try {
            const response = await apiClient.post(
                "/email/verification-notification",
                { email: body.email }, // Sending email in the request body
                {
                    headers: {
                        Authorization: `Bearer ${body.token}` // Adding the bearer token to the headers
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
            return response; // Return the full response object
        } catch (error) {
            console.error('Failed to Login:', error);
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
          console.log(error);
          throw error;
      }
    },

};
