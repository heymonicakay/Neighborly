import React from 'react'
import "./Message.css";

export default (props) => {

    return (
        <>
        <section className={`${props.message.sender.id !== props.currentUser.id ? "other-user-msg" : "user-msg"}`}>
            <div className={`${props.message.sender.id !== props.currentUser.id ? "other-user-msg-body" : "user-msg-body"}`}>
                {props.message.body}<br />
            </div>
        </section>
        </>
    )
}