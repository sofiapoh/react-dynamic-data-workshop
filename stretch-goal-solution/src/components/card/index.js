import React from "react";
import ErrorBoundary from "../error_boundary";
import { getData, API_BASE } from "../../utils/data_helpers";
import { CardImage } from "./card_image";
import { UserInfo } from "./user_info";
import Repos from "../repos";
import "./style.css";

function Card() {
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const username = "sofiapoh";
    const url = `${API_BASE}/users/${username}`;
    getData(url).then(data => setUserData(data));
  }, []);
  if (!userData) {
    return <h3>...Loading</h3>;
  }

  const {
    avatar_url,
    followers,
    name,
    public_repos,
    repos_url,
    login,
    url,
  } = userData;
  return (
    <div className="card--wrapper">
      <CardImage url={avatar_url} />
      <UserInfo followers={followers} name={name} login={login} />
      {repos_url ? <Repos url={repos_url} /> : null}
    </div>
  );
}

export default ErrorBoundary(Card);
