import { useState } from "react"
import "./Cookies.css"

export default function Cookies() {

    const [cookieClassname, setCookieClassname] = useState("cookies-container")
    return (
        <div className={cookieClassname}>
            <h1> Cookies Settings! </h1>
            We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better expe-rience. By clicking accept, you agree to this, as outlined in our Cookie Policy

            <div className="buttons-section">
                <button onClick={() => { setCookieClassname("cookies-container hide-cookies") }}> Accept </button>
                <button onClick={() => { setCookieClassname("cookies-container hide-cookies") }}> Preferences </button>
            </div>
        </div>
    )
}