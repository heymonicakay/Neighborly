import React, { useState, useEffect } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({posts:{}, images:{}})
    const [token, setToken] = useState('')
    // const [currentUserProfile, setCurrentUserProfile] = useState({subscriptions:{}, posts:{}, subscribers:{}})
    // const [currentUserSubscriptions, setCurrentUserSubscriptions] = useState([])
    // const [activeSubscriptions, setActiveSubscriptions] = useState([])
    // const [followedAuthors, setFollowedAuthors] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8000/users", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setUsers)
    }

    const getCurrentUser = () => {
        return fetch("http://localhost:8000/users/current_user", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
    }

    // const getUserProfile = (userId) => {
    //     return fetch(`http://localhost:8000/users/${userId}`, {
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("rare_token")}`,
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(res => res.json())

    // }

    // const changeUserType = (userId) => {
    //     return fetch(`http://localhost:8000/users/${userId}/change_type`, {
    //         method: "PATCH",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("rare_token")}`,
    //             "Content-Type": "application/json"
    //         },
    //     })
    //         .then(getUsers)
    // }

    // const changeUserActive = (userId) => {
    //     return fetch(`http://localhost:8000/users/${userId}/change_active`, {
    //         method: "PATCH",
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("rare_token")}`,
    //             "Content-Type": "application/json"
    //         },
    //     })
    //         .then(getUsers)
    // }

    // const getCurrentUserSubscriptions = () => {
    //     return fetch(`http://localhost:8000/subscriptions`, {
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("rare_token")}`
    //         }
    //     })
    //         .then(res => res.json())
    // }

    // const getUserSubscriptions = (id) => {
    //     return fetch(`http://localhost:8000/subscriptions?author_id=${id}`, {
    //         headers: {
    //             "Authorization": `Token ${localStorage.getItem("rare_token")}`
    //         }
    //     })
    //         .then(res => res.json())
    // }

    useEffect(()=>{
        if(token){
            getCurrentUser().then(setCurrentUser)
        }
        else{
            setCurrentUser({})
        }
    }, [token])

    return (
        <UserContext.Provider value={{
            users,
            getUsers,
            currentUser,
            getCurrentUser,
            setCurrentUser,
            token,
            setToken
            // changeUserType,
            // changeUserActive,
            // getUserProfile,
            // currentUserProfile,
            // setCurrentUserProfile,
            // getCurrentUserSubscriptions,
            // currentUserSubscriptions,
            // setCurrentUserSubscriptions,
            // setActiveSubscriptions,
            // setFollowedAuthors,
            // followedAuthors,
            // activeSubscriptions,
            // getUserSubscriptions
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
