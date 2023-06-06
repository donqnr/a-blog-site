// Context page, handles who's logged in

import Axios from 'axios';
import React, { createContext, PropsWithChildren, useEffect, useState, FC, ReactNode } from 'react'
import { useCookies } from 'react-cookie';

export const loginContext = createContext<any>({});

const { REACT_APP_SERVER_URL } = process.env;

type ProviderProps = {
    children: ReactNode;
};

/* export const LoginContextProvider: FC = ({}) => {
    const [currentUser, setCurrentUser] = useState();


} */

export default function Context(props : PropsWithChildren<any>) {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [currentUser,setCurrentUser] = useState<any>();

    useEffect(() => {
        console.log(currentUser)
        checkLogin();
    }, [cookies]);

    const checkLogin = () => {
        Axios.post(`${REACT_APP_SERVER_URL}/api/auth`,
        // so apparently adding these brackets before withCredentials was the key
        // to getting it to send the JWT token???
        {},
        // what???
        { withCredentials: true, },
        ).then(res => {
            
            if (res.data.status) {
                setCurrentUser(res.data);
            }
            
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleLogout = () => {
        setCurrentUser(undefined);
        removeCookie('token');
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
