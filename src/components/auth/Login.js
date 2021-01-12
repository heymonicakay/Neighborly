import React, { useRef, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { UserContext } from '../users/UserProvider'
import "./Auth.css"

export const Login = (props) => {
    const username = useRef(null)
    const password = useRef(null)
    const invalidDialog = useRef(null)

    const {currentUser} = useContext(UserContext)

    const handleLogin = (e) => {
        e.preventDefault();

        return fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value,
            })
        }).then(res => res.json())
        .then(res => {
            if ("valid" in res && res.valid && "token" in res) {
                localStorage.setItem("token", res.token)
                props.history.push("/items")
            }
            else {
                invalidDialog.current.showModal();
            }
        })
    }


    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <div className="image_login"></div>
                    <div className="input__container">
                        <input
                            ref={username}
                            type="text"
                            id="username"
                            className="form-control username-login"
                            defaultValue="harrypotter"
                            placeholder="username"
                            required
                            autoComplete="off"
                            spellCheck="off"
                            autoFocus />
                        <input ref={password}
                            type="password"
                            id="password"
                            className="form-control pw-login"
                            autoComplete="off"
                            spellCheck="off"
                            defaultValue="harry"
                            placeholder="password"
                            required />
                    </div>
                    <div className="button__container">
                        <button className="btn login-button" type="submit">
                            Login
                        </button>
                    </div>
                </form>
            </section>
            <section className="link--register">
                <Link className="link--register-clickable" to="/register">Don't have an account yet? Click here to sign up!</Link>
            </section>
        </main>
    )
}
