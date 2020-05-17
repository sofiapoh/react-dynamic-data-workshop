import React from "react";

const Repo = ({name, stargazers_count, description}) => {
  return (
    <li>
      <h3>{name}</h3>
      <p>stars: {stargazers_count}</p>
      <p>{description}</p>
    </li>
  )
}

export default Repo