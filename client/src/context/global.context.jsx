import React, { createContext, useState } from "react";
import { fetchCurrentUserData } from '../utils/api'


export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    // const []

    return (
        <GlobalContext.Provider value={{ count, increment }}>
            {children}
        </GlobalContext.Provider>
    )
}