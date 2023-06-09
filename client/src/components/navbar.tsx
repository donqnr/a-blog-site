// Navigation bar

import React, { useContext, useState } from "react";
import Axios from "axios";
import { loginContext } from "./context";
 
import "bootstrap/dist/css/bootstrap.css";
 
import { NavLink, Link, useSearchParams, createSearchParams } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';


export default function Navbar() {
    const { REACT_APP_SERVER_URL } = process.env;
    const { currentUser, handleLogout } = useContext(loginContext);
    const [searchBar, setSearchBar] = useState("")

    const logout = () => {
        handleLogout();

    }

    return (
        <div className="container-fluid">
            <nav className="d-flex navbar navbar-light bg-light">

                <div className="navbar">
                    <Link className="navbar-brand" to="/" style={{ marginLeft: 25, marginRight: 25 }}>
                    	A Site
                    </Link>
                    <Link className="allPostsBtn" to="/viewall">
                        <button className="btn btn-outline-primary newPostBtn" type="button">
                            View all posts
                        </button>
                    </Link>
                </div>

                <div className="navbar" >
                <form className="d-flex" role="search">
                    <input type='text' className="searchBar ms-auto" aria-describedby="search-button-addon" onChange={e => setSearchBar(e.target.value)}/>
                        <Link className="searchLink" to={`/results?${new URLSearchParams({'search': searchBar})}`}>
                            <button className="btn btn-outline-secondary" type="button" id="search-button-addon">Search</button>
                        </Link>
                </form>
                    
                </div>

                <div className="navbar">
                    {currentUser ? (
                    <>
                    <Dropdown style={{ marginLeft: 25, marginRight: 25 }}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className="ms-auto">
                            {currentUser?.username}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href={`/profile/${currentUser?._id}`}>View Profile</Dropdown.Item>
                            <Dropdown.Item href="/newpost">Make a Blog Post</Dropdown.Item>
                            <Dropdown.Item href="/account">Manage Account</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logout} to="/">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    

                    {/* <Link className="logoutBtn ms-auto" onClick={logout} to="/">
                        <button className="btn btn-outline-success logoutBtn" type="button" style={{ marginLeft: 25, marginRight: 25 }}>
                            Logout
                        </button>
                    </Link> */}
                    </>
                    ) : (
                    <>
                    <NavLink className="loginBtn ms-auto" to="/login">
                        <button className="btn btn-outline-success loginBtn" type="button" style={{ marginLeft: 25, marginRight: 25 }}>Login / Sign up</button>
                    </NavLink>

                    </>
                    )}
                </div>
            
            </nav>
        </div>
    )
}