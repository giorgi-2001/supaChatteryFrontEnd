import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from '../context/ChatContext'
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";
import { io } from 'socket.io-client'
import Message from "./Message";
import TextInput from "./TextInput";
import Loader from "../animations/Loader";

const ENDPOINT = import.meta.env.VITE_API_URL
let socket

const Dialog = () => {

    const { chat, loading } = useContext(ChatContext)
    const { user, setActiveUsers } = useAuthContext()
    const { messages, dispatch, setMenu, menu, margins, setMargins, setLastMessages 
    } = useMessageContext()

    const containerRef = useRef(null)
    const chatCompare = useRef(null)

    let otherGuy

    if(chat && user) {
        otherGuy = chat.users.find(u => u._id !== user._id)
    }

    const filteredMessages = messages?.filter(m => {
        if (m.hidden && m.sender === otherGuy._id) return 
        else return m
    })

    const imageStyles = {
        backgroundImage: `url(${otherGuy?.avatar})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit('setup', user)
        socket.on('activeUsers', (users) => setActiveUsers(users))
    }, [])


    const runOnce = useRef(false)

    useEffect(() => {
        socket.on('messageRecieved', (newMessage) => {  
            if(!chatCompare.current || chatCompare.current._id !== newMessage.chat){
                setLastMessages(prev => {
                    return [...prev, newMessage]
                })
            } else {
                dispatch({type: 'ADD_MESSAGE', payload: newMessage}) 
            }
            return () => {runOnce.current = true}  
        })
    }, [dispatch, runOnce])


    useEffect(() => {
        if (!user || !chat) return
        const fetchMessages = async () => {
            const url = import.meta.env.VITE_API_URL + `/api/messages?chat=${chat._id}`
            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await res.json()

            if(!res.ok) {
                console.log(json.error)
            }
            if(res.ok) {
                dispatch({ type: 'SET_MESSAGES', payload: json })
                chatCompare.current = chat
            }
        }
        fetchMessages()
    }, [user, chat])

    useEffect(() => {
        if (!messages && !margins) return
        const scrollHeight = containerRef?.current.scrollHeight
        const height = containerRef?.current.clientHeight
        const maxScrollTop = scrollHeight + height
        
        containerRef?.current.scrollTo({
            top: maxScrollTop,
            behavior: 'smooth'
        })

        setMargins(false)
    }, [margins, messages])


    const handleClick = e => {
        if(!menu) return
        const isLi = e.target.tagName === 'LI'
        const isButton = e.target.classList.contains('dot-button')
        const isSvg = e.target.tagName === 'svg'
        if(isLi || isButton || isSvg) return
        setMenu(null)
    }

    return ( 
        <div ref={containerRef} className="dialog" onClick={e => handleClick(e)}>

            {loading && <Loader />}

            {(otherGuy && !loading) && <div className="other-guy-info">
                <div className="image-holder" style={imageStyles}></div>
                <p>{otherGuy.username}</p>
                <p>{otherGuy.email}</p>
            </div>}

            {(!otherGuy && !loading) && 
            <p className="instruction">Click on the User to start messaging...</p>}

            {messages && <>
                <div className="message-container">
                    {
                        filteredMessages.map(message => (
                            <Message 
                                key={message._id} 
                                message={message} 
                                otherGuy={otherGuy}
                            />
                        ))
                    }
                </div>
                <TextInput socket={socket} />
            </>}
        </div>
        
     );
}
 
export default Dialog;