// EmailJS Configuration
// To set up EmailJS for sending emails:
// 1. Go to https://www.emailjs.com/ and create an account
// 2. Create a new email service (Gmail, Outlook, etc.)
// 3. Create an email template with the following variables:
//    - {{from_name}} - sender's name
//    - {{from_email}} - sender's email
//    - {{subject}} - email subject
//    - {{message}} - email message
//    - {{to_name}} - recipient name (Sunni Kumar)
//    - {{reply_to}} - reply-to email address
// 4. Get your Service ID, Template ID, and Public Key from EmailJS dashboard
// 5. Replace the values below with your actual EmailJS credentials

export const EMAIL_CONFIG = {
  SERVICE_ID: process.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id',
  TEMPLATE_ID: process.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id',
  PUBLIC_KEY: process.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key',
};

// Fallback email configuration
export const FALLBACK_EMAIL = 'sunnikumar.arya@gmail.com';

// Email validation regex
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
