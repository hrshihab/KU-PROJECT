import nodemailer from 'nodemailer'
import config from '../../../config';

const generateResetPasswordHTML = (resetLink: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        background-color: #006A4E; /* KU Green */
        padding: 20px;
        text-align: center;
        color: white;
        border-radius: 5px 5px 0 0;
      }
      .content {
        background-color: #f9f9f9;
        padding: 30px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
      }
      .footer {
        background-color: #f1f1f1;
        padding: 15px;
        text-align: center;
        font-size: 12px;
        color: #666;
        border-radius: 0 0 5px 5px;
        border: 1px solid #ddd;
      }
      .button {
        display: inline-block;
        background-color: #006A4E;
        color: white;
        text-decoration: none;
        padding: 12px 25px;
        border-radius: 4px;
        margin: 20px 0;
        font-weight: bold;
      }
      .logo {
        max-width: 150px;
        margin-bottom: 10px;
      }
      .warning {
        font-size: 12px;
        color: #777;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Khulna University</h1>
      </div>
      <div class="content">
        <h2>Password Reset Request</h2>
        <p>Hello,</p>
        <p>We received a request to reset your password for your Khulna University account. To proceed with resetting your password, please click the button below:</p>
        
        <div style="text-align: center;">
          <a href="${resetLink}" class="button">Reset Password</a>
        </div>
        
        <p>If you did not request a password reset, please ignore this email or contact the IT support team if you have concerns.</p>
        
        <p>This link will expire in 5 minutes for security reasons.</p>
        
        <div class="warning">
          <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
          <p style="word-break: break-all;">${resetLink}</p>
        </div>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} Khulna University. All rights reserved.</p>
        <p>Khulna-9208, Bangladesh</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

const emailSender = async (email: string, resetLink: string) => {
  const html = generateResetPasswordHTML(resetLink);
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  
  const info = await transporter.sendMail({
    from: '"Khulna University" <hrshihab10@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Reset Password Link", // Subject line
    html, // html body
  });
  
  return info;
};

export default emailSender;