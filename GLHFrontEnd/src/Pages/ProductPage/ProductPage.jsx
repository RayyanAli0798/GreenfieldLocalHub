import { useState } from "react"
import settingsIcon from "../../assets/settingsIcon.png"
import HistoryIcon from "../../assets/HistoryIcon.png"
import BasketIcon from "../../assets/BasketIcon.png"
import { useProducts } from "../../Contexts/ProductContext"
import "./ProductPage.css"
import { useEffect } from "react"
import { useBasket } from "../../Contexts/BasketContext"
import CloseIcon from "../../assets/CloseIcon.webp"
import DeleteIcon from "../../assets/DeleteIcon.png"
import { useNavigate } from "react-router"
import { useUser } from "../../Contexts/UserContexts"
import axios from "axios"


export default function ProductPage() {
    const [showDelivery, setShowDelivery] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    const [CurrentlyOpened, setCurrentlyOpened] = useState("")

    function togglePopup() {
        // opens/closes out history/basket/settings popup
        setOpenPopup(!openPopup)
        setCurrentlyOpened("")
    }


    return (
        <div className="products-page">
            <div className="products-nav">
                <div className="segmented-control">
                    {/* controls whether delivery products or collection products are displayed */}
                    <button
                        className={showDelivery === true ? "active" : ""}
                        onClick={() => { setShowDelivery(true) }}>
                        Delivery
                    </button>
                    <button
                        className={showDelivery === false ? "active" : ""}
                        onClick={() => { setShowDelivery(false) }}>
                        Collection
                    </button>
                </div>

                <h1 className="products-title"> Currently Listed <br /> Products</h1>

                <div className="product-icons">
                    {/* contains each popup icon */}
                    <img src={HistoryIcon} className="product-page-icon" onClick={() => {
                        setOpenPopup(true);
                        setCurrentlyOpened("History");
                    }} />
                    <img src={BasketIcon} className="product-page-icon" onClick={() => {
                        setOpenPopup(true);

                        setCurrentlyOpened("Basket");
                    }} />
                    <img src={settingsIcon} className="product-page-icon" onClick={() => {
                        setOpenPopup(true);
                        setCurrentlyOpened("Settings");
                    }} />

                </div></div>

            <ProductsGrid delivery={showDelivery} />

            {/* displays popup only when it is true, meaning onclick */}
            {openPopup ? <Popups togglePopups={togglePopup} openedPopup={CurrentlyOpened} /> : null}
        </div>
    )
}

function ProductsGrid({ delivery }) {

    const { ListedProducts } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        // instantly renders this so that it is there when the user loads the page or clicks another button on the segmented control
        if (delivery) {
            setFilteredProducts(
                ListedProducts.filter((products) => products.order_type === "DeliveryOnly" || products.order_type === "Both")
            )
        }
        else {
            setFilteredProducts(
                ListedProducts.filter((products) => products.order_type === "CollectionOnly" || products.order_type === "Both")
            )
        }
    }, [ListedProducts, delivery])

    return (
        <div className="products-section">

            {
                filteredProducts.map((product, key) => {
                    return (
                        <ProductDetails  key={product["product_ID"]} ProductName={product["product_name"]} ProductPrice={product["cost_per_unit"]} ProductQuantity={product["quantity_avaliable"]} ProductID={product["product_ID"]} producerID={product["producers_ID"]} />
                    )
                })}

        </div>
    )


}
function ProductDetails({ ProductName, ProductPrice, ProductQuantity, ProductID, producerID }) {

    const [chosenQuantity, setChosenQuantity] = useState(1)
    const [success, setSuccess] = useState(false)
    const { setCurrentBasket, currentBasket } = useBasket()
    

    function increaseQuantity() {
        // increases  quantity
        if (chosenQuantity < ProductQuantity) {
            setChosenQuantity(chosenQuantity + 1)
        }
    }
    function decreaseQuantity() {
        // decreases  quantity

        if (chosenQuantity > 1) {
            setChosenQuantity(chosenQuantity - 1)
        }
    }

    let addToBasket = {
        "product_name": ProductName,
        "quantity": chosenQuantity,
        "cost": Number((ProductPrice * chosenQuantity).toFixed(2)),
        "product_id": ProductID,
        "Producer_ID": producerID
    }

    return (
        <div className="product-container">
            <h2 className="product-name"> {ProductName} </h2>
            <div className="image-box" />

            <div className="product-information">
                <p className="quantity-display"> Quantity Avaliable: {ProductQuantity} </p>
                <p className="price-display"> Price: £{Number((chosenQuantity * ProductPrice)).toFixed(2)}</p>
            </div>
            <div className="quantity-control">
                <button className="decrement" onClick={decreaseQuantity}> - </button>
                <p className="selected-quantity"> {chosenQuantity} </p>
                <button className="increment" onClick={increaseQuantity}> + </button>
            </div>
            <button className="append-basket" onClick={() => {
                setCurrentBasket(prevList => [...prevList, addToBasket]); //adds this to the basket
                setSuccess(true)
            }}>  Add to basket </button>
            {success ? <p className="success-msg"> Added Product to basket! </p> : null}
        </div>
    )
}
function Popups({ togglePopups, openedPopup }) {
    const [currentPopup, setCurrentPopup] = useState("")

    // decides which popup is displayed as soon as it is opened
    useEffect(() => {
        if (openedPopup === "History") {
            setCurrentPopup(<HistoryPopup />)
        }
        else if (openedPopup === "Settings") {
            setCurrentPopup(<SettingsPopup />)
        }
        else if (openedPopup === "Basket") {
            setCurrentPopup(<BasketPopup />)
        }
    }, [])

    return (
        <div className="background-blurr">
            <div className="Popup-section">
                <div className="popup-nav">
                    <h1> {openedPopup} Section </h1>
                    <img src={CloseIcon} className="close-icon" onClick={togglePopups} />
                </div>
                {currentPopup}
            </div>
        </div>
    )
}

function HistoryPopup() {
    const { userOrderHistory } = useProducts()

    if (!userOrderHistory || userOrderHistory.length === 0) {
        return <p> No previous orders! </p> // Displays when there is no items within userOrderHistory
    }

    else {
        return (
            <div className="history-section">

                {
                    // loops through the whole list 
                    userOrderHistory.map((orderItem, key) => {
                        return (
                            <DisplayingProduct ProductName={orderItem["product_ID"]} ProductID={orderItem["product_id"]} ProductPrice={orderItem["total_cost"]} ProductQuantity={orderItem["quantity"]} deleteHidden={true} />
                        )
                    })
                }
            </div>
        )
    }
}
function BasketPopup() {

    const { userID, signedInStatus } = useUser()
    const { setCurrentBasket, currentBasket } = useBasket()
    const navigate = useNavigate()

    function sendingOrder(name, quantity, cost, productID, producerID) {
        const URL = `https://greenfieldlocalhub.onrender.com/orders/sending_order`
        let orderData = {
            "productName": name,
            "quantity": quantity,
            "cost": cost,
            "product_ID": productID,
            "userID": userID,
            "producerID": producerID,
        }

        if (signedInStatus === false || userID === "") { //makes user sign in befre heading to checkout
            navigate("/Account")
        } 
        else {
            axios.post(URL, orderData) //sends data to backend
                .then(() => {
                    setCurrentBasket([]) //resets list upon successful send
                    navigate("/")

                })
                .catch(() => {
                    alert("error, something went wrong. Please try again later")
                })
        }


    }
    if (currentBasket.length != 0) { //displays only when there is 1+ items in list
        return (
            <div className="basket-menu-container">
                <div className="basket-container">
                    {
                        currentBasket.map((orderItem, key) => {
                            return (
                                // loops through the whole list 
                                <DisplayingProduct key={orderItem["product_id"]} ProductName={orderItem["product_name"]} ProductID={orderItem["product_id"]} ProductPrice={orderItem["cost"]} ProductQuantity={orderItem["quantity"]} deleteHidden={false} />
                            )
                        })

                    }   
                </div>
                <button className="checkout"
                    onClick={() => {
                        // sends each induvidual item in the list to the sendingorder function which sends it to the database
                        currentBasket.forEach((orderData, key) => {
                            sendingOrder(orderData.product_name, orderData.quantity, orderData.cost, orderData.product_id, orderData.Producer_ID)
                        })
                    }}> Head to Checkout </button>
            </div>
        )
    }
    else {
        return <p> No items in basket...</p>
    }
}
function SettingsPopup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const navigate = useNavigate()
    const { setSignedInStatus, setUserRole, setUserID, userID } = useUser()

    function ModifyAccount(event) {
        event.preventDefault() // stops page from being refreshed upon success
        setError("")
        setSuccess("")

        const url = `https://greenfieldlocalhub.onrender.com/accounts/updating_Details`
        let userDetails = {
            "email": email,
            "password": password,
            "user_ID": userID
        }

        function handleSuccess() {
            setSuccess("Successfully Updated Account Details!") //confirmation message
        }
        function handleError(err) {
            setError(err.response?.data?.detail) //error message
        }

        axios.patch(url, userDetails)
            .then(handleSuccess)
            .catch(handleError)

    }

    function deleteUser() {
        setError("")
        setSuccess("")
        const url = `https://greenfieldlocalhub.onrender.com/accounts/delete_account?userID=${userID}`
        axios.delete(url)
            .then(() => {
                setSignedInStatus(false)
                setUserRole("")
                setUserID("")
                navigate("/Account")
            })
            .catch(() => {
                setError("Something went wrong, could not delete account")
            })
    }
    if (userID === "") {
        return <p> Please sign in to access the settings menu</p>
    }
    else {
        return (
            <>
                <form onSubmit={ModifyAccount}>
                    <label> Email:
                        <input type="email" onChange={(e) => setEmail(e.target.value)} /></label>
                    <label> Password:
                        <input type="password" onChange={(e) => setPassword(e.target.value)} /></label>
                    <button type="submit" > Submit </button>
                    {error ? <h3 className="error-message"> {error} </h3> : null}
                    {success ? <h3 className="success-message"> {success} </h3> : null}
                    <button className="delete-account" onClick={deleteUser}> DELETE ACCOUNT </button>
                </form>

            </>
        )
    }
}
export function DisplayingProduct({ ProductName, ProductPrice, ProductQuantity, ProductID, deleteHidden }) {
    const { setCurrentBasket, currentBasket } = useBasket()
    function removingItem() { //takes item out of list
        setCurrentBasket(
            currentBasket.filter((Product) => Product.product_id != ProductID)
        )
    }
    let imgClassName = "product-icon" 
    if (deleteHidden) {
        imgClassName = "hide-delete"
    }

    return (
        <div className="products-display">
            <div className="product-details">
                <p className="product-information"> {ProductName} </p>
                <p className="product-information"> Quantity: {ProductQuantity} </p>
                <p className="product-information"> £{ProductPrice} </p>
            </div>
            <img src={DeleteIcon} className={imgClassName} onClick={removingItem} /> 
        </div>
    )
}