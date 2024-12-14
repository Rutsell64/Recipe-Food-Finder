import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Footer.module.css"; // Assuming you're using CSS Modules

function Footer() {

    return (
        <footer className={styles.Footer}>
            <div className = {styles.FooterContent}>  
                 {/* ChefSearch Section */}
                <div className={styles.FooterLink1}>
                    <h1>ChefSearch</h1>
                    <a>Discover Recipes Tailored Just for You</a>
                </div>
                
                {/* Quick Links Section */}
                <div className={styles.FooterLink2}>
                    <h1>Quick Links</h1>
                    <Link to="/">Home</Link>
                    <Link to="/about-us">About Us</Link>
                    <Link to="/contact-us">Contact</Link>
                    <Link to="/privacy-policy">Privacy Policy</Link>
                </div>

                {/* Social Links (Optional) */}
                <div className={styles.FooterLink3}>
                    <h1>Follow Us</h1>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
            </div>   
            
            <div className = {styles.Copyright}>
                <p>&copy; 2024 ChefSearch. All rights reserved.</p>
            </div>
                
        </footer>
    );
}

export default Footer;