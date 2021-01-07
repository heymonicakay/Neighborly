
import React from "react"
export const ItemImage = (props) => {
    return (
        <>
        {props.item.image_url
        ?
            <div className="item-image-container" onClick={()=> props.history.push(`/items/${props.item.id}`)}>
                <img
                className="item-image"
                src={props.item.images[0].image} />
            </div>
        : null
        }
        </>
    )
}
