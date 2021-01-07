import React from "react"
import { Link } from "react-router-dom"
export const ItemOwner = (props) => {
const id = parseInt(props.owner.id)
    return (
        <Link
        className="category-label"
        to={{pathname:`/items/user/${id}`}}>
            <p className="owner-name">
                {props.owner.full_name}
            </p>
        </Link>
    )
}


