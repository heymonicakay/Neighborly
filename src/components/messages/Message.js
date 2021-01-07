import React, { useContext, useEffect, useRef, useState } from 'react'
import { EditDeleteMessageButton } from './EditMessageButton'
import { AdminMessageApproval } from './AdminMessageApproval'
import { MessageContext } from './MessageProvider'
import "./Message.css";

export default (props) => {
    const { deleteMessage } = useContext(MessageContext)
    const deleteMessageDialog = useRef(null)
    const image = props.message.messageimages[0] && props.message.messageimages[0].image

    const handleDelete = (p) => {
        deleteMessage(p.id).then(()=> props.history.push("/messages"))
    }
    return (
        <>
        <dialog className="dialog dialog--deleteMessage" ref={deleteMessageDialog}>
            <div>
                Are you sure you want to delete this message?
            </div>
            <button className="button--closeDialog btn" onClick={() => deleteMessageDialog.current.close()}>
                Close
            </button>
            <button className="button--deleteDialog btn" onClick={() => handleDelete(props.message)}>
                Delete Message
            </button>
        </dialog>

        <section className="message">
            <div className="manage-buttons top-align">
                <EditDeleteMessageButton
                message={props.message}
                edit
                {...props}/>

                <EditDeleteMessageButton
                message={props.message}
                {...props}/>
            </div>
            <div className="message-list-single">
                <div className="message-list-top">
                    <div className="message-title-wrapper">
                    <img src={image} className="message-image" />
                        {props.message.name}<br />
                        Owner: {props.message.owner_full_name}<br />
                        <i>{props.message.listed_date ? "listed" : "unlisted"}</i>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}