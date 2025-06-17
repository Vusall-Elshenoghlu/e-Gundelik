import React, { createContext, useState } from 'react'
import axios from "axios"
export const UserContext = createContext()
function UserProvider({children}) {
    const [users,setUsers] = useState([])
    const [error,setError] = useState(null)
    const [loggedInUser,setLoggedInUser] = useState(null)
    function getUsers(){
        axios.get("http://localhost:3000/users/")
        .then((res) =>{
            setUsers(res.data)
        })
        .catch((err) =>{
            setError(err)
        })
    }
    function registerUser(newUser){
        const userExist = users.some((user) => user.email === newUser.email);
        if(userExist) {
            alert("This email is already registered...")
            setError("This email is already registered...")
            return false
        }
        axios.post("http://localhost:3000/users/register",newUser)
        .then((res) =>{
            alert("User has registered successfully")
            setUsers([...users,res.data])
            setError(null)
        })
        .catch((err) =>{
            setError("Registration failed")
        })
        return true
    }

    function loginUser(email,password){
        const user = users.find((user) => user.email === email)
        if(!user) {
            setError("email does not exist...")
            return false
        }
        if (user.password !== password){
            setError("Incorrect password...")
            return false
        }
        setLoggedInUser(user)
        setError(null)
        return true
    }
  return (
    <UserContext.Provider value={{users,setUsers,registerUser,loginUser,loggedInUser,error}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
