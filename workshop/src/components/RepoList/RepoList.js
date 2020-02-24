import React from "react";
import { getUserData } from "../../utils/getUserData";
import Repo from "./repo";
import "./RepoList.css";

export default function RepoList() {
  const [userRepo, setUserRepo] = React.useState(null);

  React.useEffect(() => {
    const username = "FrancisA2000";
    getUserData(username, "/repos").then(data => setUserRepo(data));
  }, []);

  if (!userRepo) {
    return <h3>...Loading</h3>;
  }
  
  return (
    <div className="userRepo">
      {userRepo.map(repo => (
        <Repo key={repo.id} {...repo} />
      ))}
    </div>
  );
}
