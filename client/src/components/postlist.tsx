import React, { useState, useContext, useEffect, useMemo } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { BlogPostInterface } from '../interfaces/blogpost'
 
import { useParams, Link, useLocation, useSearchParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../css/postlist.css";
import "../css/paginate.css"
import ReactPaginate from "react-paginate";
import dayjs from "dayjs";

export default function PostList(props: any) {

    let postData = props.postData;
    let showPreview = props.showPreview || false;

    return (
        <div>
        <ul>
          {
            postData?.map((post: any) => {
              return ( 
                <li key={post._id}>
                  <Link className="postLink post-title" to={`/read/${post._id}`}>
                    {post.title}
                  </Link>
                  <p className="post-info">By {post.postedBy?.username} | {dayjs(post.date_created).format("DD/MM/YYYY")}</p>
                  { showPreview ? (
                    <p className="post-preview"> {post.text.substring(0,200)}</p>
                  ) : (<></>)}
                </li>
                )
              })
            }
        </ul>
      </div>
    )
}