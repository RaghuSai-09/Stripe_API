import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

export const login = payload => api.post(`/users/login`, payload);
export const signup = payload => api.post(`/users/signup`, payload);
export const UpdatePlan = payload => api.post(`/users/plans`,payload);
export const getPlans = (userId) => api.get(`/users/plan/${userId}`);
export const payment = payload => api.post(`/users/payment`, payload);
