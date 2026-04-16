import "./Footer.css"
import { Link } from "react-router"


export default function Footer() {
    return (

        <div className="footer-container">
            {/* Footer Title */}
            <h2> Greenfield Local Hub </h2>

            {/* Link box 1 */}
            <div className="LinkBox">
                <h3> Useful Links </h3>
                <Link to="/"> Home </Link>
                <Link to="/Products"> Products </Link>
                <Link to="/Accounts"> Accounts </Link>
            </div>

            {/* Link box 2 */}
            <div className="LinkBox">
                <h3> Our policies </h3>
                <Link to="/"> Terms and conditions </Link>
                <Link to="/"> Privacy Policy </Link>
                <Link to="/"> Cookies </Link>
            </div>
        </div>
    )
}