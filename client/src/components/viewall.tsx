// Page for showing all the blog posts
// Should look into implementing pagination for this, in case database gets too big

import React, { useState, useContext, useEffect, useMemo } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { BlogPostInterface } from '../interfaces/blogpost'
 
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../css/postlist.css";


export default function ViewAll() {

    const { REACT_APP_SERVER_URL } = process.env;
    const [postData, setPostData] = useState<any[]>();
    const getPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogposts`, {
        })
        .then((res) => {
        var postData = res.data;

        // Sort the posts by the creation date, descending
        postData.sort(function(a: any, b: any) {
            var dateA = new Date(a.date_created);
            var dateB = new Date(b.date_created);
            return dateB.valueOf() - dateA.valueOf();
            });

        setPostData(postData);

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

                            <li key={post._id}>
                                <Link className="postLink post-title" to={`/read/${post._id}`}>
                                    {post.title}
                                </Link>
                                 <p>Posted by {post.postedBy?.username}
                                 </p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};