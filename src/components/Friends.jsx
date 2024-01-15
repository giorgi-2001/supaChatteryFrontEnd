import { useEffect, useState, useContext } from "react"
import ListItem from "./ListItem"
import { useAuthContext } from "../hooks/useAuthContext"
import { ChatContext } from "../context/ChatContext"
import { useMessageContext } from "../hooks/useMessageContext"

const Friends = ({ setChatsLayout }) => {

    const [chats, setChats] = useState(null)

    const { user } = useAuthContext()
    const { chat } = useContext(ChatContext)
    const { lastMessages } = useMessageContext()

    useEffect(() => {
        const fetchChats = async () => {
            if(!user) return
            const url = import.meta.env.VITE_API_URL + '/api/chats'

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
                setChats(json)
            }
        }
        fetchChats()
    }, [user, chat, lastMessages])


    return (
        <div className="friends">
            {
                (chats && chats.length > 0) ? 
                chats.map(chat => (
                    <ListItem 
                        key={chat._id} 
                        item={chat.users.find(u => u._id !== user._id)}
                        chatItem={chat} 
                        setChatsLayout={setChatsLayout}
                    />
                )) : <p>No chats yet</p>
            }
        </div>
    )
}

export default Friends