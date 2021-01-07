import React from "react"

export const EditCategoryButton = (props) => {

    const CanEditVerification = () =>{
        if(props.currentUser.is_staff){
            return (
                <div className="btn edit-category__button" onClick={() => props.handleEditButtonClick(props.category)}></div>
            )
        }
        else{
            return (
                <div className="edit-category-button__spacer"></div>
            )
        }
    }
    return (
        <>
        <CanEditVerification />
        </>
    )
}