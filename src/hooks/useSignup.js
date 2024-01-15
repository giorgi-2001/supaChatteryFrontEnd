import { useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, username, password, password2, avatar) => {
        setLoading(true)
        const url = import.meta.env.VITE_API_URL + '/api/users/signup'
        const res = await fetch (url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, username, password, password2, avatar
            })
        })
        const json = await res.json()

        if(!res.ok) {
            setLoading(false)
            setError(json.error)
        }
        if(res.ok) {
            setLoading(false)
            setError(null)
            dispatch({type: 'LOGIN', payload: json})
            localStorage.setItem("user", JSON.stringify(json))
        }
    }

    return { loading, error, setError, signup }
}

