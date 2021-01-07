import React, { useContext, useEffect, useState } from "react"
import { Category } from "./Category"
import { CategoryContext } from "./CategoryProvider"
import { EditCategoryForm } from "./EditCategoryForm";
import { DeleteCategoryForm } from "./DeleteCategoryForm";
import { CategoryForm } from "./CategoryForm"
import "./Category.css"

export const CategoriesList = (props) => {
    const { categories, getCategories } = useContext(CategoryContext)
    const [editMode, setEditMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [categoryToBeDeleted, setCategoryToBeDeleted] = useState({})
    const [currentCategory, setCurrentCategory] = useState({})

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <div className="cat-list-cont">
                <section className="categories">
                <p className="category-list__heading">Categories</p>
                    {categories.map(c => {
                        return <Category
                            key={c.id}
                            category={c}
                            setEditMode={setEditMode}
                            setDeleteMode={setDeleteMode}
                            setCurrentCategory={setCurrentCategory}
                            setCategoryToBeDeleted={setCategoryToBeDeleted}
                            {...props} />
                    }).reverse()
                    }
                </section>
                <section className="edit-category-form">
                    {editMode
                        ? <EditCategoryForm
                        currentCategory={currentCategory}
                            setCurrentCategory={setCurrentCategory}
                            setEditMode={setEditMode}
                            editMode={editMode}
                            {...props} />
                        : null
                    }
                    {deleteMode
                    ? <DeleteCategoryForm
                    categoryToBeDeleted={categoryToBeDeleted}
                    setCategoryToBeDeleted={setCategoryToBeDeleted}
                    setDeleteMode={setDeleteMode}
                    {...props} />
                    : null
                    }
                </section>
                <section>
                    <CategoryForm {...props} />
                </section>
            </div>
        </>
    )
}
