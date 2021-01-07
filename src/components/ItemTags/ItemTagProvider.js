import React, { useState } from "react"

export const ItemTagContext = React.createContext()

export const ItemTagProvider = (props) => {
    const [itemTags, setItemTags] = useState([])
    const [token, setToken] = useState(localStorage.getItem("token"))

    const getAllItemTags = () => {
        return fetch("http://localhost:8000/itemtags", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setItemTags)
    }

    const getItemTagsByItem = (itemId) => {
        return fetch(`http://localhost:8000/itemtags?item_id=${itemId}`, {
            headers: {
                "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setItemTags)
    }

    const addItemTag = (itemTag) => {
        return fetch("http://localhost:8000/itemtags", {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemTag)
        })
    }

    const removeItemTag = (itemTagId) => {
        return fetch(`http://localhost:8000/itemtags/${itemTagId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
        })
    }

    return (
        <ItemTagContext.Provider value={{itemTags, addItemTag, removeItemTag, getAllItemTags, getItemTagsByItem, setItemTags}}>
            {props.children}
        </ItemTagContext.Provider>
    )

}