import "./AccountPage.css"
import AccountPageImage from "../../assets/AccountPageImage.jpg"
import { useState } from "react"
import { useNavigate } from "react-router"
import { useUser } from "../../Contexts/UserContexts"
import axios from "axios"

export default function AccountPage() {

    return (
        <div className="account-page-container">
            {/* displays an image for screens big enough, and the account form */}
            <span className="image-container"> <img src={AccountPageImage} alt="Image of a field" /> </span> 
            <span className="form-container"> <AccountComponent /> </span>
        </div>
    )
}

function AccountComponent() {

    const [showRegister, setShowRegister] = useState(true)

    function toggleForm() {
        // changes which form is displayed
        setShowRegister(!showRegister)
    }

    return (
        <>
            {showRegister ? <SignUpBox toggle={toggleForm} /> : <SignInBox toggle={toggleForm} />}
        </>
    )
}

function SignUpBox({ toggle }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [accountRole, setAccountRole] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { setSignedInStatus, setUserRole, setUserID } = useUser()

    function StoringSignUp(event) {
        event.preventDefault() //stops page from refreshing
        setError("")

        const url = `http://127.0.0.1:8001/accounts/creating_account`
        let userDetails = {
            "email": email,
            "password": password,
            "confirm_password": confirmPassword,
            "role": accountRole
        }

        function handleSuccess(res) {
            setUserRole(accountRole)
            setSignedInStatus(true)
            setUserID(res?.data)
            navigate("/")
        }
        function handleError(err) {
            setError(err.response?.data?.detail)
        }

        axios.post(url, userDetails) //sends data to backend
            .then(handleSuccess)
            .catch(handleError)

    }

    return (
        <>
            <div className="account-box-container">
                <h1> Sign up! </h1>

                <form onSubmit={StoringSignUp}>
                    <label> Email:
                        <input type="email" onChange={(e) => setEmail(e.target.value)} /></label>
                    <label> Password:
                        <input type="password" onChange={(e) => setPassword(e.target.value)} /></label>
                    <label> Confirm Password:
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} /></label>
                    <label> Role:
                        <select onChange={(e) => setAccountRole(e.target.value)} required value={accountRole}>
                            <option hidden disabled> </option>
                            <option value="Producer" > Producer </option>
                            <option value="Consumer" > Consumer </option>
                        </select>
                    </label>
                    <button type="submit" > Submit </button>

                    {error ? <h3 className="error-message"> {error} </h3> : null}
                </form>

                <p className="form-changer" onClick={toggle}> Click here if you wish to change forms </p>
            </div>
        </>
    )


}



function SignInBox({ toggle }) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const { setSignedInStatus, setUserRole, setUserID } = useUser()

    function StoringSignIn(event) {
        event.preventDefault() // stops refreshing
        setError("")

        const url = `http://127.0.0.1:8001/accounts/login`
        let userDetails = {
            "email": email,
            "password": password,
        }

        function handleSuccess(res) {
            setUserRole(res?.data?.role)
            setSignedInStatus(true)
            setUserID(res?.data?.user_ID)
            navigate("/")
        }
        function handleError(err) {
            setError(err.response?.data?.detail)
        }

        axios.post(url, userDetails) // sends data to backend
            .then(handleSuccess)
            .catch(handleError)

    }

    return (
        <>
            <div className="account-box-container">
                <h1> Sign In! </h1>

                <form onSubmit={StoringSignIn}>
                    <label> Email:
                        <input type="email" onChange={(e) => setEmail(e.target.value)} /></label>
                    <label> Password:
                        <input type="password" onChange={(e) => setPassword(e.target.value)} /></label>
                    <button type="submit" > Submit </button>

                    {error ? <h3 className="error-message"> {error} </h3> : null}
                </form>

                <p className="form-changer" onClick={toggle}> Click here if you wish to change forms </p>
            </div>
        </>
    )


}