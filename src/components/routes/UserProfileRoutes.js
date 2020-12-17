import React from "react";
import { Route } from "react-router-dom";
import { UsersList }  from "../users/UsersList"
import { UserProfile } from "../users/UserProfile"

export default () => {
    return (
        <>
            <Route exact path="/users" render={(props) =>
                <UsersList {...props} />}/>
            <Route exact path="/users/:userId(\d+)" render={(props) =>
                <UserProfile {...props} />}/>
        </>
    )
}