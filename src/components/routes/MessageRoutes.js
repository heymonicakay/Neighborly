import React from "react";
import { Route } from "react-router-dom";
import { MessageList }  from "../messages/MessageList"
import { ReservationMessageList } from '../messages/ReservationMessageList'
import { MessageProvider } from "../messages/MessageProvider"
import { ItemProvider } from "../items/ItemProvider"


export default () => {
    return (
        <>
        <MessageProvider>
        <ItemProvider>
            <Route exact path="/messages" render={props =>
                <MessageList {...props} />}/>
            <Route exact path="/messages/sent" render={props =>
                <MessageList sent {...props} />}/>
            <Route exact path="/reservation/:reservationId(\d+)" render={props =>
                <ReservationMessageList {...props} />}/>
        </ItemProvider>
        </MessageProvider>
        </>
    )
}