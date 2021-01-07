import React from "react"

export const CurrentItemTags = ({singleItemTag}) => {

    return (
        <div className="current-item-tag">
            <h4>#{singleItemTag.tag.label}</h4>
        </div>
    )
}