// Profile page, shows user's info, their posts and the posts they've liked.

import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import dayjs from "dayjs";

import { Link, useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "../css/profile.css";

export default function Profile() {
    const { REACT_APP_SERVER_URL } = process.env;
    const params = useParams();
    const { currentUser } = useContext(loginContext);
    const [userData, setUserData] = useState<any>();
    const [userPosts, setUserPosts] = useState<any>();
    const [likedPosts, setLikedPosts] = useState<any>();

    const getUser = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/users/${params.userId}`, {
        })
        .then((user) => {
            setUserData(user.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const getUserPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogposts/byuser/${params.userId}`, {
        })
        .then((res) =>  {
            setUserPosts(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const getLikedPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogposts/likedby/${params.userId}`, {
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
            <p>Registered {dayjs(userData?.date_created).format("DD/MM/YYYY")}</p>
            <br/>
            </div>

            <div>            
            <h3>Posts by {userData?.username}</h3>
            <ul>
                {
                    userPosts?.map((post: any) => {
                        return (
                            <li key={post._id}>
                                <Link className="postLink" to={`/read/${post._id}`}>
                                    {post.title}
                                </Link>
                                <p className="profile-page-post-info">{dayjs(post.date_created).format("DD/MM/YYYY")}
                                 </p>
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
                            <li key={post._id}>
                                <Link className="postLink" to={`/read/${post._id}`}>
                                    {post.title}
                                </Link>
                                <p className="profile-page-post-info">Posted by {post.postedBy?.username} | {dayjs(post.date_created).format("DD/MM/YYYY")}
                                 </p>
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