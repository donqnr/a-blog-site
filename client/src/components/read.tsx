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
    const [poster, setPoster] = useState();
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

        }).catch((err) => {
            console.log(err);
        });
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
                <p>
                    <ReactMarkdown>
                        {postData.text}
                    </ReactMarkdown>
                </p>
            </div>
            <div>

            <Link className="likeBtn ms-auto" to=""> Like </Link>
            |
            <Link className="dislikeBtn ms-auto" to=""> Dislike </Link>
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