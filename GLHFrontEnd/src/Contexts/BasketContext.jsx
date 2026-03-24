import { useState, createContext, useContext } from "react";

export const BasketContext = createContext();

export function BasketProvider({ children }) {

    const [currentBasket, setCurrentBasket] = useState("")
    const [newBasketItem, setnewBasketItem] = useState("")

    return (

        <BasketContext.Provider value={{ newBasketItem, setnewBasketItem}}>
            {children}
        </BasketContext.Provider>
    )

}

export function useBasket() {
    return useContext(BasketContext)
}