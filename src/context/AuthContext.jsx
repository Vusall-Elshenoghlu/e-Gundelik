import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    if(typeof window !=="undefined"){
        const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;


    }
});

const [accessToken, setAccessToken] = useState(() => {
  return localStorage.getItem("accessToken") || null;
});

const [refreshToken, setRefreshToken] = useState(() => {
  return localStorage.getItem("refreshToken") || null;
});

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("user");
    //     const storedAccessToken = localStorage.getItem("accessToken")
    //     const storedRefreshToken = localStorage.getItem("refreshToken")

    //     if (storedUser && storedAccessToken && storedRefreshToken) {
    //         setUser(JSON.parse(storedUser));
    //         setAccessToken(storedAccessToken)
    //         setRefreshToken(storedRefreshToken)
    //     }
    // }, [user,accessToken,refreshAccessToken]);


    const refreshAccessToken = async () => {
        try {
            const res = await axios.post("https://turansalimli-001-site1.ntempurl.com/api/Token", {
                refreshToken: localStorage.getItem("refreshToken")
            })
            console.log("new token: ", res.data)
            const newAccessToken = res.data.accessToken
            setAccessToken(newAccessToken)
            localStorage.setItem("accessToken", newAccessToken)
            return newAccessToken
        }
        catch (err) {
            console.error("Refresh token failed", err.message);
            logout();
            return null;
        }
    }


    const logout = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.clear();
    };

    return (
        <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, refreshToken, setRefreshToken, refreshAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
