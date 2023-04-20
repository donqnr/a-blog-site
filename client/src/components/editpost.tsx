import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "./context";
import Axios from "axios";
 
import "bootstrap/dist/css/bootstrap.css";
 
import { useParams } from "react-router-dom";

export default function EditBlogPost() {
    const { REACT_APP_SERVER_URL } = process.env;
    const params = useParams();
    const { currentUser } = useContext(loginContext);
    const [postData, setPostData] = useState<any>();
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [correctUser, setCorrectUser] = useState(false);

    const getPost = () => {     
        Axios.get(`${REACT_APP_SERVER_URL}/blogpost`, {
            params: {
                id: params.editid
            }
            })
            .then((res) => {
                if (postData == null) {
                    setPostData(res.data);
                    setTitle(res.data.title);
                    setText(res.data.text);
                }
            }).catch((err) => {
                setPostData(null);
            });
    }

    useEffect (() => {
        getPost();
    }, []);
    
    const send = () => {
        if (currentUser) {
            Axios({
                method: "POST",
                data: {
                    postId: postData._id,
                    newTitle: title,
                    newText: text,
                },
                withCredentials: true,
                url: `${REACT_APP_SERVER_URL}/editblogpost`
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
    return (
        <div>
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

                <button onClick={send}>Edit</button>
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