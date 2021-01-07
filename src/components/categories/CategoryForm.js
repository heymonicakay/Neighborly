import React, { useContext, useState, useEffect } from "react"
import { CategoryContext } from "./CategoryProvider"
import "./Category.css"
import { UserContext } from "../users/UserProvider"

export const CategoryForm = (props) => {
    const { addCategory } = useContext(CategoryContext)
    const { currentUser, getCurrentUser } = useContext(UserContext)

    const [isDisabled, setIsDisabled] = useState(true)
    const [category, setCategory] = useState({})
    useEffect(() => {
        getCurrentUser()
    }, [])

    const handleControlledInputChange = (e) => {
        const inputVal = e.target.value
        if(inputVal.length === 0 || inputVal.length > 30){
            setIsDisabled(true)
        }
        else{
            setIsDisabled(false)
        }
        const newCategory = Object.assign({}, category)
        newCategory[e.target.name] = e.target.value
        setCategory(newCategory)
    }

    const constructNewCategory = () => {
        const label = category.label
        const newCategoryObject = {
            label: label
        }
        addCategory(newCategoryObject)
            .then(() => {
                const newCategory = {}
                setCategory(newCategory)
                document.getElementById("categoryForm").reset()
            })
    }

    return (
        <>
            {currentUser.is_staff
            ? (
                <form className="form new_category_form" id="categoryForm">
                    <p className="create-categoryForm_label">
                        Create a New Category
                    </p>
                    <div className="input__container">
                        <input type="text" name="label" className="form-control category-input" placeholder="Category Name" defaultValue={category.label} autoComplete="off"
                        onChange={handleControlledInputChange}
                        />
                    </div>
                    <div className="button__container">
                    <button type="button" className="btn create-category__btn" disabled={isDisabled} onClick={e => {
                        e.preventDefault()
                        constructNewCategory()
                    }}>
                        Create
                    </button>
                    </div>
                </form>
                )
            : <>
            </>
            }
        </>
    )
}
