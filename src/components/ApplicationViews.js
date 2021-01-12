import React, {useContext, useEffect} from "react";
import "./Neighborly.css";
import UserProfileRoutes from "./routes/UserProfileRoutes";
import ItemRoutes from "./routes/ItemRoutes";
import NavRoutes from "./routes/NavRoutes"
import MessageRoutes from "./routes/MessageRoutes"
import { UserContext } from "./users/UserProvider"

export const ApplicationViews = (props) => {
    const {getCurrentUser, currentUser} = useContext(UserContext)

    useEffect(()=>{
        getCurrentUser(localStorage.getItem("token"))
    },[])

    return (
        <>
            <main className="main-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}>
                <NavRoutes />
                <UserProfileRoutes currentUser={currentUser} />
                <ItemRoutes />
                <MessageRoutes />
            </main>
        </>
    )
};