# EmailJS Setup Guide

This guide will help you set up EmailJS to enable the contact form's send message functionality.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

## Step 3: Create Email Template

1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use the following template structure:

```html
Subject: New Contact Form Message: {{subject}}

From: {{from_name}} ({{from_email}})
To: {{to_name}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply-To: {{reply_to}}
```

4. Save the template and note down your **Template ID**

## Step 4: Get Public Key

1. Go to "Account" → "General"
2. Find your **Public Key** (User ID)

## Step 5: Configure Environment Variables

Create a `.env` file in your project root with:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 6: Update Configuration

The configuration is already set up in `src/lib/email-config.ts`. The environment variables will be automatically loaded.

## Testing

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out the form with test data
4. Submit the form
5. Check your email for the message

## Fallback Behavior

If EmailJS fails for any reason, the form will automatically fall back to opening the user's default email client with the message pre-filled.

## Rate Limits

EmailJS free tier includes:
- 200 emails per month
- Rate limiting to prevent spam

For production use, consider upgrading to a paid plan if you expect high volume.
