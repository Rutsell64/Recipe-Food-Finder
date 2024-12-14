import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "../Styles/Login.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LogoImage from "../Assets/TastyTaleLogo.png";
import { Link } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            navigate("/profile"); // Redirect to profile
        } catch (err) {
            console.error("Login error:", err);
            setError("Invalid email or password.");
        }
    };

    return (
        <>
            <Header />
            <div className={styles.LoginBorder}>
                <img src={LogoImage} alt="Tasty Tale Logo" className={styles.logoImage} />
                <h1>Welcome Back! Sign in to ChefSearch</h1>
                <p>New to ChefSearch? <Link to="/sign-up">Sign up here</Link></p>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className={styles.FormGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.FormGroup}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default Login;
