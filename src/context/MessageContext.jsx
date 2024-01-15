import { createContext, useReducer, useState } from "react";

export const MessageContext = createContext()


const messageReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MESSAGES': return {
            messages: action.payload
        }
        
        case 'ADD_MESSAGE': return {
            messages: [action.payload, ...state.messages]
        }
          
        case 'DELETE_MESSAGE': return {
            messages: state.messages.filter(message => message._id !== action.payload._id)
        }

        case 'UPDATE_MESSAGE': return {
            messages: state.messages.map(message => {
                if(message._id === action.paylod._id) {
                    return {...message, ...action.payload}
                } else {
                    return message
                }   
            })
        }
    
        default: return state
    }
}

export const MessageContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(messageReducer, {
        messages: null
    })

    const [lastMessages, setLastMessages] = useState([])

    const [menu, setMenu] = useState(null)
    const [margins, setMargins] = useState(false) // this defines if custom margin styles are set, important for scrolling feature
    
    return(
        <MessageContext.Provider value={{...state, dispatch, menu, setMenu, margins, setMargins, lastMessages, setLastMessages }}>
            {children}
        </MessageContext.Provider>
    )
}