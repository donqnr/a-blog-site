import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "./context";
import Axios from "axios";

import { Link, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

export default function Profile() {
    const { REACT_APP_SERVER_URL } = process.env;
    const params = useParams();
    const { currentUser } = useContext(loginContext);
    const [userData, setUserData] = useState<any>();
    const [userPosts, setUserPosts] = useState<any>();
    const [likedPosts, setLikedPosts] = useState<any>();

    const getUser = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/auth/userbyid`, {
            params: {
                id: params.userId
            }
        })
        .then((user) => {
            setUserData(user.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const getUserPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogpost/postsbyuser`, {
            params: {
                id: params.userId
            }
        })
        .then((res) =>  {
            setUserPosts(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const getLikedPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogpost/postslikedby`, {
            params: {
                id: params.userId
            }
        })
        .then((res) =>  {
            setLikedPosts(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect (() => {
        getUser();
        getUserPosts();
        getLikedPosts();
    }, []);

    return (
        <div className="align-items-center content">
            <div>            
            <h2>{userData?.username}</h2>
            <p>Registered {userData?.date_created}</p>
            <br/>
            </div>

            <div>            
            <h3>Posts by {userData?.username}</h3>
            <ul>
                {
                    userPosts?.map((post: any) => {
                        return (
                            <li>
                                <Link className="postLink" to={`/read/${post._id}`}>
                                    {post.title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <br/>
            </div>
            

            <div>            
            <h3>Posts liked by {userData?.username}</h3>
            <ul>
                {
                    likedPosts?.map((post: any) => {
                        return (
                            <li>
                                <Link className="postLink" to={`/read/${post._id}`}>
                                    {post.title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <br/>
            </div>

        </div>
    )
}