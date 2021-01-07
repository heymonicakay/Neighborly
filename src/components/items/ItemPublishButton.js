import React, { useContext } from "react"
import { ItemContext } from './ItemProvider'

export const ItemPublishButton = (props) => {
    const { getItemById, listItem } = useContext(ItemContext)

    return (
        <button className="btn-small publishBtn"
        onClick={() => {listItem(props.item.id).then(() => getItemById(props.item.id))}}>
            {props.item.listed_date === null
            ? "List"
            : "Unlist"
            }
        </button>
    )
}