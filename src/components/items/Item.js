import React, { useContext, useEffect, useRef, useState } from 'react'
import { ItemCategory } from './ItemCategory'
import { ItemImage } from './ItemImage'
import { ItemName } from './ItemName'
import { EditDeleteItemButton } from './EditItemButton'
import { AdminItemApproval } from './AdminItemApproval'
import { ItemOwner } from './ItemOwner'
import { MessageContext } from "../messages/MessageProvider";
import { ItemContext } from './ItemProvider'
import ItemPublishDate from './ItemPublishDate'
import {UserContext} from '../users/UserProvider'
import "./Item.css";

export default (props) => {
    const { deleteItem, reserveItem } = useContext(ItemContext)
    const {sendMsg } = useContext(MessageContext)
    const deleteItemDialog = useRef(null)
    const reserveItemDialog = useRef(null)
    const image = props.item.itemimages[0] && props.item.itemimages[0].image
    const [msg, setMsg] = useState({})
    const [reservationId, setReservationId] = useState("")
    const { currentUser } = useContext(UserContext)
    const handleDelete = (p) => {
        deleteItem(p.id).then(()=> props.history.push("/items"))
    }
    const reserveClick = () => {
        reserveItemDialog.current.showModal();
    }

    const handleChange = (e) => {
        const newMsg = Object.assign({}, msg)
        newMsg[e.target.name] = e.target.value
        setMsg(newMsg)
    }

    const handleSendMessage = () => {
        const id = parseInt(props.item.owner.id)
        const msgObj = {
            reservation_id: reservationId,
            recipient_id: id,
            read_date: null,
            body: msg.body
        }
        sendMsg(msgObj).then(setMsg({}))
    }

    const reserve = () => {
        const id = parseInt(props.item.id)
        const resObj = {
            requested_start: "2021-02-15",
            requested_end: "2021-02-16",
            start: null,
            end: null
        }
        reserveItem(id, resObj).then(res => setReservationId(res.id))
    }

    return (
        <>
        <dialog className="dialog dialog--deleteItem" ref={deleteItemDialog}>
            <div>
                Are you sure you want to delete this item?
            </div>
            <button className="button--closeDialog btn" onClick={() => deleteItemDialog.current.close()}>
                Close
            </button>
            <button className="button--deleteDialog btn" onClick={() => handleDelete(props.item)}>
                Delete Item
            </button>
        </dialog>

        <dialog className="dialog dialog--deleteItem" ref={reserveItemDialog}>
            <div>
                Send a message to {props.item.owner.full_name} to reserve this item.
            </div>
            <textarea className="text-area message" name="body" onChange={handleChange}  />
            <button className="button--closeDialog btn" onClick={() => reserveItemDialog.current.close()}>
                Cancel
            </button>
            <button className="button--deleteDialog btn" onClick={() => {
                handleSendMessage()
                reserveItemDialog.current.close()}}>
                Send
            </button>
        </dialog>

        <section className="item">
            <div className="manage-buttons top-align">
                <EditDeleteItemButton
                item={props.item}
                edit
                {...props}/>

                <EditDeleteItemButton
                item={props.item}
                {...props}/>
            </div>
            <div className="item-list-single">
                <div className="item-list-top">
                    <div className="item-title-wrapper">
                    <img src={image} className="item-image" />
                        {props.item.name}<br />
                        Owner: {props.item.owner_full_name}<br />
                        {/* <i>{props.item.listed_date ? "listed" : "unlisted"}</i> */}
                    </div>
                    <div>
                        {props.item.owner.id === currentUser.id ? null : <button onClick={() => {
                            reserve()
                            reserveClick()}}>
                            Reserve
                        </button>}
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}