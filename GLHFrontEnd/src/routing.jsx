import { Routes, Route } from "react-router"
import StockControlPage from "./Pages/StockControlPage/StockControlPage"
import HomePage from "./Pages/HomePage/HomePage"
import AccountPage from "./Pages/AccountPage/AccountPage"
import ProductPage from "./Pages/ProductPage/ProductPage"



export default function Pages() {
    return (
        <Routes>
            <Route index element={<HomePage />} />
            <Route path="/Account" element={<AccountPage />} />
            <Route path="/Products" element={<ProductPage />} />
            <Route path="/Stock" element={<StockControlPage />} />
        </Routes>
    )
}