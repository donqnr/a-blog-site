import React, { useState, useContext, useEffect  } from "react";
import axios from "axios";
import { loginContext } from "./context"; 

import "bootstrap/dist/css/bootstrap.css";
 
import { Link } from "react-router-dom";

export default function AccountSettings() {

    const { REACT_APP_SERVER_URL } = process.env;
    const { currentUser } = useContext(loginContext);
    const [posts, setPosts] = useState<any[]>();

    return (
        <div>
            <h2>Account Settings</h2>
        </div>
    );
};