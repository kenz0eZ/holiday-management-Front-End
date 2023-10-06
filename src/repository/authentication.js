import axios, {patch, put} from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
});
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
    async listUsers(body) {
        try {
            const response = await apiClient.get("api/user", {
                headers: {
                    Authorization: `Bearer ${body.token}` // Adding the bearer token to the headers
                }
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
            console.log(response);
            return response; // Return the full response object
        } catch (error) {
            console.error('Failed to Login:', error);
            throw error;
        }
    },
    async updateUser(body) {
        try {
            const response = await axios.patch(`user/${body.id}`, body);
            if (response.data.resFlag) {
                const userJson = response.data;
                return userJson;
            } else {
                throw new UsersError('Invalid id');
            }
        } catch (error) {
            console.error('Failed to update user:', error);
            throw error;
        }
    }

};
