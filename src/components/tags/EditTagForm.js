import React, { useContext, useState, useEffect } from "react"
import { TagContext } from "./TagProvider"
import "./Tag.css"

export const EditTagForm = (props) => {

    const { updateTag, getTags } = useContext(TagContext)

    const [tag, setTag] = useState({})
    const [fadeOut, setFadeOut] = useState(false)
    const [close, setClose] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [saveButtonText, setSaveButtonText] = useState("Save Tag")


    const handleControlledInputChange = (e) => {
        const newTag = Object.assign({}, tag)
        newTag[e.target.name] = e.target.value
        setTag(newTag)
    }
    
    const handleKeyPress = (e) => {
        const inputVal = e.target.value
        if(inputVal === props.tagToBeEdited.label || inputVal.length < 1 || inputVal.length > 20){
            setIsDisabled(true)
            setSaveButtonText("Save Tag")
        }
        else{
            setIsDisabled(false)
            const inputArray = inputVal.split("")
            const whitespace = inputArray.filter(i => i === " ")

            if(whitespace.length !== 0){
                setIsDisabled(true)
                setSaveButtonText("No Spaces")
            }
            else{
                setIsDisabled(false)
                setSaveButtonText("Save Tag")
            }
        }
    }

    const changeTag = () => {
        const label = tag.label.toLowerCase()
        const newTagObject = {
            id: props.tagToBeEdited.id,
            label: label
        }
        updateTag(newTagObject)
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
                props.setEditMode(false)
                props.setTagToBeEdited({})
                setFadeOut(false)
            }, 340)
        }
        return () => {
            clearTimeout(fadeTimer)
        }
    }, [close])

    return (
        <div className={`edit-tag-form__container ${fadeOut ? "fade-out" : "fade-in"}`}>
            <form className="form change_tag_form" id="editTagForm">
                <div className="toprow">
                    <div className="toprowblank"></div>
                    <span className="x" onClick={()=>{
                        setClose(true)
                    }}>X</span>
                </div>
                <p className="tagForm_label">Edit this Tag</p>
                <div className="input__container">
                    <input type="text" name="label" className="form-control edit-tag-input" id="label" defaultValue={props.tagToBeEdited.label} spellCheck="false" autoComplete="off"
                    onKeyUp={(e)=>{
                        handleKeyPress(e)
                    }}
                    onChange={handleControlledInputChange}/>
                </div>
                <div className="button__container">
                    <button type="button"
                        title="Save button."
                        disabled={isDisabled}
                        className="btn edit-tag-form__save"
                        onClick={e => {
                            e.preventDefault()
                            changeTag()
                        }}>
                        {saveButtonText}
                    </button>
                    <button type="button"
                        className="btn edit-tag-form__cancel"
                        onClick={e => {
                            e.preventDefault()
                            setClose(true)
                        }}>
                            Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}