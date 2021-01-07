// All items view shows all published items
import React, { useContext, useEffect, useState } from "react"
import { ItemContext } from "./ItemProvider"
import "./Item.css";
// import {AdminItemApproval} from "./AdminItemApproval"
import { UserContext } from "../users/UserProvider";
import Item from "./Item"


export const ItemList = (props) => {
// CONTEXT
    const {getItems, getItemsByUser, getItemsByCategory} = useContext(ItemContext)
    const {currentUser} = useContext(UserContext)
// STATE
    const [ filteredItems, setFilteredItems ] = useState([])
    const [ byUser, setItemsByUser ] = useState([])
    const [ byCategory, setByCategory ] = useState([])
    const [ myItems, setMyItems ] = useState([])
    const [ subscribed, setSubscribed ] = useState([])
    const [ allItems, setAllItems ]=useState([])

    useEffect(()=>{
        if(props.allItems){
            getItems().then(items=>{
                console.log(items, "ALL ITEMS RES")
                setAllItems(items)
            })
        }
        if(props.myItems){
                getItemsByUser(currentUser.id).then( items =>{
                    setMyItems(items)
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

    return (
        <>
        <div className="mainItemContainer">
            {filteredItems.map(p => {

                return (
                    <Item
                    key={p.id}
                    currentUser={currentUser}
                    admin={currentUser.user.is_staff}
                    is_owner={currentUser.id === p.owner.id}
                    item={p}
                    {...props}/>
                )
            })
            }
        </div>
        </>
    )
}