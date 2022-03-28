import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { getAccessToken } from '../api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        setIsLoggedIn(false);
        SecureStore.deleteItemAsync('jwt_access_token');
    }

    useEffect(() => {
      getAccessToken().then(token => {
          if (token) setIsLoggedIn(true);
      })
    }, [])
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;