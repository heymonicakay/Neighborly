import React from "react"
import "./Item.css"

export default ( props ) => {
    return (
        <>
            <div className="reaction-wrapper">
                <img className="reaction-img" src={props.reaction.image_url} onClick={() => props.handleReact(props.reaction)} />
                <span className="reaction-count">
                    {props.reaction.count}
                </span>
            </div>
        </>
    )
}