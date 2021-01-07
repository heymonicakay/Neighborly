import React, { useContext, useEffect, useState, useRef } from "react"
import { ItemContext } from "./ItemProvider"
import { EditDeleteItemButton } from "./EditItemButton"
// import { ReactionContext } from "../reactions/ReactionProvider"
import "./Item.css"
import { ItemTags } from "../ItemTags/ItemTags"
import { Link } from "react-router-dom"
import { UserContext } from "../users/UserProvider"
import Reactions from "./Reaction"


export const ItemDetails = (props) => {
    const { getItemById, deleteItem, publishItem, item } = useContext(ItemContext)
    // const { reactions, getReactionsByItem, addReaction } = useContext(ReactionContext)
    const { currentUser } = useContext(UserContext)

    const deleteItemDialog = useRef(null)
    useEffect(() => {
        const itemId = parseInt(props.match.params.itemId)
        // getReactionsByItem(itemId)
        getItemById(itemId)
    }, [])

    // const handleReact = (r) => {
    //     const itemIdObj = { item_id: item.id }
    //     // addReaction(r.id, itemIdObj).then(() => getReactionsByItem(item.id))
    // }

    const handleDelete = (p) => {
        deleteItem(p.id).then(()=> props.history.push("/items"))
    }

    const handleClick = () => {
        deleteItemDialog.current.showModal()
    }

    return (
        <>
            <dialog className="dialog dialog--deleteItem" ref={deleteItemDialog}>
                <div>
                    Are you sure you want to delete this item?
                </div>
                <button className="button--closeDialog btn" onClick={() => deleteItemDialog.current.close()}>
                    Close
                </button>
                <button className="button--deleteDialog btn" onClick={() => handleDelete(item)}>
                    Delete Item
                </button>
            </dialog>

            <div className="itemFlex">
                <div className="manage-buttons">
                    <EditDeleteItemButton
                    admin={currentUser.is_staff}
                    is_author={currentUser.id === item.rareuser.id}
                    item={item}
                    edit
                    {...props}/>
                    <EditDeleteItemButton
                    admin={currentUser.is_staff}
                    is_author={currentUser.id === item.rareuser.id}
                    item={item}
                    handleClick={handleClick}
                    delete
                    {...props}/>
                </div>
                <div className="itemDetailContainer">
                    <div className="itemTitleContainer">
                        <h2 className="itemTitle">{item.title}</h2>
                        <p>{item.category.label}</p>

                    </div>
                    {item.image_url
                        ?
                        <div className="img-div">
                            <img className="item-img" src={item.image_url} />
                        </div>
                        :null
                    }
                    <div className="author_date_container">
                        <p className="authorName">
                            <Link className="itemLink" to={ `/items/user/${item.rareuser.id}` }>
                                by {item.author_username}
                            </Link>
                        </p>
                        <div className="btn view-comments-btn" onClick={() => props.history.push(`/comments/${item.id}`)}>
                            View Comments
                        </div>

                        {/* <div className='reactionContainer'>
                            {reactions.map(r => {
                                return <Reactions {...props}
                                key={r.id}
                                reaction={r}
                                handleReact={handleReact}
                                />
                            })}
                        </div> */}
                    </div>
                    <div className="itemContent">
                        <p>{item.content}</p>
                    </div>
                </div>
                <div className="itemTagContainer">
                    <ItemTags
                    {...props}
                    itemId={item.id}
                    isUserAuthor={item.is_user_author} />
                </div>

            </div>
        </>
    )
}
