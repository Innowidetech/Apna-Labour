// utils/forgetEmail.js

const forgetEmail = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }

    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .header {
      background-color: #ff9f1c;
      color: #fff;
      text-align: center;
      padding: 25px 10px;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
    }

    .content {
      padding: 25px 30px;
      color: #333;
      line-height: 1.6;
    }

    .content p {
      margin-bottom: 15px;
      font-size: 16px;
    }

    .otp-box {
      background-color: #fff4e5;
      border: 2px dashed #ff9f1c;
      color: #ff9f1c;
      font-weight: bold;
      text-align: center;
      padding: 15px;
      font-size: 22px;
      border-radius: 6px;
      width: fit-content;
      margin: 20px auto;
      letter-spacing: 3px;
    }

    .footer {
      background-color: #fafafa;
      text-align: center;
      color: #888;
      font-size: 13px;
      padding: 15px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset OTP</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>We received a request to reset your Apna Labour account password.</p>
      <p>Please use the OTP below to complete your password reset. This OTP will expire in <b>1 minute</b>.</p>

      <div class="otp-box">${otp}</div>

      <p>If you didn’t request this, please ignore this email. Your account is safe.</p>
      <p>Regards,<br><b>The Apna Labour Team</b></p>
    </div>
    <div class="footer">
      © 2025 Apna Labour. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

module.exports = forgetEmail;
