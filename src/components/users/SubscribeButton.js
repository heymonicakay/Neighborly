// import React, { useContext, useEffect, useState } from "react"
// import { SubscriptionContext } from './SubscriptionProvider'
// import "./User.css"

// export const SubscribeButton = (props) => {
//     const { manageSubscription, checkIfSubscriptionExists } = useContext(SubscriptionContext)
//     const [subscribed, setSubscribed] = useState(null)

//     useEffect(()=>{
//         checkIfSubscriptionExists(props.author_id).then(res=>{
//             if(res && res.ended_on !== null){
//                 setSubscribed(false)
//             }
//             else{
//                 setSubscribed(true)
//         }})
//     }, [])

//     const handleClick = () => {
//         manageSubscription(props.author_id).then((res)=> {
//             if(res.message == 'unsubscribed'){
//                 setSubscribed(false)
//             }
//             else if(res.message == 'subscribed'){
//                 setSubscribed(true)
//             }
//         })
//     }

//     const CurrentUserCheck = () => {
//         if(props.currentUser && props.currentUser.id !== props.author_id){
//             return (
//                 <button className="subscribe btn" onClick={handleClick}>
//                     {subscribed ? "Unsubscribe" : "Subscribe"}
//                 </button>
//             )
//         }
//         else{
//             return null
//         }
//     }

//     return (
//         <>
//             <CurrentUserCheck />
//         </>
//     )
// }