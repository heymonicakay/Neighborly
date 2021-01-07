import React, { useRef, useState, useEffect, useContext } from "react"
import { UserContext } from '../users/UserProvider'
import { Link } from "react-router-dom"
import "./Auth.css"

export const Register = (props) => {
    const { setToken } = useContext(UserContext)

    const [profileImg, setProfileImg] = useState('')
    const [image, setImage] = useState('')
    const [imageId, setImageId] = useState('')
    const [loading, setLoading] = useState(false)

    const first_name = useRef()
    const last_name = useRef()
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const bio = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

    const imageUpload = (url, data) => {
        const image = {
            "image": data,
            "profile": ''
        }
        return fetch(url, {
            method: 'POST',
            headers: {
                "Authorization": `Token fa2eba9be8282d595c997ee5cd49f2ed31f65bed`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(image)
        }).then(res => res.json()).then(res=>{
            setImage(res.image)
            setImageId(res.id)
        }).then(()=>setLoading(false))
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createProfileImageJSON = (e) => {
        getBase64(e.target.files[0], (base64ImageString) => {
            setProfileImg(base64ImageString)
        });
    }

    const patchImage = (token) => {
        const imgId = imageId
        const url = `http://localhost:8000/profileimages/${imgId}/savetoprofile`;

        return fetch(`${url}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Token ${token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
    }
    useEffect(()=>{
        if(profileImg !== ''){
            setLoading(true)
            const url = "http://localhost:8000/profileimages"
            const data = profileImg
            imageUpload(url, data)
        }
    },[profileImg])

    const handleRegister = (e) => {
        e.preventDefault()
        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "first_name": first_name.current.value,
                "last_name": last_name.current.value,
                "username": username.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "bio": bio.current.value,
            }
            return fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            }).then(res => res.json())
                .then(res => {
                    setToken(res.token)
                    patchImage(res.token).then(()=>props.history.push("/items"))
                })
        }
        else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main className="register--contain" style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <div className="image_register"></div>
            <form className="form--login form--register" onSubmit={handleRegister}>
                <div className="input__wrapper">
                    <div className="input__container--left">
                        <input ref={first_name} type="text" name="first_name" className="form-control first_name" placeholder="First Name" autoComplete="off" spellCheck="off" autoFocus />

                        <input ref={last_name} type="text" name="last_name" className="form-control last_name" placeholder="Last Name" autoComplete="off" spellCheck="off" />
                        <input ref={email} type="email" name="email" className="form-control email" placeholder="Email" autoComplete="off" spellCheck="off" />
                    </div>

                    <div className="input__container--right">
                        <input ref={username} name="username" className="form-control username-register" placeholder="Username" autoComplete="off" spellCheck="off" />
                        <input ref={password} type="password" name="password" className="form-control pw-register" placeholder="Password" autoComplete="off" spellCheck="off" />
                        <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control pw-verify" placeholder="Verify password" autoComplete="off" spellCheck="off" />
                        <textarea ref={bio} name="bio" className="form-control bio" placeholder="Bio" />
                        <input className="register-input" type="file" id="profile_image" onChange={(e) => {createProfileImageJSON(e)}}/>

                        <button className="btn login-button" type="submit">Register</button>
                        <section className="link--register">
                            Already registered? <Link className="link--register-clickable" to="/login">Login</Link>
                        </section>
                    </div>
                </div>

            </form>
            {loading
            ? <h3 className="h3 h3--img-load">Loading...</h3>
            : <div className="upload--img">
                <img src={image} alt="" className="img-uploaded" />
            </div>
            }
        </main>
    )
}
