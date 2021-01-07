import React, { useEffect, useContext, useState } from "react"
import DefaultProfileImage from "./default_profile_image.jpg"
import { Link } from "react-router-dom"
import { UserContext } from "./UserProvider"
// import { SubscribeButton } from "./SubscribeButton"
import "./User.css"

export const UserProfile = (props) => {
    const { getUserProfile, getCurrentUser } = useContext(UserContext)
    const [profile, setProfile] = useState({})
    const [image, setImage] = useState(DefaultProfileImage)
    const [DD, setDD] = useState("00")
    const [MM, setMM] = useState("00")
    const [YYYY, setYYYY] = useState("0000")
    const [itemCount, setItemCount] = useState(0)
    const [plural, setPlural] = useState("")
    const [currentUser, setCurrentUser] = useState({})

    const userId = parseInt(props.match.params.userId)
    useEffect(() => {
        getUserProfile(userId)
    }, [])

    useEffect(()=>{
        if(itemCount === 0){
            setItemCount(null)
        }
        if(itemCount === 1){
            setPlural("item")
        }
        if(itemCount > 1){
            setPlural("items")
        }
    }, [itemCount])

    useEffect(()=> {
        if(profile && profile.date_joined){
            const date = profile.date_joined.split('T')[0]
            const [year, month, day] = date.split('-')
            const [dayOne, dayTwo] = day.split('')
            const [monthOne, monthTwo] = month.split('')
            if(dayOne === "0"){
                setDD(dayTwo)
            }
            else{
                setDD(day)
            }
            if(monthOne === "0"){
                setMM(monthTwo)
            }
            else {
                setMM(month)
            }
            setYYYY(year)
        }
        if(profile.images){
            const image = profile.images[0].image
            setImage(image)
        }
        if(profile && profile.items){
            const count = profile.items.length
            setItemCount(count)
        }
    }, [profile])


    return (
        <div className="profile-container">
            <div className="left-spacer"></div>
                <article className="profile">

                    {/* {profile &&
                        <SubscribeButton
                        currentUser={currentUser}
                        author_id={userId}
                        {...props} />
                    } */}

                    <div className="top">
                        <section className="profile__info-left">
                            <div className="profile__img">
                                <img className="image" alt="" src={image} />
                            </div>
                            <div className="profile__name">
                                {profile.full_name}
                            </div>
                        </section>

                        <section className="profile__info-right">
                            <div className="profile__username">
                                @{profile.username}
                            </div>
                            <div className="profile__email">
                                <p className="email">
                                {profile.email}
                                </p>
                            </div>
                            <div className="profile__datejoin">
                                <p className="mem-since">
                                member since: {MM}-{DD}-{YYYY}
                                </p>
                            </div>
                            <div className="profile__type">
                                {profile.is_staff
                                ? "admin"
                                : "author"
                            }
                            </div>
                            <Link
                            title={`Click to view items by ${profile.username}`}
                            className="profile__articles"
                            to={{ pathname: `/items/user/${profile.id}`,
                            state: {userId: `${profile.id}`,
                            name:`${profile.username}`}}} >
                                {itemCount} {plural}
                            </Link>
                        </section>
                    </div>
                    <div className="bottom profile__bio">
                        {profile.bio}
                    </div>
                </article>
            <div className="right-spacer"></div>
        </div>
    )
}