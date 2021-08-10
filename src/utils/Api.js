import axios from "axios";
const BASE_URL = "http://kostasvidalis.eu:8082/api";

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
  savePost: (categoryId, post) => {
    return axios.post(`${BASE_URL}/categories/${categoryId}/posts`, post);
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

export { api , BASE_URL };
