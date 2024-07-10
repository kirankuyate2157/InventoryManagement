import axios from "axios";


export const createCombo= async (data) => {
    try {
        const response = await axios.post('/combo/create', data);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error registering user';
    }
};
