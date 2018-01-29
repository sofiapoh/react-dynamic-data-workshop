import React from "react";
import "./style.css";

export const Repo = ({ name, description, watchers_count, html_url }) => {
  const descriptionClassName = description ? "repo--desc" : "repo--no-desc";
  return (
    <li className="repo--list-item">
      <span className="repo--title-wrapper">
        <a className="repo--name" href={html_url}>
          <strong>{name}</strong>
        </a>
        ⭐️ {watchers_count}
      </span>
      {description ? (
        <span className={descriptionClassName}>{description}</span>
      ) : (
        <span className={descriptionClassName}>
          This repo has no description
        </span>
      )}
    </li>
  );
};
