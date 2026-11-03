// Netlify Function: contact.js
const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const { firstName, lastName, email, subject, message } = JSON.parse(event.body || '{}');
    
    if (!firstName || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Check if environment variables are set
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Missing SMTP configuration');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Email service not configured. Please contact sfusat@sfu.ca directly.',
          details: 'SMTP configuration missing'
        })
      };
    }

    // Configure SMTP using environment variables for security
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const recipients = ['jumiknows@gmail.com', 'ernest.kinman.wong@gmail.com'];
    const senderName = [firstName, lastName].filter(Boolean).join(' ').trim() || 'Contact Form';
    const fromAddress = process.env.SMTP_USER || 'no-reply@sfusat.org';

    const mailOptions = {
      from: `${senderName} <${fromAddress}>`,
      replyTo: email,
      to: recipients,
      subject,
      text: `Contexnt of actual email:\n${message}\n\n${senderName}\n`,
      html: `
        <p><strong>Contexnt of actual email:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <p>${senderName}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Message sent!' })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to send message', 
        details: error.message 
      })
    };
  }
};
