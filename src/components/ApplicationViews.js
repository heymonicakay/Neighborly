import React, {useContext, useEffect} from "react";
import "./Neighborly.css";
import UserProfileRoutes from "./routes/UserProfileRoutes";
import { UserContext } from "./users/UserProvider"

export const ApplicationViews = (props) => {

    return (
        <>
            <main className="main-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}>
                <NavRoutes />
                <TagRoutes />
                <CategoryRoutes />
                <PostRoutes />
                <CommentRoutes />
                <UserProfileRoutes />
            </main>
        </>
    )
};