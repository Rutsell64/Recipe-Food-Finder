import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { getAuth, signOut } from "firebase/auth"; // Import Firebase auth functions
import styles from "../Styles/Header2.module.css"; // Assuming you're using CSS Modules
import LogoImage from "../Assets/TastyTaleLogo.png"; // Assuming you have a logo image

function Header2() {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate(); // Initialize navigate function

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth); // Sign out the user
            navigate("/"); // Redirect to the HomePage
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <header className={styles.header}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <img src={LogoImage} alt="Tasty Tale Logo" className={styles.logoImage} />
                    <p><Link to="/dashboard" onClick={() => setMenuOpen(false)}>ChefSearch</Link></p>
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
                        <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                    </li>
                    <li>
                        <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/recipes" onClick={() => setMenuOpen(false)}>Recipes</Link>
                    </li>
                    <li>
                        <Link to="/support" onClick={() => setMenuOpen(false)}>Support</Link>
                    </li>
                    <li>
                    <Link to="/" 
                        onClick={(e) => {
                            e.preventDefault(); 
                            setMenuOpen(false); // Close the menu
                            handleLogout(); // Trigger the logout functionality
                        }}
                    >
                        Log Out
                    </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header2;