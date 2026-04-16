import "./StockControlPage.css"
import plusIcon from "../../assets/plusIcon.png"
import { useState } from "react"
import CloseIcon from "../../assets/CloseIcon.webp"
import axios from "axios"
import { useUser } from "../../Contexts/UserContexts"
import ModifyIcon from "../../assets/ModifyIcon.png"
import DeleteIcon from "../../assets/DeleteIcon.png"
import PublishIcon from "../../assets/PublishIcon.svg"
import { useProducts } from "../../Contexts/ProductContext"
import { useEffect } from "react"
import HistoryIcon from "../../assets/HistoryIcon.png"

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


                <div className="Warning"> This version is in demo mode. Changes will appear after refreshing the page. </div>
            </div>
        </>
    )
}
function StockManagment() {

    // controls adding stock
    const [openAddProduct, setOpenAddProduct] = useState(false)
    const { producerProducts } = useProducts()
    function toggleProduct() {
        setOpenAddProduct(!openAddProduct)
    }

    return (

        <>
            {/* tenery operator displays product box when image is clicked */}
            {openAddProduct ? <AddProductBox toggle={toggleProduct} /> : null}
            <div className="stock-managment">
                <span className="dashboard-title-bar">
                    <h2> Stock Managment  </h2> <img src={plusIcon} onClick={toggleProduct} className="adding-stock-icon" />
                </span>
                <div className="products-container">
                    {
                        producerProducts.map((product, key) => {
                            return (
                                < StockInlineDisplay name={product["product_name"]} cost={product["cost_per_unit"]} quantity={product["quantity_avaliable"]} publish={true} modify={true} ProductID={product["product_ID"]} />
                            )
                        })
                    }
                </div>
            </div>
        </>)
}
function ListedProducts() {
    const { producerProducts } = useProducts();
    const [producerListedList, setProducerListedList] = useState([])

    useEffect(() => {

        setProducerListedList(
            producerProducts.filter((products) => products["is_listed"] == true)
        )
    }, [producerProducts])

    return (
        <div className="bottom-products">
            <span className="dashboard-title-bar">
                <span className="empty-div-stock" /><h2> Listed Products  </h2> 
            </span>
            <div className="products-container">
                {
                    producerListedList.map((product, key) => {
                        return (
                            < StockInlineDisplay name={product["product_name"]} cost={product["cost_per_unit"]} quantity={product["quantity_avaliable"]} publish={false} modify={false} ProductID={product["product_ID"]} />
                        )
                    })
                }
            </div>
        </div>
    )
}
function OrdersToComplete() {
    const { producersOrders, setProducersOrders } = useProducts()
    const [compeltedOrders, setCompletedOrders] = useState([])
    const [uncompelteOrders, setUncompletedOrders] = useState([])

    useEffect(() => {

        setCompletedOrders(
            producersOrders.filter((orders) => orders["completed_status"] === true)
        )
        setUncompletedOrders(
            producersOrders.filter((orders) => orders["completed_status"] === false)
        )
    }, [producersOrders])
    return (
        <div className="bottom-products">
            <span className="dashboard-title-bar">
                <span className="empty-div-stock" /><h2> To-do  </h2> <img src={HistoryIcon} className="adding-stock-icon" />
            </span>

            {
                uncompelteOrders.map((Order, key) => {
                    return (
                        <Checkbox name={Order["product_name"]} quantity={Order["quantity"]} paid={Order["total_cost"]} orderID={Order["order_id"]} changingOrderList={setUncompletedOrders} currentOrderList={uncompelteOrders} />
                    )
                })
            }
        </div>
    )
}
function AddProductBox({ toggle }) {

    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [cost, setCost] = useState(0.25)
    const [orderType, setOrderType] = useState("")
    const { userID } = useUser()

    if (quantity <= 0) {
        setQuantity(1)
    }
    if (cost <= -0.01) {
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
                    <input type="text" onChange={(e) => setName(e.target.value)} required /></label>
                <label> Quantity:
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></label>
                <label> Price:
                    <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} required /></label>

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
function StockInlineDisplay({ name, quantity, cost, publish, modify, ProductID }) {
    const [modifySection, setModify] = useState(false)
    const { setProducerProducts, producerProducts } = useProducts()
    function deleteProduct() {
        const url = `http://127.0.0.1:8001/products/deleting_product?productID=${ProductID}`
        axios.delete(url)
            .then(() => {
                console.log("Successfully deleted Product")
                setProducerProducts(
                    producerProducts.filter((product) => product["product_ID"] != ProductID))

            })
            .catch(() => {
                console.log("Error, could not delete")
            })
    }
    function PublishProduct() {
        const url = `http://127.0.0.1:8001/products/publishing_product?productID=${ProductID}`
        axios.patch(url)
            .then(() => {
                console.log("Successfully listed Product")
            })
            .catch(() => {
                console.log("Error")
            })
    }
    function toggleModify() {
        setModify(!modifySection)
    }
    return (
        <div className="stock-inine">
            <div className="Data-area">
                <p className="data product-name"> {name} </p>
                <p className="data product-name"> Quantity: {quantity} </p>
                <p className="data product-name"> Price: £{cost} </p>
            </div>

            <div className="icons-section">
                {modify ? <img src={ModifyIcon} alt="Modify Button" className="stock-icon" onClick={toggleModify} /> : null}
                {publish ? <img src={PublishIcon} alt="Publish Button" className="stock-icon" onClick={PublishProduct} /> : null}
                <img src={DeleteIcon} alt="Delete Button" className="stock-icon" onClick={deleteProduct} />
            </div>
            {modifySection ? <ModifyProduct name1={name} quantity1={quantity} cost1={cost} toggle={toggleModify} PID={ProductID} /> : null}
        </div>
    )
}
function ModifyProduct({ toggle, name1, quantity1, cost1, PID }) {

    const [name, setName] = useState(name1)
    const [quantity, setQuantity] = useState(quantity1)
    const [cost, setCost] = useState(cost1)
    const [orderType, setOrderType] = useState("")
    const { userID } = useUser()

    if (quantity <= 0) {
        setQuantity(1)
    }
    if (cost <= -0.01) {
        setCost(0.50)
    }


    function sendingProductData(event) {
        event.preventDefault()
        const url = `http://127.0.0.1:8001/products/updating_product_details`

        //data to send
        let productInfo = {
            "productID": PID,
            "quantity_avaliable": quantity,
            "cost_per_unit": cost,
            "orderType": orderType

        }

        function handleSuccess() {
            toggle()
        }
        function handleError() {
            alert("something went wrong, please try again later")
            toggle()
        }


        axios.patch(url, productInfo)
            .then(handleSuccess)
            .catch(handleError)

    }
    return (
        <div className="add-product-box">


            <form className="adding-product" onSubmit={sendingProductData}>
                <h2> <span /> Modify product! <img src={CloseIcon} onClick={toggle} className="adding-stock-icon" /> </h2>

                <label> Product Name:
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} required disabled /></label>
                <label> Quantity:
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required /></label>
                <label> Price:
                    <input type="text" value={cost} onChange={(e) => setCost(e.target.value)} required /></label>

                <label> Transport:
                    <select onChange={(e) => setOrderType(e.target.value)} required value={orderType}>
                        <option hidden disabled > </option>
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


function Checkbox({ name, quantity, paid, orderID, changingOrderList, currentOrderList }) {
    function orderComplete() {
        const url = `http://127.0.0.1:8001/orders/updating_status?orderID=${orderID}`
        axios.patch(url)
            .then(() => {
                changingOrderList(
                    currentOrderList.filter((product) => product["order_id"] != orderID))
            })

            .catch(() => {
                alert("error")
            })
    }
    return (
        <div className="checkbox-inline">
            <div className="order-data">
                <p className="checkbox-title"> {name }  </p>
                <p className="checkbox-title"> Quantity: {quantity}  </p>
                <p className="checkbox-title"> Price: £{paid}  </p>
            </div>
            <input type="checkbox" onClick={orderComplete} />
        </div>
    )
}

function OrderHistory() {

}