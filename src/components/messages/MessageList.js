// All messages view shows all published messages
import React, { useContext, useEffect, useState } from "react"
import "./Message.css";
import { MessageContext } from "./MessageProvider";
import { UserContext } from "../users/UserProvider"
import Message from "./Message"
import Reservation from "./Reservation"


export const MessageList = (props) => {
// CONTEXT
    const {getUserMessages, getMessageSentByUser, getReservations} = useContext(MessageContext)
    const {currentUser} = useContext(UserContext)
// STATE
    const [ messages, setMessages ] = useState([])
    const [ reservations, setReservations ] = useState([])

    useEffect(()=>{
        // if(props.sent){
        //     getMessageSentByUser().then( msgs =>{
        //             setMessages(msgs)
        //         })
        // }
        // else{
            getReservations().then(res=>{
                const filtered = res.filter(r => {

                    if( r.item.owner.id === currentUser.id || r.user.id === currentUser.id){
                        return r
                    }
                })
                setReservations(filtered)
            })
        // }
    }, [])
console.log(reservations,"RESERVATIONS")

    return (

        <div className="mainMessageContainer">
        <button className="btn" onClick={()=>{
            props.history.push('/messages/sent')
        }}>Sent Messages</button>
        <button className="btn" onClick={()=>{
            props.history.push('/messages')
        }}>All Messages</button>
        {reservations ?
        reservations.map(p => {
                console.log(messages, "MESSAGES")

                return (
                    <Reservation
                    key={p.id}
                    currentUser={currentUser}
                    reservation={p}
                    {...props}/>
                )
            }).reverse()
        : "No reservations"
        }
        </div>

    )
}