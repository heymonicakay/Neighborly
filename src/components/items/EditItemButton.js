import React from 'react'
import "./Item.css";

export const EditDeleteItemButton = (props) => {

    const handleClick = (e) =>{
        if(props.edit){
            props.history.push(`/items/edit/${e}`)
        }
        else{
            props.handleClick()
        }
    }

    const Validation = () => {
        // if the user is admin or they are the author then they can edit/delete
        if(props.is_owner){

            return (
                <div className={`btn ${props.edit ? "btn__item-edit" : "btn__item-delete"}`} title={`${props.edit ? "Edit Item" : "Delete Item"}`} onClick={() => handleClick(props.item.id)}></div>
                )
        }
        else{
            return null
        }

    }
    return (
        <>
            <Validation />
        </>
    )

}