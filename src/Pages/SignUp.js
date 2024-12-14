import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore"; // Use setDoc for explicit Firestore writes
import { auth, db } from "../firebaseConfig"; // Import Firebase auth and Firestore
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import styles from "../Styles/SignUp.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import LogoImage from "../Assets/TastyTaleLogo.png"; // Assuming you have a logo image
import { Link } from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phoneNumber: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create user in Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email.toLowerCase(),
                formData.password
            );

            const user = userCredential.user;

            // Save additional user data to Firestore
            await setDoc(doc(db, "users", user.uid), {
                fullName: formData.fullName,
                email: formData.email.toLowerCase(), // Store email in lowercase
                phoneNumber: formData.phoneNumber,
            });

            alert("Account created successfully!");

            // Reset form fields
            setFormData({
                fullName: "",
                email: "",
                password: "",
                phoneNumber: "",
            });

            // Redirect to the dashboard page
            navigate("/profile");
        }catch (error) {
            console.error("Error creating account:", error.message);
            alert(`Failed to create account: ${error.message}`);
        }
    };

    return (
        <>
            <Header />

            <div className={styles.SignUpBorder}>
                <img src={LogoImage} alt="Tasty Tale Logo" className={styles.logoImage} />
                <h1>Get started with your account</h1>
                <p>Explore the world of ChefSearch and find recipes for you!</p>
                <form onSubmit={handleSubmit}>
                    <div className={styles.FormGroup}>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

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

                    <div className={styles.FormGroup}>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            placeholder="Enter your phone number"
                            pattern="[0-9]{10}"
                            title="Phone number should be in the format: 1234567890"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <button type="submit">Sign up</button>
                    </div>

                    <div>
                        <Link to="/login">Already have an account?</Link>
                    </div>
                </form>
            </div>

            <Footer />
        </>
    );
}

export default SignUp;
