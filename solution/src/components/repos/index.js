import React from "react";
import ErrorBoundary from "../error_boundary";
import "./style.css";
import { getData } from "../../utils/data_helpers";
import { Repo } from "./repo";

function Repos(props) {
  const [repos, setRepos] = React.useState([]);
  React.useEffect(() => {
    getData(props.url).then(repos => setRepos(repos));
  }, [props.url]);
  return (
    <ul className="repos--list">
      {repos.map(repo => (
        <Repo key={repo.id} {...repo} />
      ))}
    </ul>
  );
}

export default ErrorBoundary(Repos);
