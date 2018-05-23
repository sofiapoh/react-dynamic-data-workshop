import React from "react";
import ErrorBoundary from "../error_boundary";
import "./style.css";
import { getData } from "../../utils/data_helpers";
import { Repo } from "./repo";

class Repos extends React.Component {
  state = {
    repos: []
  };

  componentDidMount() {
    getData(this.props.url).then(repos => this.setState({ repos }));
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
