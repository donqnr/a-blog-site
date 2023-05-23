// Account settings page

import React, { useState, useContext, useEffect  } from "react";
import Axios from "axios";
import { loginContext } from "./context"; 

import "bootstrap/dist/css/bootstrap.css";
import "../css/mainview.css"

 
import { Link } from "react-router-dom";


export default function AccountSettings() {

    const { REACT_APP_SERVER_URL } = process.env;
    const { currentUser } = useContext(loginContext);
    const [newName, setNewName] = useState("");
    const [currentPass, setCurrentPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [newPass, setNewPass] = useState("");

    const changeName = () => {
        if (currentUser) {
            Axios({
                method: "PUT",
                data: {
                    newName: newName,
                },
                withCredentials: true,
                url: `${REACT_APP_SERVER_URL}/api/user/namechange`
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const changePassword = () => {
        if (currentUser && currentPass === confirmPass) {
            Axios({
                method: "PUT",
                data: {
                    username: currentUser?.username,
                    password: currentPass,
                    newPass: newPass,
                },
                withCredentials: true,
                url: `${REACT_APP_SERVER_URL}/api/user/passwordchange`
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    return (
        <div className="align-items-center content">
            { currentUser ? (
                <>

            <h2>Manage Account</h2>
            <h5>Logged in as {currentUser?.username}</h5>
            <div style={{ marginBottom: 25 }}>
                <p>Change Username</p>
                <input type="text"
                id="newName"
                placeholder="New Username"
                onChange={e => setNewName(e.target.value)}></input>
                <button onClick={changeName}>Change Name</button>
            </div>
            <div style={{ marginBottom: 25 }}>
                <p>Change Password</p>
                <input type="password"
                id="currentPw"
                placeholder="Current Password"
                onChange={e => setCurrentPass(e.target.value)}></input>
                <input type="password"
                id="confirmPw"
                placeholder="Confirm Current Password"
                onChange={e => setConfirmPass(e.target.value)}></input>
                <br></br>
                <input type="password"
                id="neww"
                placeholder="New Password"
                onChange={e => setNewPass(e.target.value)}></input>
                <button onClick={changePassword}>Change Password</button>
            </div>
                
                </>
            ) : (
                <></>
            )
            }

        </div>
    );
};