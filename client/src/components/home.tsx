// Home page, shows a few of the latest blog posts

import React, { useState, useContext, useEffect, useMemo } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
 
import "bootstrap/dist/css/bootstrap.css";

export default function HomeView() {

  const { REACT_APP_SERVER_URL } = process.env;
  const { currentUser } = useContext(loginContext);
  const [posts, setPosts] = useState<any[]>();

  const getPosts = () => {
    Axios.get(`${REACT_APP_SERVER_URL}/api/blogpost/all`, {
    })
    .then((res) => {
        var postData = res.data;
        postData.sort(function(a: any, b: any) {
          var dateA = new Date(a.date_created);
          var dateB = new Date(b.date_created);
          return dateB.valueOf() - dateA.valueOf();
        });
        postData = postData.slice(0, 6);

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
                  <Link className="postLink" to={`/read/${post._id}`}>
                    {post.title}
                  </Link>
                  <p>Posted by {post.postedBy?.username}</p>
                  <p>   {post.text.substring(0,200)}</p>
                            </li>
                        )
                    })
                }
            </ul>
      </div>
    </div>
    );
};