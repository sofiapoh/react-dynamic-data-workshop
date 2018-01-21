import React from "react";
import "./style.css";
import followerImg from "../../../../public/followers.svg";

export const UserInfo = ({ name, followers }) => (
  <div className="user-info--container">
    <h2 className="user-info--name">{name}</h2>
    <img className="user-info--img" src={followerImg} />{" "}
    <h2 className="user-info--followers">{followers}</h2>
  </div>
);
