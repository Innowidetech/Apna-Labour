const suspensionMail = (reason) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #ff4d4f;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .email-body {
      padding: 20px;
      color: #333333;
    }
    .reason-box {
      margin: 20px auto;
      background-color: #fff4f4;
      border: 1px dashed #ff4d4f;
      padding: 15px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: #ff4d4f;
      border-radius: 4px;
      max-width: 400px;
    }
    .email-footer {
      text-align: center;
      padding: 10px;
      color: #888888;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Account Suspended</h1>
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>Your account has been <b>temporarily suspended</b> by the Apna Labour admin team for the following reason:</p>
      <div class="reason-box">${reason}</div>
      <p>If you believe this is a mistake or need further assistance, please contact our support team.</p>
    </div>
    <div class="email-footer">
      <p>&copy; 2025 Apna Labour. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = suspensionMail;
