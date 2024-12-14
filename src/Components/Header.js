import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/Header.module.css"; // Assuming you're using CSS Modules
import LogoImage from "../Assets/TastyTaleLogo.png"; // Assuming you have a logo image

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <img src={LogoImage} alt="Tasty Tale Logo" className={styles.logoImage} />
                    <p><Link to="/" onClick={() => setMenuOpen(false)}>ChefSearch</Link></p>
                </div>
                
                {/* Hamburger Icon for Mobile */}
                <div
                    className={`${styles.hamburger} ${menuOpen ? styles.menuOpen : ""}`}
                    onClick={toggleMenu}
                >
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>

                {/* Navigation Links */}
                <ul className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ""}`}>
                    <li>
                        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    </li>
                    <li>
                        <Link to="/about-us" onClick={() => setMenuOpen(false)}>About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact-us" onClick={() => setMenuOpen(false)}>Contact Us</Link>
                    </li>
                    {/* Added Sign Up and Login Links */}
                    <li>
                        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                    </li>
                    <li>
                        <Link to="/sign-up" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;