import React, { useState, useContext, useEffect } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import ReactMarkdown from "react-markdown";
 
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";



export default function Read() {

    const { REACT_APP_SERVER_URL } = process.env;
    const params = useParams();
    const { currentUser } = useContext(loginContext);
    const [postData, setPostData] = useState<any>();
    const [poster, setPoster] = useState<any>();
    const [samePoster, setSamePoster] = useState<boolean>(false);

    const getPost = () => {     
        Axios.get(`${REACT_APP_SERVER_URL}/blogpost`, {
        params: {
            id: params.id
        }
        })
        .then((res) => {
            setPostData(res.data);
            if (currentUser?._id === res.data.posterId) {
                setSamePoster(true);
            }
            //Chained axios call to get the posters information
            return Axios.get(`${REACT_APP_SERVER_URL}/api/auth/userbyid`, {
                params: {
                    id: res.data.posterId
                }
            }).then((user) => {
                setPoster(user.data)
            }).catch((err) => {
                console.log(err);
            })

        }).catch((err) => {
            console.log(err);
        });
    }

    const likePost = () => {
        Axios.post(`${REACT_APP_SERVER_URL}/like`, {
            data: {
                postId: params.id
            }
        })
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect (() => {
        getPost();
    }, []);


    return (
        <div className="align-items-center">
        { postData ? (
            <>
            <div>
                <h1>{postData.title}</h1>
                <h5>By {poster?.username} | {postData.date_created}</h5>
                <br></br>
                <p>
                    <ReactMarkdown>
                        {postData.text}
                    </ReactMarkdown>
                </p>
            </div>
            <div>

            <button onClick={likePost}>Like</button>
            { samePoster ? (
                <>
                | 
                <Link className="editBtn ms-auto" to={`/editpost/${postData._id}`}> 
                Edit Post
                </Link>
                </>
            ) : (
                <>
                
                </>
            )
            }
            </div>
            </>
        ) : (
            <>
                <p>Loading post...</p>
            </>
        )
    }
        </div>
    );
};