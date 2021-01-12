import React, { useState, useEffect } from "react"

export const MessageContext = React.createContext()

export const MessageProvider = (props) => {
    const [token, setToken] = useState(localStorage.getItem("token"))

    const getUserMessages = () => {
        return fetch("http://localhost:8000/messages", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }

    const getMessageSentByUser = () => {
        return fetch("http://localhost:8000/messages/sent", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }

    const getMessagesByReservation = (id) => {
        return fetch(`http://localhost:8000/messages?reservation_id=${id}`, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(r=>{
            console.log(r, "RETURNED STUFF")
            return r
        })
    }

    const sendMsg = msg => {
        return fetch(`http://localhost:8000/messages`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(msg)
        })
            .then(res => res.json())
    }

    const getReservations = () => {
        return fetch("http://localhost:8000/reservations", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res => {
            return res
        })
    }

    return (
        <MessageContext.Provider
        value={{
            getUserMessages,
            getMessageSentByUser,
            getReservations,
            getMessagesByReservation,
            sendMsg
        }}>
            {props.children}
        </MessageContext.Provider>
    )
}

