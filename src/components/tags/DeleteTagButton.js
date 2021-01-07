import React from "react"

export const DeleteTagButton = (props) => {

    const CanDeleteVerification = () =>{
        if(props.currentUser.is_staff){
            return (
                <div className="btn delete-tag__button" onClick={() => props.handleDeleteButtonClick(props.tag)}></div>
            )
        }
        else{
            return (
                <div className="delete-tag-button__spacer"></div>
            )
        }
    }
    return (
        <>
        <CanDeleteVerification />
        </>
    )
}