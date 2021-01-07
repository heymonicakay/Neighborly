import React, { useState, useEffect, useContext } from "react"
import "./Nav.css"
import Logo from "./neighborly_logo.png"
import { UserContext } from "../users/UserProvider"

export const Nav = (props) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [admin, setAdmin] = useState(false)
    const {currentUser, getCurrentUser} = useContext(UserContext)

    useEffect(()=>{
        getCurrentUser()
    }, [])

    useEffect(()=>{
        if(localStorage.getItem("token") !== null){
            setLoggedIn(true)
        }
        else{
            setLoggedIn(false)
        }
    }, [])

    const handleLogout = () => {
        localStorage.clear()
    }

    return (
        <>
        <div className="nav">
            <div className="nav__inner">
                <div className="spacer__nav--left"></div>
                <div className="link logo-wrapper left">
                    <div className="top-space"></div>
                    <div className="middle-wrap">
                        <img className="nav__logo"
                        to="/items"
                        onClick={()=>{props.history.push("/items")}}
                        src={Logo} />
                        <div className="right-middle"></div>
                    </div>
                    <div className="bottom-space"></div>
                </div>
                <div className="link user-nav-wrapper right">
                    <div className="top-space"></div>
                    <div className="link wrapper__nav--right">
                        <div className={`${admin ? "admin-nav-link-wrap": "nav__link-wrapper"}`}>
                            <button
                            title="View All Items"
                            className="btn nav__btn all-items"
                            onClick={()=>props.history.push(`${loggedIn ? '/items' : '/login'}`)}>
                                All Items
                            </button>



                                <button
                                title="View My Items"
                                className="btn nav__btn my-items"
                                onClick={()=>props.history.push(`/items/mine`)}>
                                    My Items
                                </button>

                                <button
                                className="btn nav__btn user-manager"
                                onClick={()=>props.history.push(`/messages`)}>
                                    Messages
                                </button>
                                <button
                                title="Create Item"

                                className="btn nav__btn new-item"
                                onClick={()=>props.history.push(`/new_item`)}>
                                    +
                                </button>



                            <button
                            title={`${loggedIn ? "Logout" : "Login"}`}
                            className={`btn nav__btn ${loggedIn ? "logout" :"get-started"}`}
                            onClick={() => {
                                if(loggedIn){
                                    handleLogout()
                                    props.history.push("/items")
                                }
                                else{
                                    props.history.push("/login")
                                }
                            }}>
                                {loggedIn ? "Logout" : "Get Sarted"}
                            </button>
                        </div>
                    </div>
                    <div className="bottom-space"></div>
                </div>
                <div className="spacer__nav--right"></div>
            </div>
        </div>
        </>
    )
}

