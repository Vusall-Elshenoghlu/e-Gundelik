import React, {createContext, useEffect, useState} from 'react'

export const darkModeContext = createContext()
function DarkModeProvider({children}) {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true")

    useEffect(() =>{
      localStorage.setItem("darkMode", darkMode)
      document.body.className = darkMode ? "dark" : "light"
    },[darkMode])
  return (
    <darkModeContext.Provider value={{darkMode, setDarkMode}}>
      {children}
    </darkModeContext.Provider>
  )
}

export default DarkModeProvider
