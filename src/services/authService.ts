import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_KEY;

export const login = (data: { email: string; password: string }) => {
  return axios.post(`${BASE_URL}/auth/login`, data);
};

export const register = (data: { name: string; email: string; password: string;  }) => {
  return axios.post(`${BASE_URL}/auth/register`, data);
};
