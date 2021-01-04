import React, {useContext} from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./Neighborly.css"
import { UserContext } from "./users/UserProvider"

export const Neighborly = () => {
    const {token} = useContext(UserContext)

    return(<>
        <UserProvider>
            <Route render={() => {
                if (token) {
                    return (
                        <Route render={props => <ApplicationViews {...props}  />}/>
                    )
                }
                else {
                    return <Redirect to="/login" />
                }
            }} />

            <Route path="/login" render={props => {
                if (token) {
                    return <Redirect to="/explore" />
                }
                else {
                    return (
                        <Login {...props} />
                    )
                }
            }} />

            <Route path="/register" render={props => {
                if (token) {
                    return <Redirect to="/explore" />
                }
                else {
                    return <Register {...props}/>
                }
            }} />
        </UserProvider>
    </>)
}


