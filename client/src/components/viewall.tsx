// Page for showing all the blog posts
// Should look into implementing pagination for this, in case database gets too big

import React, { useState, useContext, useEffect, useMemo } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { BlogPostInterface } from '../interfaces/blogpost'
 
import { useParams, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../css/postlist.css";
import "../css/paginate.css"
import ReactPaginate from "react-paginate";


export default function ViewAll() {

    const { REACT_APP_SERVER_URL } = process.env;
    const queryParams = new URLSearchParams(useLocation().search);
    const pageNumber = queryParams.get('page');
    const [postData, setPostData] = useState<any[]>();
    const [pageAmount, setPageAmount] = useState<any>();

    const getPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogposts`, {
            params: {
                page: pageNumber
            }
        })
        .then((res) => {
        var postData = res.data;

        // Sort the posts by the creation date, descending

        setPostData(postData);
        setPageAmount(res.headers["page-amount"]);

        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect (() => {
        getPosts();
    }, [pageNumber]);

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
                <Link className="page1" to={`/viewall?page=1`} onClick={() => queryParams.set('page', '1')}>1</Link>
                <Link className="page2" to={`/viewall?page=2`} onClick={() => queryParams.set('page', '2')}>2</Link>
        </div>
    );
};