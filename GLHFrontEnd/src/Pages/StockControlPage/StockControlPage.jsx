import "./StockControlPage.css"
import plusIcon from "../../assets/plusIcon.png"
import { useState } from "react"
import CloseIcon from "../../assets/CloseIcon.webp"
import axios from "axios"
import { useUser } from "../../Contexts/UserContexts"

export default function StockControlPage() {

    return (
        <>
            <h1 className="dashboard-page-title"> Stock Dashboard</h1>
            <div className="producer-dashboard">


                {/* 3 dashboard sections are split up */}
                <StockManagment />


                <div className="Dashboard-bottom">
                    <ListedProducts />
                    <OrdersToComplete />
                </div>


            </div>
        </>
    )
}



function StockManagment() {

    // controls adding stock
    const [openAddProduct, setOpenAddProduct] = useState(false)
    function toggleProduct() {
        setOpenAddProduct(!openAddProduct)
    }

    return (

        <>
            {/* tenery operator displays product box when image is clicked */}
            {openAddProduct ? <AddProductBox toggle={toggleProduct} /> : null}
            <div className="stock-managment">
                <span className="dashboard-title-bar">
                    <h2> Stock Managment  </h2> <img src={plusIcon} onClick={toggleProduct} className="adding-stock-icon"/>
                </span>


            </div>
        </>)
}

function ListedProducts() {
    // products listed function 
    return (
        <div className="bottom-products">
            <span className="dashboard-title-bar">
                <span className="empty-div-stock" /><h2> Listed Products  </h2> <img src={plusIcon} className="adding-stock-icon" />


            </span>
        </div>
    )
}
function OrdersToComplete() {
    // incomplete orders section
    return (
        <div className="bottom-products">
            <span className="dashboard-title-bar">
                <span className="empty-div-stock" /><h2> To-do  </h2> <img src={plusIcon} className="adding-stock-icon" />


            </span>
        </div>
    )
}

function AddProductBox({ toggle }) {

    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [cost, setCost] = useState(0.25)
    const [orderType, setOrderType] = useState("")
    const { userID } = useUser()

    if (quantity <= 0){
        setQuantity(1)
    }
    if (cost <= -0.01){
        setCost(0.50)
    }


    function sendingProductData(event) {
        event.preventDefault()
        const url = `http://127.0.0.1:8001/products/adding_product`

        //data to send
        let productInfo = {
            "product_name": name,
            "quantity_avaliable": quantity,
            "cost_per_unit": cost,
            "producers_ID": userID,
            "orderType": orderType
        }

        function handleSuccess() {
            toggle()
        }
        function handleError() {
            alert("something went wrong, please try again later")
            toggle()
        }


        axios.post(url, productInfo)
            .then(handleSuccess)
            .catch(handleError)

    }


    return (
        <div className="add-product-box">


            <form className="adding-product" onSubmit={sendingProductData}>
                <h2> <span /> Add product! <img src={CloseIcon} onClick={toggle} className="adding-stock-icon" /> </h2>

                <label> Product Name:
                    <input type="text" onChange={(e) => setName(e.target.value)} /></label>
                <label> Quantity:
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label>
                <label> Price:
                    <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} /></label>

                <label> Transport:
                    <select onChange={(e) => setOrderType(e.target.value)} required>
                        <option hidden disabled selected> </option>
                        <option value="CollectionOnly" > Collection </option>
                        <option value="DeliveryOnly" > Delivery </option>
                        <option value="Both" > Both </option>
                    </select>
                </label>

                <button type="submit" > Submit </button>
            </form>


        </div>
    )
}