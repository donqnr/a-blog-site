// Page for showing all the blog posts
// Should look into implementing pagination for this, in case database gets too big

import React, { useState, useContext, useEffect, useMemo } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { BlogPostInterface } from '../interfaces/blogpost'
 
import { useParams, Link, useLocation, useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../css/postlist.css";
import "../css/paginate.css"
import ReactPaginate from "react-paginate";
import PostList from "./postlist";


export default function ViewAll() {

    const { REACT_APP_SERVER_URL } = process.env;
    const [searchParams, setSearchParams] = useSearchParams({});
    const page = Number(searchParams.get("page")) || 1;
    const [posts, setPosts] = useState<any[]>();
    const [pageAmount, setPageAmount] = useState<any>();

    const getPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogposts`, {
            params: {
                page: page
            }
        })
        .then((res) => {

        setPosts(res.data);
        setPageAmount(res.headers["page-amount"]);

        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect (() => {
        getPosts();
    }, [searchParams]);

    const handlePageChange = (e: any) => {
        setSearchParams({ page: e.selected + 1})
    }

    return (
        <div className="align-items-center content">
            <h2>All blog posts</h2>

            <PostList
            postData={posts}
            showPreview={false}>
            </PostList>

            <ReactPaginate
            className="react-paginate"
            breakLabel="..."
            nextLabel="->"
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={pageAmount}
            previousLabel="<-"
            renderOnZeroPageCount={null}
            />
        </div>
    );
};