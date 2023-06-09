// Page for writing a new blog post.

import React, { useState, useContext } from "react";
import { loginContext } from "./context";
import Axios from "axios";
 
import "bootstrap/dist/css/bootstrap.css";
import "../css/mainview.css"
 
import { NavLink } from "react-router-dom";

export default function NewBlogPost() {
    const { REACT_APP_SERVER_URL } = process.env;
    const loginctx = useContext(loginContext);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    
    const send = () => {
        if (loginctx) {
            Axios({
                method: "POST",
                data: {
                    posterId: loginctx._id,
                    title: title,
                    text: text,
                },
                withCredentials: true,
                url: `${REACT_APP_SERVER_URL}/api/blogposts/new`
            }).then((res) => {
                console.log(res);
                if (res.status == 200) {
                    window.location.href = "/read/" + res.data._id;
                }
            });
        }
    };
    return (
        <div className="align-items-center content">
            
            <h3>Write a Blog Post</h3>
            <br></br>
            <input type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}>
            </input>
            <br></br>
            <textarea className="form-control" 
            id="text" 
            placeholder="Write here" 
            rows={10}
            onChange={e => setText(e.target.value)}>
            </textarea>

            <button onClick={send}>Post</button>
        </div>
    );
};