import axios from "axios";
import { VueCookies } from 'vue-cookies';

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
});
export default {
    async registerUser (body) {
        try {
            const response = await apiClient.post("/register", body);
            const token = response.data.token;
            VueCookies.set('auth_token', token);
            return response; // Return the full response object
        } catch (error) {
            console.error('Failed to Register:', error);
            throw error;
        }
    },
    async verificationLink(body) {
        try {
            const token = VueCookies.get('auth_token');

            if (!token) {
                // Handle the case where the token is not present in the cookie
                console.error('Token not found in cookie');
                return;
            }
            const response = await apiClient.post(
                "/email/verification-notification",
                { email: body.email }, // Sending email in the request body
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
            console.log(response);
            return response; // Return the full response object
        } catch (error) {
            console.error('Failed to Login:', error);
            throw error;
        }
    },
    async logOutUser (token){
        try {
            const response = await apiClient.post("/logout", token)
            console.log('LOGOGOGOUT', response);
            return response;
        } catch (error) {
            console.error('Failed to Logout:', error);
            throw error;
        }
    }
};
