import React, { useContext, useState, useEffect } from "react"
import { ItemContext } from "./ItemProvider"
import { CategoryContext } from "../categories/CategoryProvider"
import { TagContext } from "../tags/TagProvider"
import { TagBoxes } from "../tags/TagCheckbox"
import "./Item.css"

export const ItemForm = (props) => {
    const { items, getItems, addItem, updateItem } = useContext(ItemContext)
    const { categories, getCategories } = useContext(CategoryContext)
    const { tags, getTags } = useContext(TagContext)
    const [selectedTags, setTags] = useState([])
    const [item, setItem] = useState({rareuser: {}, category: {}})
    const [base64, setBase64] = useState(null)

    const editMode = props.match.params.hasOwnProperty("itemId")

    const handleControlledInputChange = (eve) => {
        const newItem = Object.assign({}, item)
        newItem[eve.target.name] = eve.target.value
        setItem(newItem)
    }

    const getItemInEditMode = () => {
        if (editMode) {
            const itemId = parseInt(props.match.params.itemId)
            const selectedItem = items.find(p => p.id === itemId) || {}
            setItem(selectedItem)
        }
    }

    useEffect(() => {
        getItems()
        .then(getCategories)
        .then(getTags)
    }, [])

    useEffect(() => {
        getItemInEditMode()
    }, [items])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createItemImageJSON = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            setBase64(base64ImageString)
        });
    }

    const constructNewItem = () => {
        if (item.name && item.category_id && item.description) {
            if (editMode) {
                updateItem({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    brand: "brand name",
                    listed_date: null,
                    serial_number: "0000000000000",
                    condition_id: 2,
                    category_id: parseInt(item.category_id),
                    publication_date: item.publication_date,
                }).then(() => {
                    props.history.push(`/items/${item.id}`)
                })
            } else {
                const newItemObject = {
                    name: item.name,
                    description: item.description,
                    category_id: parseInt(item.category_id),
                    brand: "brand name",
                    listed_date: null,
                    serial_number: "0000000000000",
                    condition_id: 2,
                    publication_date: new Date(Date.now()).toISOString().split('T')[0],
                    selected_tags: selectedTags

                }
                addItem(newItemObject)
                    .then(resId => {
                        props.history.push(`/items/${resId}`)
                    })
                console.log(newItemObject, "NEW ITEM OBJECT")
            }
        } else {
            window.alert("please fill in all fields")
        }

    }
    return (

        <form className="form new_item_form" id="itemForm">
            <p className="itemForm_title">
                {editMode ? "Update Item" : "Create a New Item"}
            </p>
            <div className="form-div">
                <input type="text" name="name" required className="form-control" id="title"
                    placeholder="Item Name"
                    defaultValue={item.name}
                    onChange={handleControlledInputChange}>
                </input>
            </div>
                {/* {editMode && item.image_url != null ? <img className="formImage" src={item.image_url}></img> : null} */}
            <div className="header-image-div">
                {/* <input type="file" id="profle_image" name="profile_img"
                    onChange={(evt) => {
                        createItemImageJSON(evt)
                }} /> */}
            </div>
            <div className="form-div">
                <select name="category_id" className="form-control" id="item"
                    value={item.category_id}
                    onChange={handleControlledInputChange}>
                    <option value="0">Choose a category...</option>
                    {categories.map(c => (
                        <option key={c.id} value={c.id}>
                            {c.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-div">
                <textarea type="text" name="description" required className="form-control" id="content"
                    placeholder="Item description..."
                    defaultValue={item.description}
                    onChange={handleControlledInputChange}>
                </textarea>
            </div>
            <div className="tag-container">
                {
                    tags.map(t => <TagBoxes
                        tag={t}
                        selectedTags={selectedTags}
                        setTags={setTags}
                        item={item}
                        editMode={editMode}
                        {...props} />)
                }
            </div>
            <button
                onClick={evt => {
                    evt.preventDefault()
                    constructNewItem()

                }}
                className="btn item_submit_btn">
                Save Item
            </button>
        </form>
    )
}