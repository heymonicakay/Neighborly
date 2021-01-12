import React, { useState, useEffect, useContext } from "react"
import {ItemTagContext} from "../ItemTags/ItemTagProvider"

export const TagBoxes = (props) => {
    const [checked, setChecked] = useState(false)
    const { removeitemTag, addItemTag, itemTags, getItemTagsByItem } = useContext(ItemTagContext)

    const tag = props.tag
    const selectedTags = props.selectedTags

    useEffect(() => {
        let itemTag = itemTags.find(it => {
            if(it.tag.id === tag.id){
                return it
            }
        })
        if(itemTag){
            setChecked(true)
        }
    }, [itemTags])

    useEffect(() => {
        if(props.editMode && props.item.id){

            getItemTagsByItem(props.item.id)
        }
        else{
            setChecked(false)
        }
    },[props.item.id])


    const checkboxHandler = () => {
        if (checked) {
            if(props.editMode){
                const founditemTag = itemTags.find(pt => pt.tag_id === tag.id && pt.item_id === props.item.id)
                removeitemTag(founditemTag.id)
            }
            else{
            let newArray = selectedTags.filter(t => tag.id !== t.id)
            props.setTags(newArray)
            }
        }
        else{
            if(props.editMode){
                const newitemTag = ({
                    tag_id: tag.id,
                    item_id:  props.item.id
                })
                addItemTag(newitemTag)
            }
            let newArray = selectedTags
            newArray.push(tag)
            props.setTags(newArray)
        }
        setChecked(!checked)
    }

    return (
        <div className="tag-container tag-on-item" id={tag.id}>
            <label>
                <input className="checkbox-tag" type="checkbox" id="tag" checked={checked} onChange={checkboxHandler}></input>
                {tag.label}
            </label>
        </div>
    )
}