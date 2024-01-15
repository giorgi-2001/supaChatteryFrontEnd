import { useAuthContext } from "./useAuthContext"
import { io } from 'socket.io-client'

const socket = io(import.meta.env.VITE_API_URL)

export const useLogout = () => {

    const { user, dispatch } = useAuthContext()


    const logout = () => {
        dispatch({type: "LOGOUT"})
        socket.emit('logout', user)
        localStorage.removeItem('user')
    }

    return logout
}