import React from "react"

export const DeleteCategoryButton = (props) => {

    const CanDeleteVerification = () =>{
        if(props.currentUser.is_staff){
            return (
                <div className="btn delete-category__button" onClick={() => props.handleDeleteButtonClick(props.category)}></div>
            )
        }
        else{
            return (
                <div className="delete-category-button__spacer"></div>
            )
        }
    }
    return (
        <>
        <CanDeleteVerification />
        </>
    )
}