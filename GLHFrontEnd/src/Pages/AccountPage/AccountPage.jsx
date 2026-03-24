import "./AccountPage.css"
import AccountPageImage from "../../assets/AccountPageImage.jpg"
import { useState } from "react"

export default function AccountPage() {


    return (
        <div className="account-page-container">
            <span className="image-container"> <img src={AccountPageImage} alt="Image of a field" /> </span>
            <span className="form-container"> <AccountComponent /> </span>
        </div>
    )
}

function AccountComponent() {

    const [showRegister, setShowRegister] = useState(true)

    function toggle() {
        setShowRegister(!showRegister)
    }
    return (
        <>
            <SignUpBox toggle={toggle} />
        </>
    )
}

function SignUpBox(toggle) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [useRole, setUserRole] = useState("Consumer")
    const [error, setError] = useState("")

    function StoringSignUp() {
        e.preventDefault

    }



    return (
        <>
            <div className="account-box-container">
                <h1> Sign up! </h1>

                <form>
                    <label> Email:
                        <input type="email" onChange={(e) => setEmail(e.target.value)} /></label>
                    <label> Password:
                        <input type="password" onChange={(e) => setEmail(e.target.value)} /></label>
                    <label> Confirm Password:
                        <input type="password" onChange={(e) => setEmail(e.target.value)} /></label>
                    <label> Role:
                        <input type="email" onChange={(e) => setEmail(e.target.value)} /></label>

                    <button type="submit"> Submit </button>
                </form>

                Click here if you wish to change forms
            </div>
        </>
    )


}