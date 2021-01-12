import React, {useState, useEffect} from 'react'
import "./Message.css";

export default (props) => {

    const [image, setImage] = useState({})
    const [message, setMessage] = useState('Loading...')

    const getItemImages = (id) => {
        return fetch(`http://localhost:8000/itemimages?item_id=${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(res =>{
            console.log(res[0], "RESPONSE")
            return res[0]
        })
    }

useEffect(()=>{
    getItemImages(props.reservation.item.id).then(setImage)

    setMessage(props.reservation.messages[0].body)

}, [])

const handleClick = () => {
    props.history.push(`/reservation/${props.reservation.id}`)
}
    return (
        <>
        { props.reservation.user.id === props.currentUser.id
        ?
        <section className="message" onClick={()=> handleClick()}>
            <div className="message-list-single">
                <div className="message-list-top">
                    <div className="message-title-wrapper">
                        You asked to borrow a {props.reservation.item.name} from {props.reservation.item.owner.user.first_name} <br/>
                        {image && <img className="item-image" src={image.image}/>}
                        {message} <br />
                        {props.reservation.res_status.label}
                    </div>
                </div>
            </div>
        </section>
        :
        <section className="message" onClick={()=> handleClick()}>
            <div className="message-list-single">
                <div className="message-list-top">
                    <div className="message-title-wrapper">
                        {props.reservation.user.user.first_name} asked to borrow your {props.reservation.item.name}
                        {image && <img className="item-image" src={image.image}/>}
                        {message} <br />
                        {props.reservation.res_status.label}
                    </div>
                </div>
            </div>
        </section>
        }
        </>
    )
}