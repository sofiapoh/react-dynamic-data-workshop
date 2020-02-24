import React from "react";
import { getUserData } from "../../utils/getUserData";
import RepoList from "../RepoList/RepoList.js";

import "./UserHeader.css";

export default function UserHeader() {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const username = "FrancisA2000";
    getUserData(username).then(data => setUserData(data));
  }, []);

  if (!userData) {
    return <h3>...Loading</h3>;
  }

  const { avatar_url, html_url, name, followers, repos_url } = userData;

  return (
    <div className="userProfile">
      <img src={avatar_url} />
      <div className="userDetails">
        <h2>{name}</h2>
        <h2>followers count: {followers + 9999999}</h2>
      </div>
      {repos_url ? <RepoList url={repos_url} /> : null}
    </div>
  );
}
