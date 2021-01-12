// All items view shows all published items
import React, { useContext, useEffect, useState, useRef } from "react"
import { ItemContext } from "./ItemProvider"
import "./Item.css";
// import {AdminItemApproval} from "./AdminItemApproval"
import { UserContext } from "../users/UserProvider";
import Item from "./Item"


export const ItemList = (props) => {
// CONTEXT
    const {getItems, deleteItem, getItemsByUser, getItemsByCategory} = useContext(ItemContext)
    const { getCurrentUser } = useContext(UserContext)
        const deleteItemDialog = useRef(null)

// STATE
    const [ filteredItems, setFilteredItems ] = useState([])
    const [ byUser, setItemsByUser ] = useState([])
    const [ itemTBD, setItemTBD ] = useState({})
    const [ byCategory, setByCategory ] = useState([])
    const [ myItems, setMyItems ] = useState([])
    const [ subscribed, setSubscribed ] = useState([])
    const [ allItems, setAllItems ]=useState([])
    const [ currentUser, setCurrentUser ] = useState({})

    useEffect(()=>{
        getCurrentUser(localStorage.getItem("token")).then(setCurrentUser)
        if(props.allItems){
            getItems().then(items=>{
                setAllItems(items)
            })
        }
        if(props.byUser){
            const userId = parseInt(props.match.params.userId)
            getItemsByUser(userId).then((items)=>{
                setItemsByUser(items)
            })
        }
        if(props.byCategory){
            const catId = parseInt(props.match.params.categoryId)
            getItemsByCategory(catId).then((items)=>{
                setByCategory(items)
            })
        }
    }, [])

    useEffect(()=>{
        if(props.myItems && currentUser){
            console.log(currentUser, "CurrentUser")
            getItemsByUser(currentUser && currentUser.id).then( items =>{
                setMyItems(items)
            })

        }
    }, [currentUser])

    useEffect(()=>{
        if(subscribed && currentUser && currentUser.is_staff){
            setFilteredItems(subscribed)
        }
        else{
            const filtered = subscribed.filter(p=> p.listed_date !== null) || []
            setFilteredItems(filtered)
        }
    }, [subscribed])

    useEffect(()=>{
        if(allItems && currentUser){
            if(currentUser.is_staff){
                setFilteredItems(allItems)
            }
            else{
                // const filtered = allItems.filter(p=> p.listed_date === null) || []
                setFilteredItems(allItems)
            }
        }
    }, [allItems])

    useEffect(()=>{
        if(byCategory && currentUser && currentUser.is_staff){
            setFilteredItems(byCategory)
        }
        else{
            const filtered = byCategory.filter(p => p.listed_date !== null) || []
            setFilteredItems(filtered)
        }
    }, [byCategory])

    useEffect(()=>{
        if(myItems && currentUser){
            setFilteredItems(myItems)
        }
    }, [myItems])

    // useEffect(()=>{
    //     if(byUser && currentUser && currentUser.is_staff){
    //         setFilteredItems(byUser)
    //     }
    //     else{
    //         const filtered = byUser.filter(p=> p.listed_date !== null) || []
    //         setFilteredItems(filtered)
    //     }
    // }, [byUser])

    const handleDelete = () => {
        console.log(itemTBD, "ITEM TBD")
        deleteItem(itemTBD.id).then(() => window.location.reload())
        deleteItemDialog.current.close()
    }

    const handleClick = () => {
        deleteItemDialog.current.showModal()
    }

    return (
        <>
        <dialog className="dialog dialog--deleteItem" ref={deleteItemDialog}>
            <div>
                Are you sure you want to delete this item? <br /> <center><i>{itemTBD.name}</i></center>
            </div>
            <button className="button--closeDialog btn" onClick={() => deleteItemDialog.current.close()}>
                Close
            </button>
            <button className="button--deleteDialog btn" onClick={() => handleDelete(itemTBD)}>
                Delete Item
            </button>
        </dialog>
        <div className="mainItemContainer">
            {currentUser &&
            filteredItems.map(p => {

                return (
                    <Item
                    key={p.id}
                    currentUser={currentUser}
                    is_owner={currentUser.id === p.owner.id}
                    item={p}
                    setItemTBD={setItemTBD}
                    itemTBD={itemTBD}
                    handleClick={handleClick}
                    {...props}/>
                )
            })
            }
        </div>
        </>
    )
}