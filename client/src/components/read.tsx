import React, { useState, useContext } from "react";
import { loginContext } from "./context";
import Axios from "axios";
import ReactMarkdown from "react-markdown";
 
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";



export default function Read() {

    const { REACT_APP_SERVER_URL } = process.env;
    const params = useParams();
    const loginctx = useContext(loginContext);
    const [postData, setPostData] = useState<any>();
    const [samePoster, setSamePoster] = useState<boolean>(false);

    function posterPostId(posterId: string, postId: string) {
        return posterId === postId;
    }

    const blogpost = Axios.get(`${REACT_APP_SERVER_URL}/blogpost`, {
        params: {
            id: params.id
        }
        })
        .then((res) => {
            setPostData(res.data);
        }).catch((err) => {
            
        });



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
            { loginctx ? (
                <>
                
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