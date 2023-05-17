import React, { useState, useContext, useEffect, useMemo } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { BlogPostInterface } from '../interfaces/blogpost'
 
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../css/mainview.css"


export default function ViewAll() {

    const { REACT_APP_SERVER_URL } = process.env;
    const [postData, setPostData] = useState<any[]>();
    const getPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogpost/allblogposts`, {
        })
        .then((res) => {
        var postData = res.data;
        postData.sort(function(a: any, b: any) {
            var dateA = new Date(a.date_created);
            var dateB = new Date(b.date_created);
            return dateB.valueOf() - dateA.valueOf();
            });

            // Get the names of the author's of the received posts
            // This might be a terrible way of implementing this
            const promises = postData.map((post: any) => {
                return Axios.get(`${REACT_APP_SERVER_URL}/api/auth/userbyid`, {
                    params: {
                        id: post.posterId
                    }
                }).then((user) => {
                    post.poster = user.data.username;
                }).catch((err) => {
                    console.log(err);
                })
            })

            Promise.all(promises).then((res) => {
                setPostData(postData);
            });

        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect (() => {
        getPosts();
    }, []);

    return (
        <div className="align-items-center content">
            <h2>All blog posts</h2>
            <ul>
                {
                    postData?.map((post: any) => {
                        return ( 

                            <li key={post}>
                                <Link className="postLink" to={`/read/${post._id}`}>
                                    {post.title}
                                </Link>
                                 <p>Posted by {post.poster}
                                 </p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};