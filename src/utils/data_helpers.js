const API_BASE = "https://api.github.com";

export const getUserData = (username, callback) => {
  fetch(
    `${API_BASE}/users/${username}?access_token=03bb18060b0a9e640bac4c1f5c5d9491db3b64ae`
  )
    .then(response => {
      if (response.status !== 200) {
        console.log(`Error with the request! ${response.status}`);
        return;
      }

      response.json().then(data => {
        return callback(null, data);
      });
    })
    .catch(err => {
      callback(err);
    });
};
