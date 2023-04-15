import Axios from 'axios';
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'

export const loginContext = createContext<any>({});
const { REACT_APP_SERVER_URL } = process.env;
export default function Context(props : PropsWithChildren<any>) {
    const [user,setUser] = useState();
    useEffect(() => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/auth/user`, { withCredentials: true }).then(res => {
            setUser(res.data);
        }).catch((err) => {
            console.log(err);
        });
    })
    return (
        <loginContext.Provider value={user}>{props.children}</loginContext.Provider>
    )
}
