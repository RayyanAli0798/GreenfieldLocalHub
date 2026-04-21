import { useState, createContext, useContext } from "react";

export const userContext = createContext();

export function UserProvider({ children }) {

    const [signedInStatus, setSignedInStatus] = useState(false)
    const [userRole, setUserRole] = useState("")
    const [userID, setUserID] = useState("")
    return (

        <userContext.Provider value={{ signedInStatus, setSignedInStatus, userRole, setUserRole, setUserID, userID }}>
            {children}
        </userContext.Provider>
    )

}

export function useUser() {
    return useContext(userContext)
}