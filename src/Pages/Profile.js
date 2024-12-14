import React, { useState } from "react";
import styles from "../Styles/Profile.module.css";
import Header2 from "../Components/Header2";
import Footer2 from "../Components/Footer2";
import { useAuth } from "../Hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
    getAuth,
    updateEmail,
    reauthenticateWithCredential,
    EmailAuthProvider,
    sendEmailVerification,
    updatePhoneNumber,
    PhoneAuthProvider,
} from "firebase/auth";
import ProfileLogo from "../Assets/ProfileLogo.png";

function Profile() {
    const { user, loading } = useAuth();
    const auth = getAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "", // Add password for reauthentication
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        if (!user || !user.uid) return;

        // Validate inputs
        if (!formData.fullName.trim() || !formData.email.trim() || !formData.password.trim() || !formData.phoneNumber.trim()) {
            alert("All fields are required.");
            return;
        }

        // Validate phone number format
        const phoneRegex = /^[0-9]{10}$/; // Matches 10-digit numbers
        if (!phoneRegex.test(formData.phoneNumber)) {
            alert("Please enter a valid phone number (10 digits).");
            return;
        }

        try {
            // Reauthenticate user with the current password
            const credential = EmailAuthProvider.credential(auth.currentUser.email, formData.password);
            await reauthenticateWithCredential(auth.currentUser, credential);

            // Update email if it has changed
            if (formData.email !== auth.currentUser.email) {
                await updateEmail(auth.currentUser, formData.email);
                alert("Email updated. Please verify your new email address.");
                await sendEmailVerification(auth.currentUser); // Send verification email
            }

            // Update phone number if it has changed
            if (formData.phoneNumber !== user.phoneNumber) {
                const phoneAuthProvider = new PhoneAuthProvider(auth);
                const verificationId = await phoneAuthProvider.verifyPhoneNumber(formData.phoneNumber, window.recaptchaVerifier);
                const phoneCredential = PhoneAuthProvider.credential(verificationId, formData.password); // Assuming password for OTP
                await updatePhoneNumber(auth.currentUser, phoneCredential);
                alert("Phone number updated successfully.");
            }

            // Update user details in Firestore
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                fullName: formData.fullName || user.fullName,
                email: formData.email || user.email,
                phoneNumber: formData.phoneNumber || user.phoneNumber,
            });

            setIsEditing(false);
            alert("Profile updated successfully!");
            window.location.reload();
        } catch (error) {
            console.error("Error updating profile:", error);
            if (error.code === "auth/wrong-password") {
                alert("Incorrect password. Please try again.");
            } else if (error.code === "auth/operation-not-allowed") {
                alert("Email update not allowed. Verify your Firebase settings.");
            } else {
                alert("Failed to update profile. Please try again.");
            }
        }
    };

    const handleEdit = () => {
        setFormData({
            fullName: user.fullName || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            password: "", // Reset the password field
        });
        setIsEditing(true);
    };

    if (loading) {
        return <div>Loading your profile...</div>;
    }

    if (!user) {
        return <div>You are not logged in. Please log in to view your profile.</div>;
    }

    return (
        <>
            <Header2 />
            <div className={styles.Profile}>
                <div className={styles.ProfileLogoBorder}>
                    <img src={ProfileLogo} alt="Profile" />
                </div>
                <h1>Profile</h1>
                <hr/>
                {!isEditing ? (
                    <>
                        <div className={styles.ProfileDetails}>
                            <p><strong>Full Name:</strong> {user.fullName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
                        </div>
                        <div className={styles.EditButtonBorder}>
                            <button onClick={handleEdit}>Edit Profile</button>
                        </div>
                    </>
                ) : (
                    <div className={styles.EditForm}>
                        <h2>Edit Profile</h2>
                        <div className={styles.EditFullNameBorder}>
                            <label htmlFor="fullName">Full Name</label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.EditEmailBorder}>
                            <label htmlFor="email">New Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your new email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.EditPhoneNumberBorder}>
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.EditPasswordBorder}>
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your current password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.SaveCancelBorder}>
                            <div className={styles.SaveButton} >
                                <button onClick={handleSave}>Save</button>
                            </div>
                            <div className={styles.CancelButton}>
                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer2 />
        </>
    );
}

export default Profile;
