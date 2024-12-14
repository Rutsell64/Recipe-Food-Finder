import React, {useRef, useState} from "react";
import emailjs from "emailjs-com";
import styles from "../Styles/ContactUs.module.css";
import Header from "../Components/Header";
import Phone_Icon from "../Assets/Phone_Icon.png";
import Email_Icon from "../Assets/Email_Icon.png";
import Location_Icon from "../Assets/Location_Icon.png";
import Working_Hours from "../Assets/Hours_Icon.png"
import Footer from "../Components/Footer"

function ContactUs(){
    const form = useRef();
    const [isModalOpen,setIsModalOpen] = useState(false);

    const SendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service id', 'email template', form.current, 'public key from emailjs')
        .then((result) => {
            console.log('Success:', result.text);
            form.current.reset();
            setIsModalOpen(true); // Show modal on success
        }, (error) => {
            console.error('Error:', error.text);
        });
    };
    const closeModal = () => {
        setIsModalOpen(false); // Hide modal when close button is clicked
    };

    return(
        <>
            <Header/>

            <div className = {styles.ContactUs}>
                <div className = {styles.DetailsBorder}>
                    <div className = {styles.DetailsBorderTitle}>
                        <h1>Get In Touch With Us Now!</h1>
                    </div>
                    <div className = {styles.DetailsBorderInfo}>
                        <div className = {styles.DetailsRow1}>
                            <div className = {styles.DetailsRow1Sec1}>
                                <img src={Phone_Icon} alt="Phone Icon"/>
                                <h2>Phone Number</h2>
                                <p>+1(555)123-4567</p>
                            </div>
                            <div className = {styles.line1}>

                            </div>
                            <div className = {styles.DetailsRow1Sec2}>
                                <img src={Email_Icon} alt="Email Icon"/>
                                <h2>Email</h2>
                                <p><strong>For Info:</strong> info@ChefSearch.com</p>
                                <p><strong>Sales:</strong> sales@ChefSearch.com</p>
                            </div>
                        </div>
                        <div className = {styles.DetailsRow2}>
                            <div className = {styles.DetailsRow2Sec1}>
                                <img src={Location_Icon} alt="Location Icon"/>
                                <h2>Location</h2>
                                <p>1234 Main Street, Suite 567, Metropolis City, NY 10101, USA</p>
                            </div>
                            <div className = {styles.line2}>

                            </div>
                            <div className = {styles.DetailsRow2Sec2}>
                                <img src={Working_Hours} alt="Clock Icon"/>
                                <h2>Working Hours</h2>
                                <p>Monday - Friday</p>
                                <p>09:00 AM to 5:00pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = {styles.FormBorder}>
                    <div className = {styles.FormBorderTitle}>
                        <h1>Contact Us</h1>
                    </div>
                    <div className = {styles.FormBorderInfo}>
                        <form ref = {form} onSubmit={SendEmail}>
                            <div className = {styles.FormRow1}>
                                <div className = {styles.FormRow1Sec1}>
                                    <input type="text" name = "first_name" placeholder="First Name *" required />
                                </div>
                                <div className = {styles.FormRow1Sec2}>
                                    <input type="text"  name="last_name" placeholder="Last Name *" required />
                                </div>
                            </div>
                            <div className = {styles.FormRow2}>
                                <div className = {styles.FormRow2Sec1}>
                                    <input type="tel" name="email" placeholder="Phone Number *" pattern="[0-9]{10}" required />
                                </div>
                                <div className = {styles.FormRow2Sec2}>
                                    <input type="email" name="phone_number" placeholder="Email *" required />
                                </div>
                            </div>
                            <div className = {styles.FormRow3}>
                                <div className = {styles.FormRow3Sec1}>
                                    <textarea name="message" placeholder="Write your message here..." required></textarea>
                                </div>
                            </div>
                            <div className = {styles.FormRow4}>
                                <div className = {styles.FormRow4Sec1}>
                                    <button type="submit">Send</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                {isModalOpen && (
                    <div className={styles.Modal}>
                        <div className={styles.ModalContent}>
                            <h2>Thank you!</h2>
                            <p>Your message has been sent successfully.</p>
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                )}
            </div>

            <Footer/>   
        </>
    )
}

export default ContactUs;