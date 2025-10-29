# EmailJS Setup Instructions

## Overview
The contact form is configured to use EmailJS for sending emails. You need to set up EmailJS to make the contact form functional.

## Setup Steps

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### 2. Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note down your **Service ID**

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template content:

**Subject:** New Enquiry from Coders Studio Website

**Content:**
```
New enquiry received from Coders Studio website:

Name: {{from_name}}
Age: {{age}}
Parent's Name: {{parent_name}}
Email: {{from_email}}
Phone: {{phone}}

Enquiry:
{{message}}

---
This email was sent from the Coders Studio contact form.
```

4. Save the template and note down your **Template ID**

### 4. Get Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

### 5. Update JavaScript Configuration
1. Open `assets/js/script.js`
2. Find the `sendEmail` function
3. Replace the placeholder values:

```javascript
// Replace these with your actual values:
emailjs.init("YOUR_PUBLIC_KEY"); // Your EmailJS public key
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams) // Your service and template IDs
```

### 6. Test the Form
1. Open your website
2. Fill out the contact form
3. Submit and check if you receive the email

## Example Configuration
```javascript
// Example with actual values:
emailjs.init("user_abc123def456");
emailjs.send("service_xyz789", "template_contact", templateParams)
```

## Troubleshooting
- Make sure all IDs are correct
- Check that your email service is properly connected
- Verify the template variables match the form fields
- Check browser console for any error messages

## Security Note
- Never expose your private keys in client-side code
- Only use the public key in your website
- Consider implementing server-side validation for production use
