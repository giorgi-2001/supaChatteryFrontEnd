import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";

export const useMessageContext = () => {

    const context = useContext(MessageContext)

    if(!context) {
        throw Error('Unable to reach the message context')
    }

    return context
}