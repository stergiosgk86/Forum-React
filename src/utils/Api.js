import axios from "axios";

// const BASE_URL = "http://stergiosgk.xyz:8082/api";
const BASE_URL = "http://localhost:8082/api";

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

instance.interceptors.response.use(
  (response) => {
    if (response.status === 201) {
      return Promise.reject(
        "Congratulations! You have been successfully registered"
      );
    }
    return response;
  },
  (error) => {
    if (error.response.status === 403 || error.response.status === 500) {
      window.location = "/login";
    } else if (error.response.data.statusCode === "USERNAME_ALREADY_EXISTS") {
      return Promise.reject(
        "Username already exists. Please try with another one."
      );
    } else if (error.response.data.statusCode === "EMAIL_ALREADY_EXISTS") {
      return Promise.reject(
        "Email already exists. Please try with another one."
      );
    } else if (error.response.data.statusCode === "UNAUTHORIZED") {
      return Promise.reject(
        "Wrong credentials! The Username or Password you have entered is incorrect. Please try again"
      );
    } else if (error.response.status === 500) {
      console.log("500 Error");
    }
  }
);

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
    return instance.post(`/login`, { username: username, password: password });
  },
  logout: () => {
    return instance.get(`/logout`);
  },
};

export { api, BASE_URL };
