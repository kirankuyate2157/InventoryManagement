import axios from "axios";


export const createInventory = async (data) => {
    try {
        const response = await axios.post('/inventory/create', data);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error registering user';
    }
};


export const updateInventory = async (id, data) => {
    try {
        const response = await axios.patch(`/inventory/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error registering user';
    }
};
export const updateInventoryBatch = async (data) => {
    try {
        const response = await axios.patch(`/inventory/update-batch`, data);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error registering user';
    }
};


export const getAllInventory = async () => {
    try {
        const response = await axios.get(`/inventory/all`);
        return response.data;
    } catch (error) {
        throw error.response.data.message || 'Error registering user';
    }
};