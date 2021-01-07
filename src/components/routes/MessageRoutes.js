import React from "react";
import { Route } from "react-router-dom";
import { MessageList }  from "../messages/MessageList"

export default () => {
    return (
        <>
            <Route exact path="/messages" render={props =>
                <MessageList {...props} />}/>
            <Route exact path="/messages/sent" render={props =>
                <MessageList sent {...props} />}/>
        </>
    )
}