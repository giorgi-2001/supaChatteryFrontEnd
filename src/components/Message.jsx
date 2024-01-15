import { useEffect, useState } from "react"
import { useMessageContext } from "../hooks/useMessageContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { format } from 'date-fns'

const Message = ({ message, otherGuy }) => {

    const thisDate = new Date (message.createdAt)
    const time = (new Date() - thisDate) / 3600000

    const getOptionString = () => {
        let optionString 

        if(time <= 24 ) {
            optionString = 'H:mm'
        }

        if(time > 24 && time <= (7 * 24)) {
            optionString = "eee 'at' H:mm"
        }

        if(time > (7 * 24)) {
            optionString = "MMM d 'at' H:mm"
        }

        return optionString
    }

    const formatedDate = format(thisDate, getOptionString())

    const myMessage = message.sender !== otherGuy._id
    let className = ''

    if (myMessage) {
        className = 'my-message'
    } else {
        className = ''
    }

    const { menu, setMenu, messages, setMargins, dispatch } = useMessageContext()

    const handleClick = () => {
        if(!menu) {
            setMenu(message._id)
        } else if (menu !== message._id) {
            setMenu(message._id)
        } else {
            setMenu(null)
        }
    }

    const [showDate, setShowDate] = useState(false)
    const [timeDifference, setTimeDifference] = useState(0)
    const [marginTop, setMarginTop] = useState(0)
    const [showImage, setShowImage] = useState(false)
 
    useEffect(() => {
        if(!messages || messages.length === 0) return

        const prevMessage = messages[messages.indexOf(message) +1]
        if(!prevMessage) return

        const newDate = new Date(message.createdAt)
        const prevDate = new Date(prevMessage.createdAt)
        const difference = (newDate - prevDate) / 1000
        setTimeDifference(difference)

        if (timeDifference > 1800 || showDate) {
            setMarginTop('0')
            setShowImage(true)
            return
        }

        if (timeDifference <= 60) {
            setMarginTop('5px')
        } else if (timeDifference > 60){
            setMarginTop('1rem')
        }

        if (message.sender !== prevMessage.sender) {
            setMarginTop('2rem')
            setShowImage(true)
        }

        setMargins(true)

    }, [messages, timeDifference])


    const { user } = useAuthContext()

    const handleDelete = async () => {
        if(!user) return

        const url = import.meta.env.VITE_API_URL + '/api/messages/' + message._id

        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await res.json()

        if(!res.ok) {
            console.log(json.error)
        }

        if(res.ok) {
            dispatch({type: 'DELETE_MESSAGE', payload: json})
        }
    }

    const islastMessage = messages?.slice(-1)[0]._id === message._id
    const isFirstMessage = messages?.[0]._id === message._id


    const imageStyles = {
        backgroundImage: `url(${otherGuy.avatar})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    return ( 
        <>
        <div style={{marginTop}} className={`message-element ${className}`}>
            {(!myMessage && (showImage || islastMessage || isFirstMessage)) &&
            <div className="image-holder" style={imageStyles}></div>}
            <p 
                onClick={() => setShowDate(prev => !prev)} 
                className="message"
            >{message.content}</p>
            <div>
                <button className="dot-button" onClick={handleClick}>
                    <svg fill="#555" height="20px" width="20px" id="Layer_1" dataname="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" stroke="#555"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path className="cls-1" d="M8,6.5A1.5,1.5,0,1,1,6.5,8,1.5,1.5,0,0,1,8,6.5ZM.5,8A1.5,1.5,0,1,0,2,6.5,1.5,1.5,0,0,0,.5,8Zm12,0A1.5,1.5,0,1,0,14,6.5,1.5,1.5,0,0,0,12.5,8Z"></path> </g></svg>
                </button>
                {(menu === message._id)&& <ul className="menu">
                    <li onClick={handleDelete}>Remove</li>
                </ul>}
            </div>
        </div>
        {(timeDifference > 1800 || showDate || islastMessage)  
           && <p className="date">{formatedDate}</p>}
        </>
     );
}
 
export default Message;