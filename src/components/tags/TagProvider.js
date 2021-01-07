import React, { useState, useEffect, useContext } from "react"
import {UserContext} from '../users/UserProvider'

export const TagContext = React.createContext()

export const TagProvider = (props) => {
    const [tags, setTags] = useState([])
    const { token } = useContext(UserContext)

    const getTags = () => {
        return fetch("http://localhost:8000/tags", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setTags)
    }

    const getTagById = (tag_id) => {
        return fetch(`http://localhost:8000/tags/${tag_id}`, {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
    }

    const createTag = tag => {
        return fetch("http://localhost:8000/tags", {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
        .then(res => res.json())
        .then(newTag => {
            getTags()
            return newTag.id })
    }

    const updateTag = (tag) => {
        return fetch(`http://localhost:8000/tags/${tag.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tag)
        })
            .then(getTags)
    }

    const deleteTag = (tag_id) => {
        return fetch(`http://localhost:8000/tags/${tag_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(getTags)
    }

useEffect(()=>{
    getTags()
}, [])

    return (
        <TagContext.Provider value={{
            tags,
            createTag,
            getTags,
            getTagById,
            deleteTag,
            updateTag
        }}>
            {props.children}
        </TagContext.Provider>
    )
}