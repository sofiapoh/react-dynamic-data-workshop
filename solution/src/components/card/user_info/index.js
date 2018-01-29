import React from "react";
import "./style.css";
import followerImg from "../../../../public/followers.svg";

export const UserInfo = ({ name, login, followers }) => (
  <div className="user-info--container">
    <h2 className="user-info--name">{name}</h2>
    <div className="user-info--wrapper">
      <span>
        <img className="user-info--img" src={followerImg} />
        <span className="user-info--followers">Followers: {followers}</span>
      </span>
      <span>Username: {login}</span>
    </div>
  </div>
);
