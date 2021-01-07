import React, { useContext, useEffect } from "react"
import { UserContext } from "../users/UserProvider";
import { EditCategoryButton } from "./EditCategoryButton"
import { DeleteCategoryButton } from "./DeleteCategoryButton"
import "./Category.css"

export const Category = (props) => {
    const { currentUser, getCurrentUser } = useContext(UserContext)

    useEffect(() => {
        getCurrentUser()
    }, [])

    const handleEditButtonClick = (e) => {
        props.setCurrentCategory(e)
        props.setEditMode(true)
        props.setDeleteMode(false)
        props.setCategoryToBeDeleted({})
    }
    const handleDeleteButtonClick = (e) => {
        props.setCategoryToBeDeleted(e)
        props.setDeleteMode(true)
        props.setEditMode(false)
        props.setCurrentCategory({})
    }

    const handleClick = (e) =>{
        props.history.push(`/items/category/${e.id}`)
    }
    return (
        <>
            <section className="category">
                <EditCategoryButton
                currentUser={currentUser}
                category={props.category} handleEditButtonClick={handleEditButtonClick}
                {...props} />
                <DeleteCategoryButton currentUser={currentUser} category={props.category} handleDeleteButtonClick={handleDeleteButtonClick} {...props} />
                <div className="category-label__container">
                    <p className="category__label" onClick={()=>{
                        handleClick(props.category)}}>
                        {props.category.label}
                    </p>
                </div>
            </section>
        </>
    )
}