import React, { useRef } from "react";
import styles from "../Styles/AboutUs.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import AboutUsPic1 from "../Assets/AboutUsPic1.jpg";
import AboutUsPic2 from "../Assets/AboutUsPic2.jpg";
import AboutUsPic3 from "../Assets/AboutUsPic3.jpg";
import AboutUsPic4 from "../Assets/AboutUsPic4.jpg";
import AboutUsPic5 from "../Assets/AboutUsPic5.jpg";
import AboutUsPic6 from "../Assets/AboutUsPic6.jpg";
import AboutUsPic7 from "../Assets/AboutUsPic7.jpg";
import { Link } from "react-router-dom";

function AboutUs(){
   
    return (
        <>
            <Header></Header> 

            <div className = {styles.Section1}>
                <div className = {styles.Section1Content}>
                    <div className = {styles.Section1TextContent}>
                        <h1>About Us</h1>
                        <p>At ChefSearch, our passion for food is as carefully curated as the recipes we share. We're crafted to create a seamless and enjoyable cooking experience, just like the meals you'll discover.</p>
                    </div>
                    <div className = {styles.Section1ImageContent}>
                        <img src = {AboutUsPic1} alt="About Us Pic 1"></img>
                    </div>
                </div>
            </div>

            <div className = {styles.Section2}>
                <div className = {styles.Section2Content}>
                    <div className = {styles.Section2ImageContent}>
                        <img src = {AboutUsPic2} alt="About Us Pic 2"></img>
                    </div>
                    <div className = {styles.Section2TextContent}>
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is simple: to inspire and empower people to cook with confidence and creativity. We believe that everyone can enjoy great food, regardless of their skill level, dietary restrictions, or busy schedule. ChefSearch is here to make cooking fun, accessible, and rewarding for everyone.
                        </p>
                    </div> 
                </div>
            </div>

            <div className = {styles.Section3}>
                <div className = {styles.Section3Content}>
                    <div className = {styles.Section3ImageContent}>
                        <img src = {AboutUsPic3} alt="About Us Pic 3"></img>
                    </div>
                    <div className = {styles.Section3TextContent}>
                        <h2>Our Story</h2>
                        <p>
                            ChefSearch started with a passion for food and a desire to make cooking easier for everyone. What began as a small project to share personalized recipe recommendations has grown into a thriving platform where food lovers can explore new dishes, improve their cooking skills, and enjoy the process of creating meals at home.
                        </p>
                    </div>
                 </div>
            </div>

            <div className = {styles.Section4}>
                <div className = {styles.Section4Title}>
                    <h2>Join the ChefSearch Community</h2>
                </div>
                
                <div className = {styles.Section4Content}>
                    <div className = {styles.Section4Content1}>
                        <img src = {AboutUsPic4} alt="About Us Pic 4"></img> 
                        <h2>10 Global Offices</h2>
                        <Link to="/contact-us">Learn more</Link>
                    </div>
                    <div className = {styles.Section4Content2}>
                       <img src = {AboutUsPic5} alt="About Us Pic 5"></img>
                        <h2>10,000+ Employees</h2>
                        <Link to="/contact-us">Learn more</Link>
                    </div>
                    <div className = {styles.Section4Content3}>
                        <img src = {AboutUsPic6} alt="About Us Pic 6"></img>
                        <h2>100,000+ Customers</h2>
                        <Link to="/contact-us">Learn more</Link>
                    </div>
                </div>
            </div>

            <div className = {styles.Section5}>
                <div>
                    <div className = {styles.Section5TextContent}>
                        <h2>Ready to Start Cooking?</h2>
                        <p> Start exploring personalized recipes today and take your cooking to the next level. <a href="/sign-up">Sign up now</a> and discover a world of delicious meals tailored just for you.</p>
                    </div>
                    <div className = {styles.Section5ImageContent}>
                        <img src = {AboutUsPic7} alt="About Us Pic 7"></img>
                    </div>
                </div>
            </div>

            <Footer></Footer>
            
        </>
    );
}

export default AboutUs;