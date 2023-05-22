import React, { useState } from "react";
import axios from "axios";
 
import "bootstrap/dist/css/bootstrap.css";
 
import { Link } from "react-router-dom";

export default function Login() {
    const { REACT_APP_SERVER_URL } = process.env;
    const [loginUser, setLoginUser] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const send = () => {
        axios({
            method: "POST",
            data: {
                username: loginUser,
                password: loginPassword,
                remember: rememberMe
            },
            withCredentials: true,
            url: `${REACT_APP_SERVER_URL}/api/auth/login`,
        }).then((res) => {
            if (res.status == 200) {
                window.location.href = "/";
            }
        }).catch((err) => {
            console.log(err);
        });
    };
    return (
        <div className="align-items-center content">
            <h3>Login</h3>
            Username:
            <input type="text"
                className="form-control"
                id="name"
                placeholder="Username"
                onChange={e => setLoginUser(e.target.value)}>
            </input>
            Password:
            <input type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={e => setLoginPassword(e.target.value)}>
            </input>
            {/* Remember Me 
            <input type="checkbox"
            className="remember"
            value="Remember Me"     // Remember me button disabled for now due to bullshit
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}>
            </input> */}
            <br></br>
            <button onClick={send}>Log In</button>
            <div>            
                <Link className="signUpBtn" to="/signup">
                    <a href="#">Click here to register a new account.</a>
                </Link>
            </div>
        </div>
    );
};