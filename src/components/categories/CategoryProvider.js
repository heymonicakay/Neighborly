import React, {useState} from "react"

export const CategoryContext = React.createContext()

export const CategoryProvider = (props) => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})
    const [token, setToken] = useState(localStorage.getItem("token"))

    const getCategories = () => {
        return fetch("http://localhost:8000/categories", {
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then(res => res.json())
        .then(setCategories)
    }

    const addCategory = (category) => {
        return fetch("http://localhost:8000/categories", {
            method: "POST",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
        .then(res => res.json())
        .then(newCategory => {
            getCategories()
            return newCategory.id
        })
    }

    const deleteCategory = categoryId => {
        return fetch(`http://localhost:8000/categories/${categoryId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
            .then(getCategories)
    }

    const updateCategory = (category) => {
        return fetch(`http://localhost:8000/categories/${category.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })
            .then(getCategories)
    }

    return (
        <CategoryContext.Provider value={{
            categories, getCategories, addCategory, category, setCategory, deleteCategory, updateCategory
        }}>
            {props.children}
        </CategoryContext.Provider>
    )
}