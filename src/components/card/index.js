import React from "react";
import { getUserData } from "../../utils/data_helpers";
import { CardImage } from "../card_image";
import { UserInfo } from "../user_info";
import "./style.css";

export class Card extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {},
      error: null
    };
  }

  componentDidMount() {
    // Console log example first with hardcoded username

    getUserData("sofiapoh", (err, fetched) => {
      if (err) return this.setState({ error: err });
      return this.setState({ data: fetched });
    });
  }

  render() {
    if (!this.state.data) {
      return <h3>...Loading</h3>;
    }

    const { avatar_url, followers, name, public_repos, url } = this.state.data;

    return (
      <div className="card--wrapper">
        <CardImage url={avatar_url} />
        <UserInfo followers={followers} name={name} />
        {/* add repos */}
      </div>
    );
  }
}
