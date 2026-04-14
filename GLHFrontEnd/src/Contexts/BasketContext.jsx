import { useState, createContext, useContext } from "react";

export const BasketContext = createContext();

export function BasketProvider({ children }) {

    const [currentBasket, setCurrentBasket] = useState("")

    return (

        <BasketContext.Provider value={{ currentBasket, setCurrentBasket}}>
            {children}
        </BasketContext.Provider>
    )

}

export function useBasket() {
    return useContext(BasketContext)
}