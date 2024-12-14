import React from "react";
import styles from "../Styles/PrivacyPolicy.module.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

function PrivacyPolicy() {
    return (
        <>
            <Header />
            <div className={styles.PrivacyPolicy}>
                <h1>Privacy Policy</h1>
                <p><strong>Effective Date:</strong> 11/21/2024</p>
                
                <p>
                    Welcome to ChefSearch. Your privacy is important to us. This Privacy Policy outlines how we
                    collect, use, and safeguard your information when you use our website.
                </p>

                <h2>1. Information We Collect</h2>
                <p>
                    We may collect the following types of information:
                    <ul>
                        <li><strong>Personal Information:</strong> When you sign up, contact us, or use our services, we may collect your name, email address, phone number, and any other details you provide.</li>
                        <li><strong>Usage Data:</strong> Information about how you use our website, such as pages visited, time spent on the site, and interactions with features.</li>
                        <li><strong>Cookies and Tracking Data:</strong> Small data files to improve your experience on our website.</li>
                    </ul>
                </p>

                <h2>2. How We Use Your Information</h2>
                <p>The information we collect is used to:</p>
                <ul>
                    <li>Provide and improve our services.</li>
                    <li>Respond to inquiries and provide support.</li>
                    <li>Send updates, newsletters, or promotional materials (you can opt-out anytime).</li>
                    <li>Analyze website usage and improve user experience.</li>
                </ul>

                <h2>3. How We Share Your Information</h2>
                <p>
                    We value your trust and do not sell or rent your personal information. However, we may share your
                    information in the following situations:
                    <ul>
                        <li><strong>With service providers:</strong> Who help us operate our website and services.</li>
                        <li><strong>To comply with legal obligations:</strong> Or enforce our Terms of Service.</li>
                        <li><strong>With your consent:</strong> If required.</li>
                    </ul>
                </p>

                <h2>4. Cookies and Tracking Technologies</h2>
                <p>
                    Our website uses cookies to:
                    <ul>
                        <li>Understand user behavior and improve the site.</li>
                        <li>Provide tailored recommendations and features.</li>
                    </ul>
                    You can disable cookies in your browser settings, but some features of our website may not function properly.
                </p>

                <h2>5. Data Security</h2>
                <p>
                    We implement reasonable security measures to protect your information from unauthorized access
                    or disclosure. However, no data transmission over the internet or electronic storage is 100%
                    secure, so we cannot guarantee absolute security.
                </p>

                <h2>6. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                    <li>Access and update your personal information.</li>
                    <li>Request the deletion of your information (subject to legal obligations).</li>
                    <li>Opt-out of marketing communications.</li>
                </ul>
                <p>
                    To exercise these rights, please contact us at [Insert Contact Information].
                </p>

                <h2>7. Third-Party Links</h2>
                <p>
                    Our website may contain links to third-party websites. We are not responsible for their
                    content, privacy practices, or security measures.
                </p>

                <h2>8. Children’s Privacy</h2>
                <p>
                    Our website is not intended for children under 13 years of age, and we do not knowingly collect
                    personal information from children.
                </p>

                <h2>9. Changes to This Privacy Policy</h2>
                <p>
                    We may update this Privacy Policy periodically. We encourage you to review this page for any
                    changes.
                </p>

                <h2>10. Contact Us</h2>
                <p>
                    If you have any questions or concerns about this Privacy Policy, please contact us at:
                    <ul>
                        <li><strong>Email:</strong> Rutsellmoradel64@gmail.com</li>
                        <li><strong>Phone:</strong> +1(555)123-4567</li>
                        <li><strong>Address:</strong> 1234 Main Street, Suite 567, Metropolis City, NY 10101, USA</li>
                    </ul>
                </p>
            </div>
            <Footer />
        </>
    );
}

export default PrivacyPolicy;
