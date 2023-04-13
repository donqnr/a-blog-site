import React, { useState } from "react";
import axios from "axios";
 
import "bootstrap/dist/css/bootstrap.css";
 
import { Link } from "react-router-dom";

export default function Login() {
    const [loginUser, setLoginUser] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const send = () => {
        axios({
            method: "POST",
            data: {
                username: loginUser,
                password: loginPassword
            },
            withCredentials: true,
            url: "http://localhost:5000/api/auth/login",
        }).then((res) => {
            if (res.status == 200) {
                window.location.href = "/"
            }
            console.log(res)
        });
    };
    return (
        <div>
            <h3>Login</h3>
            <input type="text"
                className="form-control"
                id="name"
                placeholder="Username"
                onChange={e => setLoginUser(e.target.value)}>
            </input>
            <input type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={e => setLoginPassword(e.target.value)}>
            </input>
            <button onClick={send}>Log In</button>
            <div>            
                <Link className="signUpBtn" to="/signup">
                    <a href="#">Click here to register a new account.</a>
                </Link>
            </div>

        </div>
    );
};