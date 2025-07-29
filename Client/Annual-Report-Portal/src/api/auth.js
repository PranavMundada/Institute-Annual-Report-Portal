import axiosInstance from '../utils/axios-instance';

export const signupUser = (data) => {
  return axiosInstance.post('/api/users/signup', data);
};

export const loginUser = (data) => {
  return axiosInstance.post('/api/users/login', data);
};

export const getUserDetails = () => {
  return axiosInstance.get('/api/me');
};
