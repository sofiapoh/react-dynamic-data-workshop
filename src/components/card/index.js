import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import { getUserData, getRepos } from "../../utils/data_helpers";
import { CardImage } from "./card_image";
import { UserInfo } from "./user_info";
import Repos from "../repos";
import "./style.css";
class Card extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    // Console log example first with hardcoded username
    getUserData("sofiapoh").then(data => this.setState({ data }));
  }

  render() {
    if (!this.state.data) {
      return <h3>...Loading</h3>;
    }

    const {
      avatar_url,
      followers,
      name,
      public_repos,
      repos_url,
      login,
      url
    } = this.state.data;

    return (
      <div className="card--wrapper">
        <CardImage url={avatar_url} />
        <UserInfo followers={followers} name={name} login={login} />
        {repos_url ? <Repos url={repos_url} /> : null}
      </div>
    );
  }
}

export default ErrorBoundary(Card);
