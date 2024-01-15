import { AuthContext } from "../context/AuthContxt";
import { useContext } from "react";

export const useAuthContext = () => {

    const context = useContext(AuthContext)

    if(!context) {
        throw Error ('Unable to use AuthContext')
    }

    return context
}