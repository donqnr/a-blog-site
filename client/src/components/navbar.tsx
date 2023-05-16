import React, { useContext, useState } from "react";
import Axios from "axios";
import { loginContext } from "./context";
 
import "bootstrap/dist/css/bootstrap.css";
 
import { NavLink, Link } from "react-router-dom";

import Dropdown from 'react-bootstrap/Dropdown';


export default function Navbar() {
    const { REACT_APP_SERVER_URL } = process.env;
    const { currentUser, handleLogout } = useContext(loginContext);
    const [searchBar, setSearchBar] = useState("")

    const logout = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/auth/logout`, {
            withCredentials: true
        }).then((res) => {
            console.log(res);
            handleLogout();
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <nav className="d-flex navbar navbar-expand-lg navbar-light bg-light">
            <NavLink className="navbar-brand" to="/" style={{ marginLeft: 25, marginRight: 25 }}>
                    A Site
            </NavLink>
            <NavLink className="allPostsBtn" to="/viewall">
                    <button className="btn btn-outline-primary newPostBtn" type="button">
                        View all posts
                    </button>
            </NavLink>
                <input type='text' className="searchBar ms-auto" aria-describedby="search-button-addon" onChange={e => setSearchBar(e.target.value)}/>
                    <div className="input-group-append">
                        <Link className="searchLink" to={`/results/${searchBar}`}>
                            <button className="btn btn-outline-secondary" type="button" id="search-button-addon">Search</button>
                        </Link>
                    </div>
            
            {currentUser ? (
                <>
                <Dropdown>
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
            </nav>
        </div>
    )
}