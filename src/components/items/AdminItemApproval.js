import React, { useContext } from "react"
import { ItemContext } from "./ItemProvider"

export const AdminItemApproval = (props) => {
    const { adminItemApproval } = useContext(ItemContext)

    const AdminVerify = () => {
        if(props.admin){
            return (
                <div className={`toggle-approved ${props.item.approved ? "approved" : "unapproved" }`} onClick={()=> adminItemApproval(props.item.id)}>
                    {props.item.approved
                    ? "Unapprove"
                    : "Approve"
                    }
                </div>
            )}
        else{
            return null
        }
    }
    return(
        <>
            <AdminVerify />
        </>
    )
}