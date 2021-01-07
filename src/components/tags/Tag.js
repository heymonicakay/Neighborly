import React, { useContext, useEffect } from "react"
import { UserContext } from "../users/UserProvider"
import { EditTagButton } from "./EditTagButton"
import { DeleteTagButton } from "./DeleteTagButton"
import "./Tag.css"

export const Tag = (props) => {
    const { currentUser, getCurrentUser } = useContext(UserContext)

    useEffect(() => {
        getCurrentUser()
    }, [])

    const handleEditButtonClick = (e) => {
        props.setTagToBeEdited(e)
        props.setEditMode(true)
        props.setDeleteMode(false)
        props.setTagToBeDeleted({})
    }
    const handleDeleteButtonClick = (e) => {
        props.setTagToBeDeleted(e)
        props.setDeleteMode(true)
        props.setEditMode(false)
        props.setTagToBeEdited({})
    }

    return (
        <>
            <section className="tag">
                <EditTagButton currentUser={currentUser} tag={props.tag} handleEditButtonClick={handleEditButtonClick} {...props} />
                <DeleteTagButton currentUser={currentUser} tag={props.tag} handleDeleteButtonClick={handleDeleteButtonClick} {...props} />
                <div className="tag-label__container">
                    <p className="tag__label">
                        {props.tag.label}
                    </p>
                </div>
            </section>
        </>
        )
}