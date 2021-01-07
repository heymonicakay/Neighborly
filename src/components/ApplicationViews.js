import React, {useContext, useEffect} from "react";
import "./Neighborly.css";
import UserProfileRoutes from "./routes/UserProfileRoutes";
import ItemRoutes from "./routes/ItemRoutes";
import NavRoutes from "./routes/NavRoutes"

import { UserContext } from "./users/UserProvider"

export const ApplicationViews = (props) => {
    const {currentUser} = useContext(UserContext)

    return (
        <>
            <main className="main-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}>
                <NavRoutes />
                <UserProfileRoutes currentUser={currentUser} />
                <ItemRoutes />
            </main>
        </>
    )
};