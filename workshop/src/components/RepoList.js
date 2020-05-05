import React from "react";
import getUserData from "../utils/getUserData";
import Repo from "./Repo"

const RepoList = (props) => {
  const [repos, setRepos] = React.useState([]);
  
  React.useEffect(() => {
    console.log("aqui")
    getUserData(props.url)
    .then(reposData => 
      setRepos(reposData));
  }, []);

  return (
    <ul>
      {repos.map(repo => (
        <Repo key={repo.id} {...repo}/>
        )
      )}
    </ul>
  )
}

export default RepoList
