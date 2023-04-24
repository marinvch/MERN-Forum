import axios from "axios";

const isProduction = process.env.NODE_ENV === 'production';

const url = isProduction ? 'https://marin-forum.herokuapp.com' : 'http://localhost:5000';

export const getAllPosts = () => {
  return axios.get(`${url}/posts`);
};

export const getPost = (id) => {
  return axios.get(`${url}/posts/${id}`);
};
