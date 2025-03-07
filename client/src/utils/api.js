import axios from 'axios';

// Use environment variable directly instead of importing from config
const API_URL = (window._env_ && window._env_.REACT_APP_API_URL) || 'http://localhost:5000/api';

// Helper to get authentication headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};

export const addAgent = async (agentData) => {
    try {
        const response = await axios.post(`${API_URL}/agents/register`, agentData, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};

export const uploadCSV = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/lists/upload`, formData, {
            headers: {
                ...getAuthHeaders(),
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};

export const fetchAgents = async () => {
    try {
        const response = await axios.get(`${API_URL}/agents`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};

export const fetchDistributionList = async () => {
    try {
        const response = await axios.get(`${API_URL}/lists/distribution`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};

export const loginAgent = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/agents/login`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};

export const getAgentById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/agents/${id}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};

export const updateAgent = async (id, agentData) => {
    try {
        const response = await axios.put(`${API_URL}/agents/${id}`, agentData, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};

export const deleteAgent = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/agents/${id}`, {
            headers: getAuthHeaders()
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : { message: 'Network error' };
    }
};