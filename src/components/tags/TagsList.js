import React, { useContext, useEffect, useState } from "react"
import { Tag } from "./Tag"
import { TagContext } from "./TagProvider"
import { TagForm } from "./TagForm"
import { EditTagForm } from "./EditTagForm"
import { DeleteTagForm } from "./DeleteTagForm"
import "./Tag.css"

export const TagsList = (props) => {
    const {tags, getTags} = useContext(TagContext)
    const [editMode, setEditMode] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [tagToBeEdited, setTagToBeEdited] = useState({})
    const [tagToBeDeleted, setTagToBeDeleted] = useState({})
    useEffect(() => {
        getTags()
    }, [])

    return (
        <>
        <div className="tagList-containerFlex">
            <section className="tags">
                <p className="tag-list__heading">Tags</p>
                {tags.map(tag => {
                        return <Tag
                        key={tag.id}
                        tag={tag}
                        setEditMode={setEditMode}
                        setDeleteMode={setDeleteMode}
                        setTagToBeEdited={setTagToBeEdited}
                        setTagToBeDeleted={setTagToBeDeleted}
                        {...props} />
                    }).reverse()
                }
            </section>
            <section className="edit-tag-form">
                {editMode
                ? <EditTagForm
                tagToBeEdited={tagToBeEdited}
                setTagToBeEdited={setTagToBeEdited}
                setEditMode={setEditMode}
                editMode={editMode}
                {...props} />
                : null
                }
                {deleteMode
                ? <DeleteTagForm
                tagToBeDeleted={tagToBeDeleted}
                setTagToBeDeleted={setTagToBeDeleted}
                setDeleteMode={setDeleteMode}
                {...props}/>
                : null
                }
            </section>
            <section>
                <TagForm {...props} />

            </section>
        </div>
        </>
    )
}