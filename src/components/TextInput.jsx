import { useState, useContext, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { ChatContext } from "../context/ChatContext";
import { useMessageContext } from "../hooks/useMessageContext";
import TypingIndicator from "../animations/TypingIndicator";

const TextInput = ({ socket, socketConnected }) => {

    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const { user } = useAuthContext()
    const { chat } = useContext(ChatContext)
    const { dispatch } = useMessageContext()

    const handleSubmit = async e => {
        e.preventDefault()

        if(!user || !chat) return

        setLoading(true)
        const url = import.meta.env.VITE_API_URL + '/api/messages'

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                chat: chat._id, content
            })
        })

        const json = await res.json()

        if(!res.ok) {
            setLoading(false)
            console.log(json.error)
        }

        if(res.ok) {
            setLoading(false)
            dispatch({ type: 'ADD_MESSAGE', payload: json })
            socket.emit('newMessage', {newMessage: json, chat})
            socket.emit('stoppedTyping', { chat, user })
            setContent('')
        }

    }

    const timeOut = useRef(null)

    const handleTyping = e => {
        setContent(e.target.value)  

        socket.emit('typing', { chat, user })

        clearTimeout(timeOut.current)

        timeOut.current = setTimeout(() => {
            socket.emit('stoppedTyping', { chat, user })
        }, 1000)  
    }


    useEffect(() => {
        socket.on('isTyping', (sentChat) => {
            if (sentChat._id !== chat._id) return
            setIsTyping(true)
        })

        socket.on('notTyping', () => {
            setIsTyping(false)
        })
    }, [])

    return ( 
        <>
        <div style={{marginLeft: '1.5rem', height: '30px', marginBottom: '1rem'}}>
        { isTyping && <TypingIndicator />}
        </div>
        <form className="text-input-form" onSubmit={handleSubmit} >
            <input 
                type="text" 
                className="main-input"
                placeholder="..."
                value={content} 
                onChange={handleTyping}
            />
            <button disabled={loading} className="round">
                <img src="assets/send.png" alt="send-icon" />
            </button>
        </form>
        </>
     );
}
 
export default TextInput;