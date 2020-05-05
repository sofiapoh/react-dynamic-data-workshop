import token from "../../token";

const checkResponse = (response) => {
  if (response.status !== 200) {
    console.log(`Error with request! ${response.status}`);
    return;
  }
  return response.json();
};

function getUserData(url) {
  return fetch(`${url}?access_token=${token}`)
    .then(checkResponse)
    .catch((err) => {
      throw new Error(`fetch getUserData failed ${err}`);
    });
}
export default getUserData;