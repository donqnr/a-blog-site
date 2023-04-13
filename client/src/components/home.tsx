import React, { useState, useContext } from "react";
import { loginContext } from "./context";
import Axios from "axios";
 
import "bootstrap/dist/css/bootstrap.css";

export default function HomeView() {
  const loginctx = useContext(loginContext);
  return (
    <div className="align-items-center">
    { loginctx ? (
      <>
      <p>Logged in as {loginctx.username}</p>
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