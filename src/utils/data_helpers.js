import { accessToken } from "../../token";
const API_BASE = "https://api.github.com";

const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response.json();
};

export const getUserData = (username, callback) => {
  fetch(`${API_BASE}/users/${username}?access_token=${accessToken}`)
    .then(checkResponse)
    .then(data => callback(null, data))
    .catch(err => {
      callback(err);
    });
};

export const getRepos = (url, callback) => {
  fetch(`${url}?access_token=${accessToken}`)
    .then(checkResponse)
    .then(data => callback(null, data))
    .catch(err => {
      callback(err);
    });
};
