import Axios from 'axios';
import React, { createContext, PropsWithChildren, useEffect, useState, FC, ReactNode } from 'react'

export const loginContext = createContext<any>({});

const { REACT_APP_SERVER_URL } = process.env;

type ProviderProps = {
    children: ReactNode;
};

/* export const LoginContextProvider: FC = ({}) => {
    const [currentUser, setCurrentUser] = useState();


} */

export default function Context(props : PropsWithChildren<any>) {
    const [currentUser,setCurrentUser] = useState();

    useEffect(() => {
        checkLogin();
    }, []);

    const checkLogin = async () => {
        Axios.get(`${REACT_APP_SERVER_URL}/api/auth/user`, { withCredentials: true }).then(res => {
            setCurrentUser(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleLogout = () => {
        setCurrentUser(undefined);
    }

    const stateValues = {
        checkLogin,
        handleLogout,
        currentUser
    }

    return (
        <loginContext.Provider value={stateValues}>{props.children}</loginContext.Provider>
    )
}
