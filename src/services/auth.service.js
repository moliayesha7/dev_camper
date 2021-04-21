import axios from "axios";

const API_URL = "http://115.127.8.84:8080/api/v1/auth/";

const register = (name, email, password,selectedRole) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
    selectedRole,
  });
  
};

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("user")
};

export default {
  register,
  login,
  logout,
};
