import axios from "axios";

const API = "http://localhost:5000/api/notifications";

export const getNotifications = () =>
  axios.get(API, {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });

export const markAsRead = (id) =>
  axios.patch(`${API}/${id}`, {}, {
    headers: {
      Authorization: localStorage.getItem("token")
    }
  });