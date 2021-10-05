import axios from "axios";

// const BASE_URL = "http://stergiosgk.xyz:8082/api";
const BASE_URL = "http://localhost:8082/api";

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

const api = {
  getCategories: () => {
    return instance.get(`/categories`);
  },
  saveCategory: (category) => {
    return instance.post(`/categories`, category);
  },
  getCategoryPosts: (categoryId) => {
    return instance.get(`/categories/${categoryId}/posts`);
  },
  updateCategory: (categoryId, payload) => {
    return instance.put(`/categories/${categoryId}`, payload);
  },
  deleteCategory: (categoryId) => {
    return instance.delete(`/categories/${categoryId}`);
  },
  savePost: (categoryId, post, options) => {
    return instance.post(`/categories/${categoryId}/posts`, post, options);
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
    return instance.post(`/login`, { username: username, password: password });
  },
  logout: () => {
    return instance.get(`/logout`);
  },
  getUsers: () => {
    return instance.get(`/users`);
  },
  getUserById: (userId) => {
    return instance.get(`users/${userId}`);
  },
  updateUser: (userId, payload) => {
    return instance.put(`users/${userId}`, payload);
  },
  deleteUser: (userId) => {
    return instance.delete(`users/${userId}`);
  },
  saveUser: (payload) => {
    return instance.post(`/users`, payload);
  },
  getRoles: () => {
    return instance.get("users/roles");
  },
};

export { api, BASE_URL, instance };
