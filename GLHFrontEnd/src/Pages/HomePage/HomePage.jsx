import "./HomePage.css"
import { useUser } from "../../Contexts/UserContexts"
import HomePageVideo from "../../assets/HomePageVideo.mp4"
import FarmerOnePicture from "../../assets/FarmerOnePicture.jpg"
import Farmer2Picture from "../../assets/Farmer2Picture.jpg"
import Farmer3Picture from "../../assets/Farmer3Picture.webp"
import Farmer4Picture from "../../assets/Farmer4Picture.avif"
import FrontArrow from "../../assets/FrontArrow.png"
import BackArrow from "../../assets/BackArrow.png"

import { useState } from "react"

export default function HomePage() {

    const { signedInStatus, userRole, userID } = useUser()
    return (
        <>
            <div className="Home-page-container">
                <video autoPlay muted loop playsInline className="home-video">
                    <source src={HomePageVideo} type="video/mp4" />

                </video>
                <span className="home-title"> <h2> Greenfield Local Hub </h2>
                    <h3> Where product meets magic </h3></span>

                <div className="about-us">
                    <h2> Who are we? </h2>
                    <p> Greenfield local hub are a cooperative of local farmers and food producers! We offer our retail localtion, locally produced food and drinks, stock control for our team, and will now be delivering products with this system!<br />Come visit us!</p>
                </div>

                <SlideshowSection />
                <OurTeam />


            </div>
        </>
    )
}

function SlideshowSection() {
    
    //Array of images >>>
    const images = [
        "https://fixcom-g4bhetdmcgd9b7er.z01.azurefd.net/assets/content/15552/chains-vs-independents.png",
        "https://us.noharm.org/sites/default/files/styles/max_1300x1300/public/Menu%20of%20Change%20infographic%202020-21_v2.png?itok=QOnmCf4o",
        "https://csuxjmfbwmkxiegfpljm.supabase.co/storage/v1/object/public/blog-images/organization-1873/1755649045100_Infographic-comparing-carbon-footprint-of-local-and-imported-produce_lTNR4MQrIUwP0KtTW492G.png",
    ]
    
    // State variable is set to 0 = the first index in our array >>> 
    const [nextIndex, setNextIndex] = useState(0);
    
    //Update "images" to your array name >>>
    const arrayLength = images.length;
    
    //onClick function to move "forward" one instance in our array
    function handleForwardClick() {
        if (nextIndex < arrayLength - 1) {
            setNextIndex(nextIndex + 1);
        } else {
            setNextIndex(0);
        }
    }
    
    //onClick function to move "backward" one instance in memory 
    function handleBackClick() {
        if (nextIndex > 0) {
            setNextIndex(nextIndex - 1);
        } else {
            setNextIndex(arrayLength - 1);
        }
    };
    
    //Below is our display>>>
    return (
        <div id="slideshow-container">
            <div id="slideshow-image">
                <img style={{ width: 500 }} src={images[nextIndex]} alt="benifits of buying locally produced" ></img>
            </div>
            <div id="arrows">
                <img onClick={handleBackClick} src={BackArrow} alt="back arrow" style={{ width: 50 }}></img>
                <img onClick={handleForwardClick} src={FrontArrow} alt="back arrow" style={{ width: 50 }}></img>
            </div>
        </div>
    )
}

function MemberBiographyBox({ name, role, text, image }) {
    
    
    return (
        <div className="member-box">

            <img src={image} alt="Picture of the member" className="famer-image" />

            <div className="member-information">
                <h3> {name} </h3>
                <h4> {role} </h4>
                <p> {text} </p>
            </div>
        </div>
    )
}

function OurTeam() {

    return (
        <div className="our-team">
            <h2 className="team-box-title"> Meet our team! </h2>

            <MemberBiographyBox image={FarmerOnePicture} name="MRS farmer" role="Farmer" text=" Hello! My name is Mrs farmer and i have been ehre for 15 years! My method of growing is that i plant them! I produce vegetables" />
            <MemberBiographyBox image={Farmer2Picture} name="MR farmer" role="Owner" text=" Hello! My name is Mr farmer and i have been owned Greenfield local hub for 25 years!" />
            <MemberBiographyBox image={Farmer3Picture} name="MRS Tractor Lady" role="tractor lady" text=" Hello! my name is Mrs tracktor and i have been lived at Greenfield local hub for 8 years! I grow plants by fres soil and daily watering! thats my method hahaha." />
            <MemberBiographyBox image={Farmer4Picture} name="Mr farmer" role="Products maintainer" text=" Hello! my name is Mr Farmer and i have been working at  Greenfield local hub for 2 years!" />

        </div>
    )
}