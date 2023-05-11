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
import NotFoundPage from "./components/404";
import EditBlogPost from "./components/editpost";
import SearchResults from "./components/searchresults";
import ViewProfile from "./components/profile";
import AccountSettings from "./components/accsettings";

const App = () => {
  
  const loginctx = useContext(loginContext);
  return (
    <div>
      <Navbar />
      <Routes>
      { loginctx ? (
        <>
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/account" element={<AccountSettings />} />
        </>
      ) : (
        <></>
      )}
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/results/:search_query" element={<SearchResults />} />
        <Route path="/read/:id" element={<Read />} />
        <Route path="/editpost/:editid" element={<EditBlogPost />} />
        <Route path="/viewall" element={<ViewAll />} />
        <Route path="/profile/:userId" element={<ViewProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <div style={{ margin: 20 }}>

      </div>
    </div>
  );
};

export default App;
