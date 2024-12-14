const { onRequest } = require("firebase-functions/v2/https");
const nodemailer = require("nodemailer");
const logger = require("firebase-functions/logger");

// Configure the transporter with your email provider settings
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email provider (e.g., 'gmail', 'yahoo', etc.)
    auth: {
        user: 'your-email@example.com', // Replace with your email
        pass: 'your-email-password' // Replace with your email password or app-specific password
    }
});

// Create the Firebase Cloud Function to send emails
exports.sendEmail = onRequest((req, res) => {
    // Extract data from the request body
    const { name, email, message } = req.body;

    // Define the email options
    const mailOptions = {
        from: 'your-email@example.com', // Replace with your email
        to: 'your-email@example.com', // Replace with your recipient email
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            logger.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            logger.info('Email sent successfully:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});