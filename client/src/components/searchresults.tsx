// Page for showing search results.

import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { BlogPostInterface } from '../interfaces/blogpost'
import dayjs from "dayjs";
 
import { useParams, Link, useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../css/postlist.css";



export default function SearchResults() {

    const { REACT_APP_SERVER_URL } = process.env;
    const [posts, setPosts] = useState<any[]>();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search');

    const getPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogposts/search/posts`, {
            params: {
                search: search
            }
        })
        .then((res) => {
            setPosts(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect (() => {
        getPosts();
    }, [search]);

    return (
        <div className="align-items-center content">
            <h2>Search results</h2>
            <ul>
                {
                    posts?.map((post: any) => {
                        return ( 

                            <li key={post._id}>
                                <Link className="postLink post-title" to={`/read/${post._id}`}>
                                    {post.title}
                                </Link>
                                 <p className="post-info">Posted by {post.postedBy?.username} | {dayjs(post.date_created).format("DD/MM/YYYY")}
                                 </p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};