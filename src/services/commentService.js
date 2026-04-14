import axios from "axios";

export const getComments = (postId) =>
  axios.get(`http://localhost:5000/api/posts/${postId}/comments`);

export const addComment = (postId, text) =>
  axios.post(`http://localhost:5000/api/posts/${postId}/comments`, { text });

export const deleteComment = (postId, commentId) =>
  axios.delete(`http://localhost:5000/api/posts/${postId}/comments/${commentId}`);