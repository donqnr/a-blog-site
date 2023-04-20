import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { BlogPostInterface } from '../interfaces/blogpost'
 
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


export default function ViewAll() {

    const { REACT_APP_SERVER_URL } = process.env;
    const [postData, setPostData] = useState<any[]>();
    const getPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/allblogposts`, {
        })
        .then((res) => {
            setPostData(res.data);
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
                    postData?.map((post: any) => {
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