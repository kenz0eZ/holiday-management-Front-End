import axios from "axios";

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
};
