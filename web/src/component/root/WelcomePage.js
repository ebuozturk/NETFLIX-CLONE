import React from 'react'
import {
    logo, tv, mobile, devicePile, kids, boxShot, downloandIcon
} from "../../img"
import { useHistory } from "react-router-dom";
import "./welcomepage.css"
import LoginPage from "../Login/LoginPage"
import EmailFormBig from '../Signup/EmailFormBig';
import bgImg from "../../img/US-en-20210719-popsignuptwoweeks-perspective_alpha_website_large.jpg"
export default function WelcomePage({ loginPage }) {
    let history = useHistory()

    return (
        <div className="welcome-body"

        >
            <div className="background-img"
                style={{
                    backgroundImage: `url("${bgImg}")`
                    // backgroundImage: `url("https://i.pinimg.com/originals/41/6a/7f/416a7fd4720a3c0dbd38c17f3ac8e0c1.jpg")`

                }}
            >

            </div>
            <div className="welcome-header">
                <img src={logo} alt="logo" onClick={() => history.push("/")}
                    style={{
                        cursor: "pointer"
                    }}
                />



                <button
                    style={{
                        backgroundColor: "#e50914",
                        color: "white",
                        width: "84px",
                        height: "34px",
                        borderRadius: "4px",
                        textAlign: "center",
                        display: `${loginPage ? "none" : "block"}`
                    }}
                    onClick={() => history.push('/login')}
                >Sign In</button>

            </div>
            {
                loginPage ? <LoginPage />
                    : (
                        <>
                            <div className="story-cards" >

                                <div>
                                    <h1>Unlimited movies, TV shows, and more.</h1>
                                    <h2>Watch anywhere. Cancel anytime.</h2>
                                    <EmailFormBig />

                                </div>

                            </div>

                            <div className="our-story-card">
                                <div className="animation-card">
                                    <div className="our-story-card-text">
                                        <h1 className="our-story-card-title">Enjoy on your TV.</h1>
                                        <h2 className="our-story-card-subtitle">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</h2>
                                    </div>
                                    <div className="our-story-card-img-container">
                                        <div className="our-story-card-animation-container">
                                            <img src={tv} alt="" className="our-story-card-img" />

                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="our-story-card">
                                <div className="animation-card">
                                    <div className="our-story-card-img-container">
                                        <div className="our-story-card-animation-container">
                                            <img src={mobile} alt="" className="our-story-card-img" />
                                            <div className="our-story-card-animation">
                                                <img src={boxShot} alt="boxshot" className="our-story-card-animation-img" />
                                                <div className="our-story-card-animation-text-content">
                                                    <h1 className="our-story-card-animation-title">
                                                        Stranger Things

                                                    </h1>
                                                    <p className="our-story-card-animation-text">
                                                        Downloading...
                                                    </p>
                                                </div>
                                                <img src={downloandIcon} alt="download" className="our-story-card-animation-icon" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="our-story-card-text">
                                        <h1 className="our-story-card-title">Download your shows to watch offline.</h1>
                                        <h2 className="our-story-card-subtitle">Save your favorites easily and always have something to watch.</h2>
                                    </div>

                                </div>

                            </div>
                            <div className="our-story-card">
                                <div className="animation-card">

                                    <div className="our-story-card-text">
                                        <h1 className="our-story-card-title">Watch everywhere.</h1>
                                        <h2 className="our-story-card-subtitle">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV without paying more.</h2>
                                    </div>
                                    <div className="our-story-card-img-container">
                                        <div className="our-story-card-animation-container">
                                            <img src={devicePile} alt="" className="our-story-card-img" />

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="our-story-card">
                                <div className="animation-card">
                                    <div className="our-story-card-img-container">
                                        <div className="our-story-card-animation-container">
                                            <img src={kids} alt="" className="our-story-card-img" />

                                        </div>
                                    </div>
                                    <div className="our-story-card-text">
                                        <h1 className="our-story-card-title">Create profiles for kids.
                                        </h1>
                                        <h2 className="our-story-card-subtitle">Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</h2>
                                    </div>

                                </div>

                            </div>
                        </>
                    )
            }



        </div>
    )
}
