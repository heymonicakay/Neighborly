import React from "react"

export const EditTagButton = (props) => {

    const CanEditVerification = () =>{
        if(props.currentUser.is_staff){
            return (
                <div className="btn edit-tag__button" onClick={() => props.handleEditButtonClick(props.tag)}></div>
            )
        }
        else{
            return (
                <div className="edit-tag-button__spacer"></div>
            )
        }
    }
    return (
        <>
        <CanEditVerification />
        </>
    )
}