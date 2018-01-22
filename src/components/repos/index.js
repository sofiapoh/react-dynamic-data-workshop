import React from "react";
import ErrorBoundary from "../ErrorBoundary";
import "./style.css";
import { getRepos } from "../../utils/data_helpers";
import { Repo } from "./repo";

class Repos extends React.Component {
  state = {
    repos: []
  };

  componentDidMount() {
    if (this.props.url) {
      getRepos(this.props.url).then(repos => this.setState({ repos }));
    }
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

export default ErrorBoundary(Repos);
