import React, {useContext, useState} from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Neighborly.css"
import { UserProvider } from "./users/UserProvider"

export const Neighborly = () => {
    return(<>
        <Route render={() => {
            if (localStorage.getItem("token")) {

                return (
                    <>
                    <UserProvider>
                        <Route render={props =>
                            <ApplicationViews
                            {...props}  />} />

                    </UserProvider>
                    </>
                )
            }
            else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={(props) => {
            if (localStorage.getItem("token")) {
                return <Redirect to="/rare" />
            } else {
                return (
                <>
                <UserProvider>
                    <Login {...props} />
                </UserProvider>
                </>
                )
            }
        }} />

        <UserProvider>
            <Route path="/register" render={(props) => {
                if (localStorage.getItem("token")) {
                    return <Redirect to="/rare" />
                }
                else {
                    return <Register {...props}/>
                }
            }} />
        </UserProvider>
    </>)
}


