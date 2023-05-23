// Blog post editing page, also handles deletion

import React, { useState, useContext, useEffect, useMemo } from "react";
import { loginContext } from "./context";
import Axios from "axios";
 
import "bootstrap/dist/css/bootstrap.css";
import "../css/mainview.css"
 
import { useParams } from "react-router-dom";

export default function EditBlogPost() {
    const { REACT_APP_SERVER_URL } = process.env;
    const params = useParams();
    const { currentUser } = useContext(loginContext);
    const [postData, setPostData] = useState<any>();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [correctUser, setCorrectUser] = useState(false);

    const getPost = () => {     
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogposts/${params.editid}`, {
            })
            .then((res) => {
                setPostData(res.data);
                setTitle(res.data.title);
                setText(res.data.text);
            }).catch((err) => {
                setPostData(null);
            });
    }

    useMemo (() => {
        getPost();
    }, []);
    
    const editPost = () => {
        if (currentUser) {
            Axios({
                method: "PATCH",
                data: {
                    postId: postData._id,
                    newTitle: title,
                    newText: text,
                },
                withCredentials: true,
                url: `${REACT_APP_SERVER_URL}/api/blogposts/edit`
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    window.location.href = "/read/" + res.data._id;
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        
    };

    const deletePost = () => {
        if (currentUser) {
            Axios({
                method: "DELETE",
                params: {
                    id: postData._id,
                },
                withCredentials: true,
                url: `${REACT_APP_SERVER_URL}/api/blogposts/:id`
            }).then((res) => {
                console.log(res);
                if (res.status === 200) {
                    window.location.href = "/";
                }
            }).catch((err) => {
                console.log(err);
            });
        }
        
    };

    return (
        <div className="align-items-center content">
            { postData ? (
                <>
                <h3>Edit the Blog Post</h3>
                <br></br>
                <input type="text"
                className="form-control"
                id="title"
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}>

                </input>
                <br></br>

                <textarea className="form-control" 
                id="text" 
                placeholder="Write here" 
                rows={10}
                onChange={e => setText(e.target.value)}
                value={text}>

                </textarea>

                <button className="btn btn-outline-primary editBtn" onClick={editPost}>Edit</button>
                <button className="btn btn btn-outline-danger deleteBtn" onClick={e => setConfirmDelete(true)}>Delete</button>
                {confirmDelete ? <button className="btn btn btn-danger deleteBtn" onClick={deletePost}>Confirm Deletion</button> : ``}
                </>
            ) : (
                <>
                Loading post...
                </>
            )
        }
        </div>
    );
};