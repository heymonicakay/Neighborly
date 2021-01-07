import React, { useContext, useEffect, useRef, useState } from 'react'
import { ItemCategory } from './ItemCategory'
import { ItemImage } from './ItemImage'
import { ItemName } from './ItemName'
import { EditDeleteItemButton } from './EditItemButton'
import { AdminItemApproval } from './AdminItemApproval'
import { ItemOwner } from './ItemOwner'
import { ItemContext } from './ItemProvider'
import ItemPublishDate from './ItemPublishDate'
import "./Item.css";

export default (props) => {
    const { deleteItem } = useContext(ItemContext)
    const deleteItemDialog = useRef(null)
    const image = props.item.itemimages[0] && props.item.itemimages[0].image

    const handleDelete = (p) => {
        deleteItem(p.id).then(()=> props.history.push("/items"))
    }
    return (
        <>
        <dialog className="dialog dialog--deleteItem" ref={deleteItemDialog}>
            <div>
                Are you sure you want to delete this item?
            </div>
            <button className="button--closeDialog btn" onClick={() => deleteItemDialog.current.close()}>
                Close
            </button>
            <button className="button--deleteDialog btn" onClick={() => handleDelete(props.item)}>
                Delete Item
            </button>
        </dialog>

        <section className="item">
            <div className="manage-buttons top-align">
                <EditDeleteItemButton
                item={props.item}
                edit
                {...props}/>

                <EditDeleteItemButton
                item={props.item}
                {...props}/>
            </div>
            <div className="item-list-single">
                <div className="item-list-top">
                    <div className="item-title-wrapper">
                    <img src={image} className="item-image" />
                        {props.item.name}<br />
                        Owner: {props.item.owner_full_name}<br />
                        <i>{props.item.listed_date ? "listed" : "unlisted"}</i>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}