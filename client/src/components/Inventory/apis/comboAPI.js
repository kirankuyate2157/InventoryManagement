import axios from "axios";


export const createCombo = async (data) => {
    try {
        const response = await axios.post('/combo/create', data);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error registering user';
    }
};


export const updateComboItem = async (comboId, itemId, data) => {
    try {
        console.log('Updating combo : ', comboId, itemId, data)
        const response = await axios.patch(`/combo/update-item/${comboId}/${itemId}`, data);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error retrieving combo data ';
    }
};
export const getCombo = async (data) => {
    try {
        const response = await axios.get('/combo/all', data);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error retrieving combo data ';
    }
};

