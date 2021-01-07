import React, { useContext, useState, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const EditCategoryForm = (props) => {

    const { updateCategory, getCategories } = useContext(CategoryContext)

    const [category, setCategory] = useState({})
    const [fadeOut, setFadeOut] = useState(false)
    const [close, setClose] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [saveButtonText, setSaveButtonText] = useState("Save Category")

    const handleControlledInputChange = (e) => {
        const newCategory = Object.assign({}, category)
        newCategory[e.target.name] = e.target.value
        setCategory(newCategory)
    }

    const handleKeyPress = (e) => {
        const inputVal = e.target.value
        if(inputVal === props.currentCategory.label || inputVal.length < 1 || inputVal.length > 40){
            setIsDisabled(true)
            setSaveButtonText("Save Category")
        }
        else{
            setIsDisabled(false)
        }
    }

    const changeCategory = () => {
        const newCategoryObject = {
            id: props.currentCategory.id,
            label: category.label
        }
        updateCategory(newCategoryObject)
            .then(()=> {
                setClose(true)
                getCategories()
            })
        }
    useEffect(()=>{
        let fadeTimer = null;
        if(close){
            setFadeOut(true)
            fadeTimer = setTimeout(()=>{
                props.setEditMode(false)
                props.setCurrentCategory({})
                setFadeOut(false)
            }, 340)
        }
        return () => {
            clearTimeout(fadeTimer)
        }
    }, [close])

    return (
        <div className={`edit-category-form__container ${fadeOut ? "fade-out" : "fade-in"}`}>
        <form className="form change_category_form" id="editCategoryForm">
            <div className="toprow">
                <div className="toprowblank"></div>
                <span className="x" onClick={()=>{
                    setClose(true)
                }}>X</span>
            </div>
            <p className="categoryForm_label">Edit this Category</p>
            <div className="input__container">
                <input type="text" name="label" id="label" className="form-control edit-category-input" defaultValue={props.currentCategory.label} autoComplete="off"
                    onKeyUp={(e)=>{
                        handleKeyPress(e)
                    }}
                    onChange={handleControlledInputChange} />
            </div>
            <div className="button__container">
                <button type="button"
                    title="Save button"
                    disabled={isDisabled}
                    className="btn edit-category-form__save"
                    onClick={e => {
                        e.preventDefault()
                        changeCategory()
                    }}>
                    Save Category
                </button>
                <button type="button"
                    className="btn edit-category-form__cancel"
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