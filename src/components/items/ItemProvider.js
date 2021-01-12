
import React, { useState, useContext } from "react"
import {UserContext} from '../users/UserProvider'
export const ItemContext = React.createContext()

export const ItemProvider = (props) => {
    const api = 'http://localhost:8000/items'
    const [items, setItems] = useState([])
    const [item, setCurrentItem] = useState({owner:{}, category:{}})
    const [token, setToken] = useState(localStorage.getItem("token"))

    const getItems = () => {
        return fetch(`${api}`, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
    }

    const getItemById = (itemId) => {
        return fetch(`${api}/${itemId}`, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setCurrentItem)
    }

    const addItem = item => {
        return fetch(`${api}`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then((res) => {
                getItems()
                return res.id})
    }

    const deleteItem = itemId => {
        return fetch(`${api}/${itemId}`, {
            method: "DELETE",
            headers: {"Authorization": `Token ${token}`},
        })
        .then(getItems)
    }

    const getItemsByUser = (userId) => {
        return fetch(`${api}?owner_id=${userId}`, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
    }

    const getItemsByCategory = category_id => {
        return fetch(`${api}?category_id=${category_id}`, {
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
    }

    const updateItem = item => {
        return fetch(`${api}/${item.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(getItems)
    }

    const adminItemApproval = (itemId) => {
        return fetch(`${api}/${ itemId }/approval`, {
            method: "PATCH",
            headers:{
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(getItems)
    }

    const publishItem = (itemId) => {
        return fetch(`${api}/${ itemId }/publish`, {
            method: "PATCH",
            headers:{
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(getItems)
    }

    const getSubscribedItems = (userId) => {
        return fetch(`${api}?subscribed=${userId}`, {

        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
    }

    const reserveItem = (itemId, reservation) => {
        return fetch(`${api}/${itemId}/reserve`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reservation)
    })
        .then(res => res.json())
    }
    // URL: http://localhost:8000/items/1/reserve
    // Request Method: POST
    // Payload: reservation object
    //     {
            // "requested_start": "2021-01-15",
            // "requested_end": "2021-01-16",
            // "start": null,
            // "end": null
    //     }

    return (
        <ItemContext.Provider value={{
            items,
            addItem,
            getItemById,
            deleteItem,
            updateItem,
            getItems,
            getItemsByCategory,
            adminItemApproval,
            publishItem,
            item,
            getSubscribedItems,
            getItemsByUser,
            setItems,
            reserveItem
        }}>
            {props.children}
        </ItemContext.Provider>
    )

}

// "name": "Spade",
// "description": "It's a spade.",
// "listed_date": null,
// "brand": "The Grassroots",
// "serial_number": "451351658888",
// "category_id": 3,
// "condition_id": 2,
// "selected_tags":