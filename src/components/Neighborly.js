import React, {useContext, useState} from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Neighborly.css"
import { UserContext } from "./users/UserProvider"

export const Neighborly = () => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    return(<>
        <Route render={() => {
            return (token ? <Route render={props => <ApplicationViews {...props}  />}/> : <Redirect to="/login" />)
        }} />

        <Route path="/login" render={props => {
            return (token ? <Redirect to="/items" /> : <Login {...props} />)
        }} />

        <Route path="/register" render={props => {
            return (token ? <Redirect to="/items" /> : <Register {...props}/>)
        }} />
    </>)
}


