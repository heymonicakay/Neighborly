import React, { useContext, useState, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"

export const DeleteCategoryForm = (props) => {

    const { deleteCategory, getCategorys } = useContext(CategoryContext)

    const [fadeOut, setFadeOut]=useState(false)
    const [close, setClose] = useState(false)

    const removeCategory = () => {
        const categoryId = props.categoryToBeDeleted.id
        deleteCategory(categoryId)
            .then(()=> {
                setClose(true)
                getCategorys()
            })
        }

    useEffect(()=>{
        let fadeTimer = null;
        if(close){
            setFadeOut(true)
            fadeTimer = setTimeout(()=>{
                props.setDeleteMode(false)
                props.setCategoryToBeDeleted({})
                setFadeOut(false)
            }, 340)
        }
        return () => {
            clearTimeout(fadeTimer)
        }
    }, [close])

    return (
        <div className={`delete-category-form__container ${fadeOut ? "fade-out":"fade-in"}`}>
            <form className="form remove_category_form" id="editCategoryForm">
                <div className="toprow">
                    <div className="toprowblank"></div>
                    <span className="x" onClick={()=>{
                        setClose(true)
                        props.setCategoryToBeDeleted({})
                    }}>X</span>
                </div>
                <p className="deleteCategoryForm_label">Are you sure you want to delete this Category?</p>
                <div className="delete-category-form__category">
                    {props.categoryToBeDeleted.label}
                </div>
                <div className="button__container">
                    <button type="button" className="btn delete-category-form__save"
                    onClick={e => {
                        e.preventDefault()
                        removeCategory()
                    }}>
                        Ok
                    </button>
                    <button type="button" className="btn delete-category-form__cancel"
                    onClick={e => {
                        e.preventDefault()
                        setClose(true)
                        props.setCategoryToBeDeleted({})
                    }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}