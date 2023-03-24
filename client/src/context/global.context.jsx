import React, { createContext, useState } from "react";


export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {


    const [currentUserData, setCurrentUserData] = useState({
        id: null,
        name: null,
        email: null,
    })

    return (

        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    )
};