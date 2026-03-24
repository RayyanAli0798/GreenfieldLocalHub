import { useState, createContext, useContext } from "react";

export const userContext = createContext();

export function UserProvider({ children }) {

    const [signedInStatus, setSignedInStatus] = useState(true)
    const [userRole, setUserRole] = useState("Producer")

    return (

        <userContext.Provider value={{ signedInStatus, setSignedInStatus, userRole, setUserRole }}>
            {children}
        </userContext.Provider>
    )

}

export function useUser() {
    return useContext(userContext)
}