import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { BlogPostInterface } from '../interfaces/blogpost'
 
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


export default function SearchResults() {

    const { REACT_APP_SERVER_URL } = process.env;
    const params = useParams();
    const [posts, setPosts] = useState<any[]>();
    const getPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogpost/search`, {
            params: {
                search_query: params.search_query
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
    }, [posts]);

    return (
        <div className="align-items-center content">
            <h2>Search results</h2>
            <ul>
                {
                    posts?.map((post: any) => {
                        return ( 

                            <li key={post._id}>
                                <Link className="postLink" to={`/read/${post._id}`}>
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