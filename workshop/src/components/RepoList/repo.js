import React from "react";

const Repo = ({ name, stargazers_count, description, html_url }) => {
  return (
    <fieldset className="RepoField">
      <legend>{name}</legend>
      <li>stargazers_count: {stargazers_count}</li>
      <li>Repo description: {description}</li>
      <li><a href={html_url}>Repo url</a></li>
    </fieldset>
  );
};

export default Repo;
