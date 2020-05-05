import React from "react";
import getUserData from "../utils/getUserData";
import RepoList from "./RepoList";

const UserHeader = () => {
  const [userData, setUserData] = React.useState(null)

  React.useEffect(() => {
    const username = 'glrta';
    const url = `https://api.github.com/users/${username}`
    getUserData(url)
    .then(data => setUserData(data));  
  }, []);

  if (!userData) {
    return <h3>...Loading</h3>;
  } //without this, userData will be always null as JS doesn't wait the response to move on...

  const {avatar_url, name, followers, repos_url} = userData;

  return (
    <div>
      <img src={avatar_url} />
      <h1>{name}</h1>
    <p>Followers: {followers}</p>
    {repos_url ? <RepoList url={repos_url} /> : null}
    </div>
  );
};
export default UserHeader;