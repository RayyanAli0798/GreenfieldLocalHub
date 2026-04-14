import { useEffect } from "react";
import { useState, createContext, useContext } from "react";
import { useUser } from "./UserContexts";

export const ProductContext = createContext();

export function ProductProvider({ children }) {

    const [productList, setProductsList] = useState([])
    const [producerProducts, setProducerProducts] = useState([])
    const [ListedProducts, setListedProducts] = useState([])
    const { signedInStatus, userRole, userID } = useUser()
    const [orders, setOrdersList] = useState([])
    const [producersOrders, setProducersOrders] = useState([])
    const [userOrderHistory, setUserOrderHistory] = useState([])

    useEffect(() => {
        if (signedInStatus && userRole === "Producer") {
            setProducerProducts(
                productList.filter((product) => product["producers_ID"] === userID)
            )
            setProducersOrders(
                orders.filter((product) => product["producer_id"] === userID)
            )
        }
    }, [productList, userID])

    useEffect(() => {
        setListedProducts(
            productList.filter((product) => product["is_listed"] === true)
        )
        setUserOrderHistory(
            orders.filter((product) => product["user_id"] === userID)
        )
    },[productList])
    return (
        <ProductContext.Provider value={{ productList, setProductsList, producerProducts, setProducerProducts, ListedProducts, setListedProducts, orders, setOrdersList, producersOrders, setProducersOrders,userOrderHistory, setUserOrderHistory  }}>
            {children}
        </ProductContext.Provider>
    )

}

export function useProducts() {
    return useContext(ProductContext)
}