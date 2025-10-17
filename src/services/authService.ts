import axios from 'axios';
import {
  API_BASE_DOMAIN,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  VERIFY_USER,
} from '../constants/service';

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  remember: boolean
) => {
  const response = await axios.post(
    `${API_BASE_DOMAIN}${REGISTER_USER}`,
    {
      name,
      email,
      password,
      remember,
    },
    { withCredentials: true }
  );
  if (response.status !== 200) {
    throw new Error('Failed to register user');
  }
  return { status: response.status, data: response.data };
};

export const loginUser = async (
  email: string,
  password: string,
  remember: boolean
) => {
  const response = await axios.post(
    `${API_BASE_DOMAIN}${LOGIN_USER}`,
    {
      email,
      password,
      remember,
    },
    { withCredentials: true }
  );
  if (response.status !== 200) {
    throw new Error('Failed to login user');
  }
  return { status: response.status, data: response.data };
};

export const verifyUser = async (email: string) => {
  const response = await axios.post(`${API_BASE_DOMAIN}${VERIFY_USER}`, {
    email,
  });
  return { status: response.status };
};

export const logoutUser = async () => {
  const response = await axios.post(
    `${API_BASE_DOMAIN}${LOGOUT_USER}`,
    {},
    { withCredentials: true }
  );
  if (response.status !== 200) {
    throw new Error('Failed to logout user');
  }
  return { status: response.status, data: response.data };
};

export const auth = async () => {
  const response = await axios.get(`${API_BASE_DOMAIN}${LOGIN_USER}`, {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error('Failed to ping server');
  }
  return { status: response.status, data: response.data };
};
