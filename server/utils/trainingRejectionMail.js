const trainingRejectionMail = (reason) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #ff4d4f;
      color: white;
      text-align: center;
      padding: 20px;
    }
    .email-header h1 {
      margin: 0;
      font-size: 24px;
    }
    .email-body {
      padding: 25px;
      color: #333333;
      line-height: 1.6;
    }
    .reason-box {
      background-color: #fff2f0;
      border: 1px dashed #ff4d4f;
      color: #ff4d4f;
      font-weight: bold;
      padding: 15px;
      margin: 20px 0;
      border-radius: 6px;
      text-align: center;
    }
    .email-footer {
      text-align: center;
      background-color: #f0f0f0;
      padding: 15px;
      font-size: 12px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Training Rejected</h1>
    </div>
    <div class="email-body">
      <p>Hello,</p>
      <p>
        We regret to inform you that your training request has been
        <b>rejected</b> by the Apna Labour admin team for the following reason:
      </p>
      <div class="reason-box">${reason}</div>
      <p>
        You can contact our support team for further clarification or to
        reapply for training once you have addressed the mentioned issue.
      </p>
      <p>Thank you for your understanding.</p>
    </div>
    <div class="email-footer">
      &copy; 2025 Apna Labour. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

module.exports = trainingRejectionMail;
