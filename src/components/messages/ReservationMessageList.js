// All messages view shows all published messages
import React, { useContext, useEffect, useState } from "react"
import "./Message.css";
import { MessageContext } from "./MessageProvider";
import { UserContext } from "../users/UserProvider"
import Message from "./Message"

export const ReservationMessageList = (props) => {
    // CONTEXT
    const { getMessagesByReservation, sendMsg } = useContext(MessageContext)
    const {currentUser} = useContext(UserContext)
    // STATE
    const [ messages, setMessages ] = useState([])
    const [otherUser, setOtherUser] = useState({})
    const [msg, setMsg] = useState({})

console.log(props.match.params, "PROPS.")
const resId = parseInt(props.match.params.reservationId)

    useEffect(()=>{
        getMessagesByReservation(resId).then(setMessages)
    }, [])
    useEffect(() => {
        // Extract the other user's information from the array of messages,
        // where the other user could be either the sender or the recipient
        if (messages && messages.length > 0) {
            const otherObject = messages.find(message => message.sender !== currentUser.id || message.recipient !== currentUser.id);
            console.log(otherObject.sender, "OTHER OBJECT INSIDE USEEFFECT")
            console.log(currentUser.id, "CURRENT USER ID INSIDE USEEFFECT")

            setOtherUser(otherObject.sender.id === currentUser.id ?
            otherObject.recipient
            : otherObject.sender);
        }
        // eslint-disable-next-line
    }, [messages])
    console.log(otherUser, "OTHER OBJECT")

    const handleChange = (e) => {
        const newMsg = Object.assign({}, msg)
        newMsg[e.target.name] = e.target.value
        setMsg(newMsg)
    }

    console.log(otherUser, "other user")

    const handleSendMessage = () => {
        const msgObj = {
            reservation_id: resId,
            recipient_id: parseInt(otherUser.id),
            read_date: null,
            body: msg.body
        }
        sendMsg(msgObj).then(()=> getMessagesByReservation(resId)).then(res =>{
            console.log(res, "RESPONSE")
            setMessages(res)
            setMsg({})
        })
    }

console.log(messages, "MESSAGES")
    return (
        <>
        <div className="mainMessageContainer">
            <button className="btn" onClick={()=>{
            props.history.push('/messages')
            }}>Back to all Messages</button>

            <p className="resmsghead">Your Conversation with {otherUser && otherUser.full_name}</p>

            {messages !== [] ?
                messages.map(p => {
                    console.log(messages, "MESSAGES")

                    return (
                        <Message
                        key={p.id}
                        currentUser={currentUser}
                        message={p}
                        {...props}/>
                    )
                }).reverse()
            : "No messages"
            }
        </div>
        <div className="reply-form">
            <input className="reply-input" type="textarea" name="body" onChange={handleChange}/>
            <button className="reply-btn btn" onClick={() => {
                handleSendMessage()
                }}>Reply</button>
        </div>
        </>
    )
}