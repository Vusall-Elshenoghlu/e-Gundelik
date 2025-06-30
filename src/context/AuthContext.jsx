import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("user");
            return stored ? JSON.parse(stored) : null;
        }
        return null;
    });

    const [accessToken, setAccessToken] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("accessToken");
        }
        return null;
    });

    const [refreshToken, setRefreshToken] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("refreshToken");
        }
        return null;
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
    // }, []);


    const refreshAccessToken = async () => {


        if (!refreshToken) {
            console.warn("No refresh token found");
            return null;
        }

        try {
            
            console.log("aaa");
            console.log(refreshToken)
            const res = await axios.post(`https://turansalimli-001-site1.ntempurl.com/api/Token?refreshToken=${refreshToken}`);
            console.log(res.data)
            console.log("bbb");

            const newAccessToken = res.data.accessToken;
            setAccessToken(newAccessToken);
            localStorage.setItem("accessToken", newAccessToken);
            console.log("new Acceess Token: ", newAccessToken)
            return newAccessToken;
        } catch (err) {
            console.error("Refresh token failed", err.message);
            return null; 
        }
    };



    const logoutRememberME = () => {
        setUser(null);
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
    };


    const logout = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, setUser, accessToken, setAccessToken, refreshToken, setRefreshToken, refreshAccessToken, logout, logoutRememberME }}>
            {children}
        </AuthContext.Provider>
    );
};
