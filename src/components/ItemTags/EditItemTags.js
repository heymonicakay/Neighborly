import React, {useState, useEffect, useContext} from "react"
import { ItemTagContext } from "./ItemTagProvider"

export const EditItemTags = (props) => {
    const { addItemTag, removeItemTag, getItemTagsByItem } = useContext(ItemTagContext)
    const [checked, setChecked] = useState(false);
    const tagId = props.tag.id
    const tagName = props.tag.label
    const itemTags = props.itemTags
    const itemTagIds = props.itemTagIds
    const itemId = props.itemId
    const newItemTag = {
        "item_id": itemId,
        "tag_id": tagId,
    }

    useEffect(() => {
        if (itemTagIds.indexOf(tagId) > -1) {
            setChecked(true)
        }
    }, []);

    const itemTagDelete = () => {
        itemTags.forEach((itemTag) => {
            if (itemTag.tag_id === tagId) {
                removeItemTag(itemTag.id)
            }
        })
    }

    const addOrRemoveTags = () => {
        if(checked) {
            itemTagDelete()
        } else {
            addItemTag(newItemTag)
        }
    }

    const checkboxHandler = () => {
        addOrRemoveTags()
        setChecked(!checked)
    }


    return (
        <div className="modify-tags-container">
            <label>
                <input type="checkbox" id="first-tag" checked={checked} onChange={checkboxHandler}></input>
                {tagName}
            </label>
        </div>
    )
}