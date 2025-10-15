import axios from "axios";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  remember: boolean
) => {
  const response = await axios.post("http://localhost:8000/api/auth/register", {
    name,
    email,
    password,
    remember,
  });
  if (response.status !== 200) {
    throw new Error("Failed to register user");
  }
  return { status: response.status, data: response.data };
};

export const loginUser = async (
  email: string,
  password: string,
  remember: boolean
) => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/login",
    {
      email,
      password,
      remember,
    },
    { withCredentials: true }
  );
  if (response.status !== 200) {
    throw new Error("Failed to login user");
  }
  return { status: response.status, data: response.data };
};

export const verifyUser = async (email: string) => {
  const response = await axios.post("http://localhost:8000/api/auth/verify", {
    email,
  });
  return { status: response.status };
};

export const logoutUser = async () => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/logout",
    {},
    { withCredentials: true }
  );
  if (response.status !== 200) {
    throw new Error("Failed to logout user");
  }
  return { status: response.status, data: response.data };
};

export const auth = async () => {
  const response = await axios.get("http://localhost:8000/api/auth/login", {
    withCredentials: true,
  });
  if (response.status !== 200) {
    throw new Error("Failed to ping server");
  }
  return { status: response.status, data: response.data };
};
