import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./UserProvider"
import { User } from "./User"
import "./User.css"


export const UsersList = (props) => {
    const {users, getUsers, currentUser} = useContext(UserContext)


    useEffect(() => {
        getUsers()
    }, [])

    return (
        <>
        {currentUser.is_staff ?
            <section className="userTableContainer">
                <h2>Users</h2>
                <table className="usersTable">
                    <tbody>
                        {users.map(u => {
                            return <User
                            key={u.date_joined}
                            user={u}
                            users={users}
                            {...props}/>
                        })}

                    </tbody>
                    
                </table>

            </section>
        :<div>You are not authorized to view this page</div>
        }
        </>
    )
}