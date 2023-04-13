import React, { useState, useContext } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { BlogPostInterface } from '../interfaces/blogpost'
 
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


export default function ViewAll() {


    const params = useParams();
    const loginctx = useContext(loginContext);
    const [postData, setPostData] = useState<any[]>();
    Axios.get("http://localhost:5000/allblogposts", {
        })
        .then((res) => {
            setPostData(res.data);
        }).catch((err) => {
            console.log(err);
        });

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
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};