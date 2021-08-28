import axios from "axios";
import AuthenticationService from "../components/security/AuthenticationService";

// const BASE_URL = "http://kostasvidalis.eu:8082/api";
const BASE_URL = "http://localhost:8082/api";

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});


const api = {
  getCategories: () => {
    return instance.get(`/categories/`);
  },
  saveCategory: (category) => {
    return instance.post(`/categories`, category);
  },
  getCategoryPosts: (categoryId) => {
    return instance.get(`/categories/${categoryId}/posts`);
  },
  savePost: (categoryId, post) => {
    return instance.post(`/categories/${categoryId}/posts`, post);
  },
  getPostComments: (postId) => {
    return instance.get(`/posts/${postId}/comments`);
  },
  submitLike: (postId, userId) => {
    return instance.post(`/posts/${postId}/${userId}/likes`);
  },
  saveComment: (postId, payload) => {
    return instance.post(`/posts/${postId}/comments`, payload);
  },
  register: (payload) => {
    return instance.post(`/register`, payload);
  },
  login: (username, password) => {
    return instance.post(`/login`,{username:username,password:password})
  },
  logout: () => {
    return instance.get(`/logout`)
  }
};

export { api , BASE_URL };
