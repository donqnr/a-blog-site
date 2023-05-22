import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import ReactMarkdown from "react-markdown";
 
import { Link, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../css/mainview.css"


export default function Read() {

    const { REACT_APP_SERVER_URL } = process.env;
    const params = useParams();
    const { currentUser } = useContext(loginContext);
    const [postData, setPostData] = useState<any>();
    const [poster, setPoster] = useState<any>();
    const [samePoster, setSamePoster] = useState<boolean>(false);
    const [userHasLiked, setUserHasLiked] = useState<boolean>(false);
    const [likeAmount, setLikeAmount] = useState<any>(false);

    const getPost = () => {     
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogpost/blogpost`, {
        params: {
            id: params.id
        }
        })
        .then((res) => {
            setPostData(res.data);
            setLikeAmount(res.data.liked_by.length);
            setUserHasLiked(res.data.liked_by.includes(currentUser._id));
            if (currentUser?._id === res.data.postedBy?._id) {
                setSamePoster(true);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const likePost = () => {
        if (currentUser) {
            Axios({
                method: "POST",
                data: {
                    postId: params.id
                },
                withCredentials: true,
                url: `${REACT_APP_SERVER_URL}/api/blogpost/like`
            })
            .then((res) => {
                setLikeAmount(res.data.liked_by.length);
                setUserHasLiked(res.data.liked_by.includes(currentUser._id));
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
        
    }
    
    useEffect (() => {
        getPost();
    }, [currentUser]);


    return (
        <div className="align-items-center content">
        { postData ? (
            <>
            <div>
                <h1>{postData.title}</h1>
                <h5>By {postData.postedBy?.username} | {postData.date_created}</h5>
                <br></br>
                <ReactMarkdown>
                    {postData.text}
                </ReactMarkdown>
            </div>
            <div>

            { userHasLiked ? (
                <>
                <button className="btn btn-success likeBtn" onClick={likePost}>Like | {likeAmount}</button> 
                </>
            ): (
                <>
                <button className="btn btn-outline-success likeBtn" onClick={likePost}>Like | {likeAmount}</button> 
                </>
            )}

            
            { samePoster ? (
                <>
                
                <Link className="editBtn ms-auto" to={`/editpost/${postData._id}`}> 
                <button className="btn btn-outline-primary editBtn">Edit Post</button>
                </Link>
                </>
            ) : (
                <>
                
                </>
            )
            }
            </div>
            </>
        ) : (
            <>
                <p>Loading post...</p>
            </>
        )
    }
        </div>
    );
};