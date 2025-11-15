const contactReplyMail = (adminMessage) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      text-align: center;
      padding: 15px;
    }
    .header h2 {
      margin: 0;
      font-size: 20px;
    }
    .body {
      padding: 20px;
      color: #333333;
      line-height: 1.6;
    }
    .message-box {
      background-color: #f4f8ff;
      border-left: 4px solid #007bff;
      padding: 15px;
      margin-top: 15px;
      border-radius: 5px;
      white-space: pre-line;
    }
    .footer {
      text-align: center;
      color: #777777;
      font-size: 12px;
      padding: 10px;
      border-top: 1px solid #eeeeee;
      background-color: #fafafa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Reply from Apna Labour</h2>
    </div>
    <div class="body">
      <p>This is a reply to the contact form you submitted to Apna Labour.</p>
      <div class="message-box">
        ${adminMessage}
      </div>
      <p>Thank you for reaching out to us.</p>
      <p>Best regards,<br><b>Apna Labour Support Team</b></p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Apna Labour. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = contactReplyMail;
