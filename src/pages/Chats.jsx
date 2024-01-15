import Search from "../components/Search"
import Dialog from "../components/Dialog"
import Profile from "../components/Profile"
import { useState } from 'react'
import { MessageContextProvider } from "../context/MessageContext"

const Chats = () => {

    const [showProfile, setShowProfile] = useState(false)
    const [chatsLayout, setChatsLayout] = useState(true)

    return ( 
        <>
        <header className="header">
            <div className="header__child">
                <button onClick={() => setChatsLayout(p => !p)} className="see-chats-btn">
                    <img src={`assets/${chatsLayout ? 'chat.png' : 'back.png'}`} alt="icon" />
                </button>
                <h1>Supa Chattery</h1>
                <p onClick={() => setShowProfile(p => !p)}>Profile</p>
            </div>
        </header>
        <main className={`main ${chatsLayout ? 'chat-layout' : ''}`}>
            <MessageContextProvider>
                <Search setChatsLayout={setChatsLayout} />
                <Dialog />
            </MessageContextProvider>
            <Profile setShowProfile={setShowProfile} showProfile={showProfile}/>
        </main>
        </>
     );
}
 
export default Chats;