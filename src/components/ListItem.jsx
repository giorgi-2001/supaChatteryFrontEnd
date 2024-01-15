import { useAuthContext } from '../hooks/useAuthContext'
import { ChatContext } from '../context/ChatContext'
import { useContext, useEffect, useState } from 'react'
import { useMessageContext } from '../hooks/useMessageContext'

const ListItem = ({ item, chatItem, setChatsLayout }) => {

    const { user, activeUsers } = useAuthContext()
    const { chat, setChat, setLoading} = useContext(ChatContext)
    const { dispatch, lastMessages } = useMessageContext()

    const [itemClass, setItemCLass] = useState('')
    const [lastMessage, setLastMessage] = useState(null)
 
    const [activeClass, setActiveClass] = useState('')

    useEffect(() => {
        if(!activeUsers.length) return
        const isActive = activeUsers.find(user => user._id === item._id)
        if(isActive) {
            setActiveClass('active')
        } else {
            setActiveClass('')
        }
    }, [activeUsers])

    useEffect(() => {
        if(lastMessages.length > 0) {
            const message = lastMessages.
                filter(msg => msg.chat === chatItem._id).slice(-1)[0]
            if(itemClass) {
                return setLastMessage(null)
            }
            setLastMessage(message)
        }
    }, [lastMessages, chat]) 


    const imageStyles = {
        backgroundImage: `url(${item.avatar})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

    const handleClick = async () => {

        dispatch({type: 'SET_MESSAGES', payload: null})

        const url = import.meta.env.VITE_API_URL + '/api/chats'

        setChatsLayout(false)

        if(!user) return

        setLoading(true)

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: item._id
            })
        })

        const json = await res.json()

        if(!res.ok) {
            console.log(json.error)
            setLoading(false)
        }

        if(res.ok) {
            setLoading(false)
            setChat(json)
        }
    }

    useEffect(() => {
        if(!chat || !user) return
        const theOtherGuy = chat.users.find(u => u._id !== user._id)
        if (theOtherGuy._id === item._id) {
            setItemCLass('active')
        } else {
            setItemCLass('')
        }
    }, [chat])

    return (
        <div className={`list-item ${itemClass}`} onClick={handleClick}>
                <div className={`image-holder ${activeClass}`} style={imageStyles}></div>
            <div>
                <p>{item.username}</p>
                {(chatItem && lastMessage && !itemClass) && <p className='last-message'>{lastMessage.content}</p>}
                {(chatItem && !lastMessage && chatItem.last_message?.sender !== user._id) &&<p className='last-message'>{chatItem.last_message?.content}</p>}
            </div>
        </div>
    )

}


export default ListItem