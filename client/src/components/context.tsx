import Axios from 'axios';
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'

export const loginContext = createContext<any>({});
export default function Context(props : PropsWithChildren<any>) {
    const [user,setUser] = useState();
    useEffect(() => {
        Axios.get("http://localhost:5000/api/auth/user", { withCredentials: true }).then(res => {
            setUser(res.data);
        }).catch((err) => {
            console.log(err);
        });
    })
    return (
        <loginContext.Provider value={user}>{props.children}</loginContext.Provider>
    )
}
