// import React, { useState } from "react"
// export const SubscriptionContext = React.createContext()

// export const SubscriptionProvider = (props) => {
//     const api = 'http://localhost:8000/subscriptions'
//     const token = localStorage.getItem("rare_token")

//     const [subscriptions, setSubscriptions] = useState([])
//     const [subscription, setSubscription] = useState({})

//     const getAllSubscriptions = () => {
//         return fetch(`${api}`, {
//             headers: {
//                 "Authorization": `Token ${token}`,
//                 "Content-Type": "application/json"
//             }
//         })
//             .then(res => res.json())
//             .then(setSubscriptions)
//     }

//     const checkIfSubscriptionExists = authorId => {
//         return fetch(`${api}?author=${authorId}`, {
//             headers: {
//                 "Authorization": `Token ${token}`,
//                 "Content-Type": "application/json"
//             }
//         }).then(res => res.json())
//     }

//     const getAuthorsSubscribers = authorId => {
//         return fetch(`${api}?followers=${authorId}`, {
//             headers: {
//                 "Authorization": `Token ${token}`,
//                 "Content-Type": "application/json"
//             }
//         })
//             .then(res => res.json())
//     }

//     const createSubscription = sub => {
//         return fetch(`${api}`, {
//             method: "POST",
//             headers: {
//                 "Authorization": `Token ${token}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(sub)
//         })
//         .then(res => res.json())
//         .then(newSub => {
//             return newSub.author.id })
//     }

//     const manageSubscription = (authorId) => {
//         return fetch(`${api}/${authorId}/manage`, {
//             method: "PATCH",
//             headers:{
//                 "Authorization": `Token ${token}`,
//                 "Content-Type": "application/json"
//             }
//         }).then(res => res.json())
//     }

//     return (
//         <SubscriptionContext.Provider value={{
//             subscriptions,
//             createSubscription,
//             getAllSubscriptions,
//             manageSubscription,
//             checkIfSubscriptionExists,
//             getAuthorsSubscribers,
//             setSubscription,
//             subscription
//         }}>
//             {props.children}
//         </SubscriptionContext.Provider>
//     )
// }