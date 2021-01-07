import React, { useContext, useState, useEffect } from "react"
import { ItemTagContext } from "./ItemTagProvider"
import { TagContext } from "../tags/TagProvider"
import { CurrentItemTags } from "./CurrentItemTags"
import { EditItemTags } from "./EditItemTags"
export const ItemTags = (props) => {
    const { itemTags, getItemTagsByItem } = useContext(ItemTagContext)
    const { tags, getTags } = useContext(TagContext)
    const [isEditing, setIsEditing] = useState(false)
    const itemTagIds = itemTags.map(tag => tag.tag_id)

    useEffect(() => {
        if (props.itemId > 0){
            getItemTagsByItem(props.itemId)
        }

    }, [props.itemId, tags]);

    useEffect(() => {
        getTags()
    },[])

    const toggleEdit = () => {
        setIsEditing(!isEditing)
        if(isEditing){
            getTags()
        }
        else{
            getItemTagsByItem(props.itemId)
        }
    }

    return (
        <div className="item-tags-container">
            <h3 className="item-tags-header">
                TAGGED AS
            </h3>
            {props.isUserAuthor
            ? <button className="edit-item-tags-bttn" onClick={toggleEdit}>
                manage tags
            </button>
            : null
            }
            {isEditing
            ? tags.map(tag => {
                return <EditItemTags
                tag={tag}
                itemTagIds={itemTagIds}
                itemId={props.itemId}
                itemTags={itemTags}
                key={tag.id} />
            })

            : itemTags.map(singleItemTag => {
                return <CurrentItemTags
                singleItemTag={singleItemTag}
                key={singleItemTag.id} />
            })
            }
        </div>
    )
}