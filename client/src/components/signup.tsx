import React, { useState } from "react";
import Axios from "axios";
 
import "bootstrap/dist/css/bootstrap.css";
 
import { NavLink } from "react-router-dom";

export default function Signup() {
    const [signUpUser, setSignUpUser] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const { REACT_APP_SERVER_URL } = process.env;
    const send = () => {
        Axios({
            method: "POST",
            data: {
                username: signUpUser,
                password: signUpPassword,
                email: signUpEmail
            },
            withCredentials: true,
            url: `${REACT_APP_SERVER_URL}/api/auth/signup`
        }).then((res) => {
            if (res.status == 201) {
                window.location.href = "/login";
            }
        }).catch((err) => {
            console.log(err);
        });
    };
    return (
        <div>
            <h3>Sign Up</h3>
            <input type="text"
            className="form-control"
            id="name"
            placeholder="Username"
            onChange={e => setSignUpUser(e.target.value)}>
            </input>
            <input type="text"
            className="form-control"
            id="name"
            placeholder="E-Mail Address"
            onChange={e => setSignUpEmail(e.target.value)}>
            </input>
            <input type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={e => setSignUpPassword(e.target.value)}>
            </input>
            <button onClick={send}>Sign Up</button>
        </div>
    );
};