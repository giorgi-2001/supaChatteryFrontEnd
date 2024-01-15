import { createContext, useState } from "react";

export const ChatContext = createContext()

export const ChatContextProvider = ({ children }) => {

    const [chat, setChat] = useState(null)
    const [loading, setLoading] = useState(false) 
    
    return (
        <ChatContext.Provider value={{
            chat, setChat, loading, setLoading 
        }}>
            {children}
        </ChatContext.Provider>
    )
}