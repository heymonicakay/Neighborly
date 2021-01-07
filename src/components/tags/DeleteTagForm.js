import React, { useContext, useState, useEffect } from "react"
import { TagContext } from "./TagProvider"
import "./Tag.css"

export const DeleteTagForm = (props) => {
    
    const { deleteTag, getTags } = useContext(TagContext)

    const [fadeOut, setFadeOut]=useState(false)
    const [close, setClose] = useState(false)

    const removeTag = () => {
        const tagId = props.tagToBeDeleted.id
        deleteTag(tagId)
            .then(()=> {
                setClose(true)
                getTags()
            })
        }

    useEffect(()=>{
        let fadeTimer = null;
        if(close){
            setFadeOut(true)
            fadeTimer = setTimeout(()=>{
                props.setDeleteMode(false)
                props.setTagToBeDeleted({})
                setFadeOut(false)
            }, 340)
        }
        return () => {
            clearTimeout(fadeTimer)
        }
    }, [close])

    return (
        <div className={`delete-tag-form__container ${fadeOut ? "fade-out":"fade-in"}`}>
            <form className="form remove_tag_form" id="editTagForm">
                <div className="toprow">
                    <div className="toprowblank"></div>
                    <span className="x" onClick={()=>{
                        setClose(true)
                        props.setTagToBeDeleted({})
                    }}>X</span>
                </div>
                <p className="deleteTagForm_label">Are you sure you want to delete this Tag?</p>
                <div className="delete-tag-form__tag">
                    {props.tagToBeDeleted.label}
                </div>
                <div className="button__container">
                    <button type="button" className="btn delete-tag-form__save"
                    onClick={e => {
                        e.preventDefault()
                        removeTag()
                    }}>
                        Ok
                    </button>
                    <button type="button" className="btn delete-tag-form__cancel"
                    onClick={e => {
                        e.preventDefault()
                        setClose(true)
                        props.setTagToBeDeleted({})
                    }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}