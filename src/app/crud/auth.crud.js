import axios from "axios";


export const API_URL = process.env.REACT_APP_API_URL;
export const LOGIN_URL = 'api/users/sign_in';
export const REGISTER_URL = "api/auth/register";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "api/me";

export function login(email, password) {
  return axios.post(`${API_URL}/${LOGIN_URL}`, { email, password });
}

export function register(email, fullname, username, password) {
  return axios.post(REGISTER_URL, { email, fullname, username, password });
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(`${API_URL}/${ME_URL}`);
}
