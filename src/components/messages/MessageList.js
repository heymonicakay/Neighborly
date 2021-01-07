// All messages view shows all published messages
import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import "./Message.css";
// import {AdminMessageApproval} from "./AdminMessageApproval"
import { UserContext } from "../users/UserProvider";
import Message from "./Message"


export const MessageList = (props) => {
// CONTEXT
    const {getMessages, getMessagesByUser, getMessagesByCategory} = useContext(MessageContext)
    const {currentUser} = useContext(UserContext)
// STATE
    const [ filteredMessages, setFilteredMessages ] = useState([])
    const [ byUser, setMessagesByUser ] = useState([])
    const [ byCategory, setByCategory ] = useState([])
    const [ myMessages, setMyMessages ] = useState([])
    const [ subscribed, setSubscribed ] = useState([])
    const [ allMessages, setAllMessages ]=useState([])

    useEffect(()=>{
        if(props.allMessages){
            getMessages().then(messages=>{
                console.log(messages, "ALL ITEMS RES")
                setAllMessages(messages)
            })
        }
        if(props.sent){
                getMessagesByUser(currentUser.id).then( messages =>{
                    setMyMessages(messages)
                })

        }
        if(props.byUser){
            const userId = parseInt(props.match.params.userId)
            getMessagesByUser(userId).then((messages)=>{
                setMessagesByUser(messages)
            })
        }
        if(props.byCategory){
            const catId = parseInt(props.match.params.categoryId)
            getMessagesByCategory(catId).then((messages)=>{
                setByCategory(messages)
            })
        }
    }, [])

    useEffect(()=>{
        if(subscribed && currentUser && currentUser.is_staff){
            setFilteredMessages(subscribed)
        }
        else{
            const filtered = subscribed.filter(p=> p.listed_date !== null) || []
            setFilteredMessages(filtered)
        }
    }, [subscribed])

    useEffect(()=>{
        if(allMessages && currentUser){
            if(currentUser.is_staff){
                setFilteredMessages(allMessages)
            }
            else{
                // const filtered = allMessages.filter(p=> p.listed_date === null) || []
                setFilteredMessages(allMessages)
            }
        }
    }, [allMessages])

    useEffect(()=>{
        if(byCategory && currentUser && currentUser.is_staff){
            setFilteredMessages(byCategory)
        }
        else{
            const filtered = byCategory.filter(p => p.listed_date !== null) || []
            setFilteredMessages(filtered)
        }
    }, [byCategory])

    useEffect(()=>{
        if(myMessages && currentUser){
            setFilteredMessages(myMessages)
        }
    }, [myMessages])

    // useEffect(()=>{
    //     if(byUser && currentUser && currentUser.is_staff){
    //         setFilteredMessages(byUser)
    //     }
    //     else{
    //         const filtered = byUser.filter(p=> p.listed_date !== null) || []
    //         setFilteredMessages(filtered)
    //     }
    // }, [byUser])

    return (
        <>
        <div className="mainMessageContainer">
            {filteredMessages.map(p => {

                return (
                    <Message
                    key={p.id}
                    currentUser={currentUser}
                    admin={currentUser.user.is_staff}
                    is_owner={currentUser.id === p.owner.id}
                    message={p}
                    {...props}/>
                )
            })
            }
        </div>
        </>
    )
}