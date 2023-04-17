import React, { useState, useContext } from "react";
import { loginContext } from "./context";
import { Link } from "react-router-dom";
 
import "bootstrap/dist/css/bootstrap.css";

export default function HomeView() {
  const loginctx = useContext(loginContext);
  return (
    <div className="align-items-center">
      <p>404 - Not Found</p>
      <Link className="homeLink ms-auto" to="/"> 
        <p>Go to home</p>
      </Link>
    </div>
    );
};