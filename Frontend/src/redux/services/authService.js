import axios from "axios";

const isProduction = process.env.NODE_ENV === 'production';

const url = isProduction ? 'https://marin-forum.herokuapp.com' : 'http://localhost:5000';

export const loginUser = (userData) => {
  const response = axios.post(`${url}/users/login`, { ...userData });
  return response;
};
export const registerUser = async (userData) => {
  const response = await axios.post(`${url}/users/register`, userData);
  return response;
}
