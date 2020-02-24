import { token } from "../token";

const checkResponse = response => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response.data;
};

export const getUserData = (username, direction) => {
  return axios
    .get(
      `https://api.github.com/users/${username}${
        direction ? direction : ""
      }?access_token=${token}`
    )
    .then(checkResponse)
    .catch(function(err) {
      throw new Error(`fetch getUserData failed ${err}`);
    });
};
