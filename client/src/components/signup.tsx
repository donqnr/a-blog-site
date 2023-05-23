// Page for making a new account

import React, { useState } from "react";
import Axios from "axios";
 
import "bootstrap/dist/css/bootstrap.css";
 
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
    const [signUpUser, setSignUpUser] = useState("");
    const [signUpPassword, setSignUpPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [signUpEmail, setSignUpEmail] = useState("");
    const [accountCreated, setAccountCreated] = useState<boolean>(false);
    const signUpFail = () => toast('Signup failed. Username may be taken\nCheck if all fields are filled correctly')
    const confirmFail = () => toast(`Password fields do not match`);
    const { REACT_APP_SERVER_URL } = process.env;
    const send = () => {
        if (confirmPassword === signUpPassword) {
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
                    setAccountCreated(true);
                } else if (res.status == 400) {
                    signUpFail();
                }
            }).catch((err) => {
                signUpFail();
                console.log(err);
            });
        } else {
            confirmFail();
        }
    };
    return (
        <div className="content">
            <h3>Sign Up</h3>
            Username: * (Min. 3 characters)
            <input type="text"
            className="form-control"
            id="name"
            placeholder="Username"
            onChange={e => setSignUpUser(e.target.value)}>
            </input>
            E-Mail: *
            <input type="text"
            className="form-control"
            id="name"
            placeholder="E-Mail Address"
            onChange={e => setSignUpEmail(e.target.value)}>
            </input>
            Password: *
            <input type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            onChange={e => setSignUpPassword(e.target.value)}>
            </input>
            Confirm Password: *
            <input type="password"
            className="form-control"
            id="confirm-password"
            placeholder="Confirm Password"
            onChange={e => setConfirmPassword(e.target.value)}>
            </input>
            <br></br>
            * Required fields<br></br>
            <br></br>
            <button onClick={send}>Sign Up</button>
            {accountCreated ? ' Account created succesfully. Go to the login page to log in to your new account' : '' }
            <Toaster />
        </div>
    );
};