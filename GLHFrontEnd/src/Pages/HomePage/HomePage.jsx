import "./HomePage.css"
import { useUser } from "../../Contexts/UserContexts"
import HomePageVideo from "../../assets/HomePageVideo.mp4"
import FarmerOnePicture from "../../assets/FarmerOnePicture.jpg"
import Farmer2Picture from "../../assets/Farmer2Picture.jpg"
import Farmer3Picture from "../../assets/Farmer3Picture.webp"
import Farmer4Picture from "../../assets/Farmer4Picture.avif"

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

                <SlideshowSection/>
                <OurTeam />


            </div>
        </>
    )
}


function OurTeam() {

    return (
        <div className="our-team">
            <h2 className="team-box-title"> Meet our team! </h2>

            <MemberBiographyBox image={FarmerOnePicture} name="MRS farmer" role="Farmer" text=" Hello! my name is Mrs farmer and i have been ehre for 15 years! I produce vegetables" />
            <MemberBiographyBox image={Farmer2Picture} name="MR farmer" role="Owner" text=" Hello! my name is Mr farmer and i have been owned Greenfield local hub for 25 years!" />
            <MemberBiographyBox image={Farmer3Picture} name="MRS Tractor Lady" role="tractor lady" text=" Hello! my name is Mrs trakter and i have been lived at Greenfield local hub for 8 years!" />
            <MemberBiographyBox image={Farmer4Picture} name="Mr farmer" role="Products maintainer" text=" Hello! my name is Mr Farmer and i have been working at  Greenfield local hub for 2 years!" />

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


function SlideshowSection() {


    return (
        <>
            <div className="slideshow-container">
                {/* 
        <!-- Full-width images with number and caption text --> */}
                <div className="mySlides fade">
                    <div className="numbertext">1 / 3</div>
                    
                    <div className="text">Caption Text</div>
                </div>

                <div className="mySlides fade">
                    <div className="numbertext">2 / 3</div>
                    <img src={FarmerOnePicture}  />
                    <div className="text">Caption Two</div>
                </div>

                <div className="mySlides fade">
                    <div className="numbertext">3 / 3</div>
                    <img src={FarmerOnePicture}  />
                    <div className="text">Caption Three</div>
                </div>

                {/* <!-- Next and previous buttons --> */}
                <a className="prev" onclick="plusSlides(-1)">&#10094;</a>
                <a className="next" onclick="plusSlides(1)">&#10095;</a>
            </div>
            <br />

            {/* <!-- The dots/circles --> */}
            <div className="text-align:center">
                <span className="dot" onclick="currentSlide(1)"></span>
                <span className="dot" onclick="currentSlide(2)"></span>
                <span className="dot" onclick="currentSlide(3)"></span>
            </div>
        </>
    )
}