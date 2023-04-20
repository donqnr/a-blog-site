import React, { useState, useContext } from "react";
import { loginContext } from "./context";
import Axios from "axios";
 
import "bootstrap/dist/css/bootstrap.css";

export default function HomeView() {

  const { currentUser } = useContext(loginContext);
  return (
    <div className="align-items-center">
    { currentUser ? (
      <>
      <p>Logged in as {currentUser.username}</p>
      </>
    ) : (
      <>
      <p>Stuff goes here</p>
      </>
    )
    }
    </div>
    );
};