import axios from "axios";

const API = "http://localhost:5000/api/bookmarks";

export const toggleBookmark = (postId) =>
  axios.post(`${API}/${postId}`, {}, {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });

export const getBookmarks = () =>
  axios.get(API, {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });