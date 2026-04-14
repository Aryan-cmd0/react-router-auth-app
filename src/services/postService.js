import axios from "axios";

const API = "http://localhost:5000/api/posts";

const getAuthHeader = () => ({
  headers: {
    Authorization: localStorage.getItem("token")
  }
});

export const getPosts = () => axios.get(API);

export const createPost = (data) =>
  axios.post("http://localhost:5000/api/posts", data, {
    headers: {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "multipart/form-data"
    }
  });
export const deletePost = (id) =>
  axios.delete(`${API}/${id}`, getAuthHeader());

export const likePost = (id) =>
  axios.post(`${API}/like/${id}`, {}, getAuthHeader());