// Home page, shows a few of the latest blog posts

import React, { useState, useContext, useEffect, useMemo } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";
 
import "bootstrap/dist/css/bootstrap.css";
import "../css/postlist.css";

export default function HomeView() {

  const { REACT_APP_SERVER_URL } = process.env;
  const { currentUser } = useContext(loginContext);
  const [posts, setPosts] = useState<any[]>();

  const getPosts = () => {
    Axios.get(`${REACT_APP_SERVER_URL}/api/blogposts`, {
      params: {
        amount: 6
      }
    })
    .then((res) => {
        var postData = res.data;

        setPosts(postData);

        
    }).catch((err) => {
        console.log(err);
    });
  }

  useMemo(() => {
    getPosts();
  }, []);

  return (
    <div className="align-items-center content">
    { currentUser ? (
      <>
      <p>Welcome, {currentUser.username}</p>
      </>
    ) : (
      <>
      
      </>
    )   
    }
    <h2>Latest Posts</h2>
      <div>
        <ul>
          {
            posts?.map((post: any) => {
              return ( 
                <li key={post._id}>
                  <Link className="postLink post-title" to={`/read/${post._id}`}>
                    {post.title}
                  </Link>
                  <p className="post-info">By {post.postedBy?.username} | {dayjs(post.date_created).format("DD/MM/YYYY")}</p>
                  <p className="post-preview">   {post.text.substring(0,200)}</p>
                </li>
                )
              })
            }
        </ul>
      </div>
    </div>
  );
};