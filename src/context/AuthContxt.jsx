import { createContext, useReducer, useState } from "react";

export const AuthContext = createContext()


const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': return {
            user: action.payload
        }
        case 'LOGOUT': return {
            user: null
        }
        default: state.user
    }
}


export const AuhtContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    const [activeUsers, setActiveUsers] = useState([])

    return (
        <AuthContext.Provider value={{...state, dispatch, activeUsers, setActiveUsers}}>
            {children}
        </AuthContext.Provider>
    )

}