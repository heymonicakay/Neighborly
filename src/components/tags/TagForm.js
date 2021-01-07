import React, { useContext, useEffect, useState } from "react"
import { TagContext } from "./TagProvider"
import "./Tag.css"
import { UserContext } from "../users/UserProvider"

export const TagForm = (props) => {
    const { createTag } = useContext(TagContext)
    const { currentUser, getCurrentUser } = useContext(UserContext)

    const [isDisabled, setIsDisabled] = useState(true)
    const [createButtonText, setCreateButtonText] = useState("Create")
    const [tag, setTag] = useState({})
    useEffect(() => {
        getCurrentUser()
    }, [])

    const handleControlledInputChange = (e) => {
        const inputVal = e.target.value
        if(inputVal.length === 0 || inputVal.length > 20){
            setIsDisabled(true)
            setCreateButtonText("Create")
        }
        else{
            setIsDisabled(false)
            const inputArray = inputVal.split("")
            const whitespace = inputArray.filter(i => i === " ")
            if(whitespace.length !== 0){
                setIsDisabled(true)
                setCreateButtonText("No Spaces")
            }
            else{
                setIsDisabled(false)
                setCreateButtonText("Create")
            }
        }
        const newTag = Object.assign({}, tag)
        newTag[e.target.name] = e.target.value
        setTag(newTag)
    }

    const constructNewTag = () => {
        const label = tag.label.toLowerCase()
        const newTagObject = {
            label: label
        }
        createTag(newTagObject)
            .then(() => {
                const newTag = {}
                setTag(newTag)
                document.getElementById("tagForm").reset()
            })
    }
            return (
                <>
                {currentUser.is_staff
                ? (
                <form className="form new_tag_form" id="tagForm">
                    <p className="create-tagForm_label">
                        Create a New Tag
                    </p>
                    <div className="input__container">
                        <input type="text" name="label" className="form-control tag-input" id="label" placeholder="tagname" spellCheck="off" autoComplete="off" defaultValue={tag.label}
                        onChange={ handleControlledInputChange} />
                    </div>
                    <div className="button__container">
                    <button type="button"
                    disabled={isDisabled}
                    className="btn create-tag__btn"
                    onClick={e => {
                        e.preventDefault()
                        constructNewTag()
                    }}>
                        {createButtonText}
                    </button>
                    </div>
                </form>
                )
                :
                <>
                </>
                }
            </>
            )
}