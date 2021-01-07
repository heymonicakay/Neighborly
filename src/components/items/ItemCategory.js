import React from "react"
import { Link } from "react-router-dom"
export const ItemCategory = (props) => {
    const id = parseInt(props.category.id)
    return (
        <>
        <p className="itemed-in">
            itemed in
        </p>
        <Link
        className="category-label-link"
        to={{pathname:`/items/category/${id}`}}>
            <p className="category-label-text">
                {props.category.label}
            </p>
        </Link>
        </>
    )
}

