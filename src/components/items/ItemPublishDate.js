// If the item is published it will have a publication date.
// If the item is unpublished, the publication date will be null
// If the current logged in user is the author of the item, the unpublished item will be displayed with the opportunity to publish it.
// If the current logged in user is the author of the item, the published item will be displayed with the opportunity to unpublish it.
import React from "react"

export default (props) => {
    if(props.item.listed_date !== null){
        const date = new Date(props.item.listed_date).toDateString()
        return (
            <>
                <p className="publication-date-text">
                    Listed Date:
                </p>
                <p className="publication-date">
                    {date}
                </p>
            </>
        )
    }
}