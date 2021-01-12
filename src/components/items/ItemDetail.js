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
    const { getItems, deleteItem } = useContext(ItemContext)
    // const { reactions, getReactionsByItem, addReaction } = useContext(ReactionContext)
    const [item, setItem] = useState({})
    const [items, setItems] = useState([])
    const itemId = parseInt(props.match.params.itemId)

    const { currentUser } = useContext(UserContext)
    const deleteItemDialog = useRef(null)

    useEffect(()=>{
        getItems().then(r =>{
            setItems(r)
        })
    }, [])
    console.log(items, "ITEMS")
    useEffect(() => {
        // getReactionsByItem(itemId)
        const itemObj = items.filter(i => i.id === itemId)
        console.log(itemObj,"ITEM OBJECT")
        setItem(itemObj)
    }, [items])

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
        {item ?
        console.log(item, "item")
            (<>

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
                    item={item}
                    edit
                    {...props}/>
                    <EditDeleteItemButton
                    item={item}
                    handleClick={handleClick}
                    delete
                    {...props}/>
                </div>
                <div className="itemDetailContainer">
                    <div className="itemTitleContainer">
                        <h2 className="itemTitle">{item.name}</h2>
                        <p>{item.category ? item.category.label : null}</p>

                    </div>
                    {item.itemimages ?
                        <div className="img-div">
                            <img className="item-img" src={item.itemimages[0].image} />
                        </div>
                        : null
                    }
                    <div className="author_date_container">
                        <p className="authorName">
                            <Link className="itemLink" to={ `/items/user/${item.owner && item.owner.id}` }>
                                by {item && item.owner.user.username}
                            </Link>
                        </p>
                        {/* <div className="btn view-comments-btn" onClick={() => props.history.push(`/comments/${item.id}`)}>
                            View Comments
                        </div> */}

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
                        <p>{item && item.descriptions}</p>
                    </div>
                </div>
                <div className="itemTagContainer">
                    <ItemTags
                    {...props}
                    itemId={item.id}
                    isUserOwner={item.owner.id === currentUser.id} />
                </div>

            </div>
            </>)
        : null
        }
        </>
    )
}
