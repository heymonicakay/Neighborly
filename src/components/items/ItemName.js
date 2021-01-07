
import React from "react"
import { Link } from "react-router-dom"

export const ItemName = (props) => {
    return (
        <Link
        className="item-title-link"
        to={{pathname: `/items/${props.item.id}`}}>
            <p className="item-title-text">
                {props.item.name}
            </p>
        </Link>
    )
}
