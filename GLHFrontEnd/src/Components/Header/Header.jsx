import "./Header.css"
import GLHLogo from "../../assets/GLHLogo.png"
import { Link } from "react-router"
import { useUser } from "../../Contexts/UserContexts"
import MenuIcon from "../../assets/MenuIcon.png"
import { useState } from "react"



export default function Header() {

    const { signedInStatus, userRole, setUserRole, setSignedInStatus } = useUser()

    let defaultButtons = (
        <nav className="header-navigation-btns">
            <Link to="/"> Home </Link>
            <Link to="/Account"> Accounts </Link>
            <Link to="/products"> Products </Link>
        </nav>
    )
    let ProducerButtons = (
        <nav className="header-navigation-btns">
            <Link to="/"> Home </Link>
            <Link to="/Stock"> Stock Control </Link>
            <Link to="/products"> Products </Link>
            <Link to="/" onClick={() => { setSignedInStatus(false), setUserRole("") }}> Logout </Link>
        </nav>
    )
    let ConsumerButtons = (
        <nav className="header-navigation-btns">
            <Link to="/"> Home </Link>
            <Link to="/products"> Products </Link>
            <Link to="/" onClick={() => { setSignedInStatus(false), setUserRole("") }}> Logout </Link>
        </nav>
    )

    let SelectedButtons = defaultButtons
    // Conditions to change what buttons are displayed depending on the user
    if (signedInStatus && userRole == "Producer") {
        SelectedButtons = ProducerButtons
    }
    else if (signedInStatus && userRole == "Consumer") {
        SelectedButtons = ConsumerButtons
    }

    return (
        <>
            {/* Both headers to be displayed */}
            <DesktopHeader buttons={SelectedButtons} />
            <MobileHeader buttons={SelectedButtons} />
        </>)
}


function DesktopHeader({ buttons }) {

    return (
        <div className="header-container desktop">
            <img src={GLHLogo} alt="Our Logo" />
            {buttons}
        </div>
    )
}

function MobileHeader({ buttons }) {

    const [openMenu, setOpenMenu] = useState(false)

    // Opens and closes the menu
    function toggle() {
        setOpenMenu(!openMenu)
    }

    //Choses the classname for the menu to rotate it upon click
    let menuClassname = "menuIcon"
    if (openMenu == true) {
        menuClassname = "menuIcon open"
    }

    //will be displaed upon menu click
    let OpenedMenu = (
        <div className="mobile-buttons-view">
            {buttons}
        </div>
    )

    return (
        <div className="header-container Mobile">
            <img src={GLHLogo} alt="Our Logo" />
            <img src={MenuIcon} alt="Menu Button" className={menuClassname} onClick={toggle} />
            {openMenu ? OpenedMenu : null}
        </div>
    )
}