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
        Axios.get(`${REACT_APP_SERVER_URL}/search`, {
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
    }, []);

    return (
        <div className="align-items-center">
            <ul>
                {
                    posts?.map((post: any) => {
                        return ( 

                            <li>
                                <Link className="postLink" to={`/read/${post._id}`}>
                                    {post.title}
                                </Link>
                                 <p>Posted by 
                                 </p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};