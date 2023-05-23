// Page for reading a single blog post.

import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
 
import { Link, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../css/mainview.css"



export default function Read() {

    const { REACT_APP_SERVER_URL } = process.env;
    const params = useParams();
    const { currentUser } = useContext(loginContext);
    const [postData, setPostData] = useState<any>();
    const [edited, setEdited] = useState<boolean>(false);
    const [samePoster, setSamePoster] = useState<boolean>(false);
    const [userHasLiked, setUserHasLiked] = useState<boolean>(false);
    const [likeAmount, setLikeAmount] = useState<any>(false);
    const [formattedDate, setFormattedDate] = useState<String>();

    const getPost = () => {     
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogposts/${params.id}`, {
        })
        .then((res) => {
            setPostData(res.data);
            setLikeAmount(res.data.liked_by.length);
            setUserHasLiked(res.data.liked_by.includes(currentUser?._id));
            if (currentUser?._id === res.data.postedBy?._id) {
                setSamePoster(true);
            }
            if (res.data.date_created != res.data.last_edited) {
                setEdited(true);
            }
            setFormattedDate(dayjs(res.data.date_created).format("DD/MM/YYYY"))
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
                url: `${REACT_APP_SERVER_URL}/api/blogposts/like`
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
                <h5>
                    By <Link className="profileLink" to={`/profile/${postData.postedBy?._id}`}>{postData.postedBy?.username}</Link> | 
                    {` ${dayjs(postData.date_created).format("DD/MM/YYYY HH:mm:ss")}`} 
                    {edited ? ` (Last edited ${dayjs(postData.last_edited).format("DD/MM/YYYY HH:mm:ss")})` : ''}
                </h5>
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
                
                <Link className="editBtn ms-auto" to={`/edit/${postData._id}`}> 
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