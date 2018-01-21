import React from "react";
import "./style.css";
import { getRepos } from "../../utils/data_helpers";
import { Repo } from "./repo";

export class Repos extends React.Component {
  state = {
    repos: []
  };

  componentDidMount() {
    getRepos(this.props.url, (err, data) => {
      if (err) console.log(err);
      this.setState({ repos: data });
    });
  }

  render() {
    const { repos } = this.state;
    return (
      <ul className="repos--list">
        {repos.map(repo => <Repo key={repo.id} {...repo} />)}
      </ul>
    );
  }
}
