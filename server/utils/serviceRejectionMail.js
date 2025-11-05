const serviceRejectionMail = (reason) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f8f8;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      background-color: #ff4d4f;
      color: #fff;
      padding: 20px;
      text-align: center;
      font-size: 22px;
      font-weight: bold;
    }
    .body {
      padding: 25px;
      color: #333;
      font-size: 15px;
      line-height: 1.6;
    }
    .reason-box {
      background: #fff2f0;
      border-left: 5px solid #ff4d4f;
      padding: 15px;
      margin: 20px 0;
      border-radius: 6px;
      color: #b71c1c;
      font-weight: 500;
    }
    .footer {
      background-color: #f0f0f0;
      text-align: center;
      color: #777;
      padding: 12px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">Request Rejected</div>
    <div class="body">
      <p>Dear User,</p>
      <p>Your recent request has been <b>rejected</b> by the Apna Labour admin team.</p>
      <p>Reason for rejection:</p>
      <div class="reason-box">${reason}</div>
      <p>If you believe this was a mistake, please contact our support team for further assistance.</p>
      <p>Thank you for understanding,<br><b>Apna Labour Team</b></p>
    </div>
    <div class="footer">
      &copy; 2025 Apna Labour. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

module.exports = serviceRejectionMail;