import React, { useState, useContext  } from "react";
import './App.css';

import { loginContext } from "./components/context";

import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

// Import components
import Navbar from "./components/navbar";
import HomeView from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import NewPost from "./components/writenewpost";
import Read from "./components/read";
import ViewAll from "./components/viewall";

const App = () => {
  
  const loginctx = useContext(loginContext);
  return (
    <div>
      <Navbar />
      <Routes>
      { loginctx ? (
        <>
        <Route path="/newpost" element={<NewPost />} />
        </>
      ) : (
        <></>
      )}
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/viewall" element={<ViewAll />} />
      </Routes>
      <div style={{ margin: 20 }}>

      </div>
    </div>
  );
};

export default App;
