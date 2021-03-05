import axios from "axios";
const BASE_URL = "http://localhost:8082/api";

const api = {
  getCategories: () => {
    return axios.get(`${BASE_URL}/categories/`);
  },
  saveCategory: (category) => {
    return axios.post(`${BASE_URL}/categories`, category);
  },
  getCategoryPosts: (categoryId) => {
    return axios.get(`${BASE_URL}/categories/${categoryId}/posts`);
  },
  savePost: (categoryId, payload) => {
    return axios.post(`${BASE_URL}/categories/${categoryId}/posts`, payload);
  },
  getPostComments: (postId) => {
    return axios.get(`${BASE_URL}/posts/${postId}/comments`);
  },
  submitLike: (postId, userId) => {
    return axios.post(`${BASE_URL}/posts/${postId}/${userId}/likes`);
  },
  saveComment: (postId, payload) => {
    return axios.post(`${BASE_URL}/posts/${postId}/comments`, payload);
  },
};

export { api };
