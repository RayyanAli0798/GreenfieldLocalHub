import { useState } from "react"
import SettingsIcon from "../../assets/SettingsIcon.png"
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


export default function ProductPage() {
    const [showDelivery, setShowDelivery] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    const [CurrentlyOpened, setCurrentlyOpened] = useState("")

    function togglePopup() {
        setOpenPopup(!openPopup)
        setCurrentlyOpened("")
    }


    return (
        <div className="products-page">
            <div className="products-nav">
                <div className="segmented-control">
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
                    <img src={HistoryIcon} className="product-page-icon" onClick={() => {
                        setOpenPopup(true);
                        setCurrentlyOpened("History");
                    }} />
                    <img src={BasketIcon} className="product-page-icon" onClick={() => {
                        setOpenPopup(true);

                        setCurrentlyOpened("Basket");
                    }} />
                    <img src={SettingsIcon} className="product-page-icon" onClick={() => {
                        setOpenPopup(true);
                        setCurrentlyOpened("Settings");
                    }} />

                </div></div>

            <ProductsGrid delivery={showDelivery} />

            {openPopup ? <Popups togglePopups={togglePopup} openedPopup={CurrentlyOpened} /> : null}
        </div>
    )
}

function ProductsGrid({ delivery }) {

    const { ListedProducts } = useProducts();
    console.log(ListedProducts)
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
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
                        <ProductDetails ProductName={product["product_name"]} ProductPrice={product["cost_per_unit"]} ProductQuantity={product["quantity_avaliable"]} ProductID={product["product_ID"]} producerID={product["producers_ID"]} />
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
        if (chosenQuantity < ProductQuantity) {
            setChosenQuantity(chosenQuantity + 1)
        }
    }
    function decreaseQuantity() {
        if (chosenQuantity > 1) {
            setChosenQuantity(chosenQuantity - 1)
        }
    }

    let addToBasket = {
        "product_name": ProductName,
        "quantity": ProductQuantity,
        "cost": ProductPrice * chosenQuantity,
        "product_id": ProductID,
        "Producer_ID": producerID
    }

    return (
        <div className="product-container">
            <h2 className="product-name"> {ProductName} </h2>
            <div className="image-box" />

            <div className="product-information">
                <p className="quantity-display"> Quantity Avaliable: {ProductQuantity} </p>
                <p className="price-display"> Price: £{chosenQuantity * ProductPrice}</p>
            </div>
            <div className="quantity-control">
                <button className="decrement" onClick={decreaseQuantity}> - </button>
                <p className="selected-quantity"> {chosenQuantity} </p>
                <button className="increment" onClick={increaseQuantity}> + </button>
            </div>
            <button className="append-basket" onClick={() => {
                setCurrentBasket(prevList => [...prevList, addToBasket]);
                setSuccess(true)
            }}>  Add to basket </button>
            {success ? <p className="success-msg"> Added Product to basket! </p> : null}
        </div>
    )
}
function Popups({ togglePopups, openedPopup }) {
    const [currentPopup, setCurrentPopup] = useState("")

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

}
function BasketPopup() {

    const { setCurrentBasket, currentBasket } = useBasket()


    function sendingOrder(name, quantity, cost, productID, producerID) {
        const URL = ``
        const { userID, signedInStatus } = useUser()
        const navigate = useNavigate()
        let orderData = {
            "productName": name,
            "quantity": quantity,
            "cost": cost,
            "product_ID": productID,
            "userID": userID,
            "producerID": producerID,
        }

        if (signedInStatus === false) {
            navigate("/Account")
        }
        else {
            axios.post(URL, orderData)
                .then(() => {
                    navigate("/")
                })
                .catch(() => {
                    alert("error, something went wrong. Please try again later")
                })
        }


    }
    // return (

    //     {
    //         currentBasket.map((orderItem, key) => {
    //             return(
    //             <DisplayingProduct ProductName={orderItem["product_name"]} ProductPrice={orderItem["cost_per_unit"]} ProductQuantity={orderItem["quantity_avaliable"]} displayDelete={false} />
    //         )})
    //     }

    // )
}
function SettingsPopup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { setSignedInStatus, setUserRole, userID } = useUser()

    function ModifyAccount(event) {
        event.preventDefault()
        setError("")
        const navigate = useNavigate()

        const url = `http://127.0.0.1:8001/accounts/updating_Details`
        let userDetails = {
            "email": email,
            "password": password,
            "user_ID": userID
        }

        function handleSuccess() {
            navigate("/")
        }
        function handleError(err) {
            setError(err.response?.data?.detail)
        }

        axios.patch(url, userDetails)
            .then(handleSuccess)
            .catch(handleError)

    }

    function deleteUser(){
        const url = ``
        axios.delete( url)
        .then( ()=>{
            navigate("") 
        })
        .catch(() => {
            alert("something went wrong")
        })
    }
    return (
        <>
            <form onSubmit={ModifyAccount}>
                <label> Email:
                    <input type="email" onChange={(e) => setEmail(e.target.value)} /></label>
                <label> Password:
                    <input type="password" onChange={(e) => setPassword(e.target.value)} /></label>
                <button type="submit" > Submit </button>
                {error ? <h3 className="error-message"> {error} </h3> : null}
            </form>
            <button className="delete-account"> DELETE ACCOUNT </button>

        </>
    )
}
export function DisplayingProduct({ ProductName, ProductPrice, ProductQuantity, ProductID, displayDelete }) {
    const { setCurrentBasket, currentBasket } = useBasket()
    function removingItem() {
        setCurrentBasket(
            currentBasket.filter((Product) => Product.product_ID != ProductID)
        )
    }
    let imgClassName = "product-icon"
    if (displayDelete) {
        imgClassName = "delete-deleted"
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