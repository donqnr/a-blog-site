// Page for showing search results.

import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { BlogPostInterface } from '../interfaces/blogpost'
import dayjs from "dayjs";
 
import { useParams, Link, useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../css/postlist.css";
import PostList from "./postlist";



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
            <PostList
            postData={posts}
            showPreview={false}>
            </PostList>
        </div>
    );
};