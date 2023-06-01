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
import ReactPaginate from "react-paginate";



export default function SearchResults() {

    const { REACT_APP_SERVER_URL } = process.env;
    const [posts, setPosts] = useState<any[]>();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get('search');
    const [pageAmount, setPageAmount] = useState<any>();

    const getPosts = () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/blogposts/`, {
            params: {
                search: search,
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

    const handlePageChange = (e: any) => {
        setSearchParams({ page: e.selected + 1})
    }

    useEffect (() => {
        getPosts();
    }, [search, searchParams]);

    return (
        <div className="align-items-center content">
            <h2>Search results</h2>
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