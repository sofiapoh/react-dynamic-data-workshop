export const API_BASE = "https://api.github.com";

const checkResponse = (response) => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response.json();
};

export const getData = (url) => {
  return fetch(url)
    .then(checkResponse)
    .catch((err) => {
      throw new Error(`fetch getUserData failed ${err}`);
    });
};
