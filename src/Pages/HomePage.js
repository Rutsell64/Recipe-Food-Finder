import React from "react";
import styles from "../Styles/HomePage.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import HeroImage from "../Assets/FoodHeroImage.jpg";
import FoodImage1 from "../Assets/FoodImage1.jpg";
import Section2Image1 from "../Assets/Section2Image1.jpg";
import Section2Image2 from "../Assets/Section2Image2.jpg";
import Section2Image3 from "../Assets/Section2Image3.jpg";
import { Link } from "react-router-dom";


function HomePage(){
    return(
        <>
            <Header/>

            <div className = {styles.HeroBanner}>
                <p>Discover Delicious Recipes <br/> Tailored Just for You</p>
                <img src={HeroImage} alt="Food Hero Banner"/>
                <Link to="/sign-up">Sign Up Today</Link>
            </div>



            <div className = {styles.Section1Border}>
                
                <h1>ChefSearch Goal</h1>

                <div className = {styles.Section1ImageBorder}>
                    <img src={FoodImage1} alt="Food Image 1"/>
                </div>

                <div className = {styles.Section1TextBorder}>
                    <p>Our goal is to help you explore a wide range of dishes tailored to your taste preferences,
                        dietary needs, and cooking skills. Whether you're a beginner looking for easy meals or 
                        a seasoned chef searching for culinary inspiration, ChefSearch provides a seamless experience 
                        to help you create memorable meals.
                    </p>
                </div>

            </div>

            <div className = {styles.Section2Border}>

                <h1>Why Choose ChefSearch?</h1>

                <div className = {styles.Section2Content}>

                    <div className = {styles.Section2BorderContent}>
                        <div>
                            <h2>Personalized Recipes</h2>
                        </div>
                        <div className = {styles.Section2Image1Border}>
                            <img src={Section2Image1} alt="Section 2 Image 1"/>
                        </div>
                        <div>
                            <p>Get recipe recommendations tailored to your taste and dietary preferences.</p>
                        </div>
                    </div>

                    <div className = {styles.Section2BorderContent}>
                        <div>
                            <h2>Time-Saving Recipes</h2>
                        </div>
                        <div>
                            <img src={Section2Image2} alt="Section 2 Image 2"/>
                        </div>
                        <div>
                            <p>Discover quick and easy recipes for those busy weeknights, all ready in under 30 minutes.</p>
                        </div>
                    </div>

                    <div className = {styles.Section2BorderContent}>
                        <div>
                            <h2>Save Your Favorites</h2>
                        </div>
                        <div>
                            <img src={Section2Image3} alt="Section 2 Image 3"/>
                        </div>
                        <div>
                            <p>Bookmark your favorite recipes to try again later, all in one place.</p>
                        </div>
                    </div>

                </div>

            </div>

            <div className = {styles.Section3Border}>
                
                <h1>How it works</h1>

                <div className={styles.HowItWorksContent}>
                    <p className = {styles.HowItWorksText1}>
                        <strong>Sign Up:</strong> Create an account to get started with personalized recipes.
                    </p>
                    <p className = {styles.HowItWorksText2}>
                        <strong> Set Preferences:</strong> Tell us about your dietary preferences and cooking skill level.
                    </p>
                    <p className = {styles.HowItWorksText3}>
                        <strong> Get Recipes:</strong> Receive delicious recipes tailored just for you!
                    </p>
                    
                </div>

            </div>
            
            <Footer/>

        </>
    )
}

export default HomePage;