const trainingCompletionMail = (score) => `
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
      background-color: #4caf50;
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
    .score-box {
      background-color: #e8f5e9;
      border: 1px dashed #4caf50;
      color: #2e7d32;
      font-weight: bold;
      padding: 15px;
      margin: 20px 0;
      border-radius: 6px;
      text-align: center;
      font-size: 18px;
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
      <h1>🎉 Training Completed Successfully!</h1>
    </div>
    <div class="email-body">
      <p>
        Congratulations on successfully completing your training with
        <b>Apna Labour</b>! Your hard work and dedication have paid off.
      </p>
      <p>Your final training score is:</p>
      <div class="score-box">${score}%</div>
      <p>
        You are now eligible to take on professional projects and tasks.
        Keep up the great work!
      </p>
      <p>Best regards,<br />The Apna Labour Team</p>
    </div>
    <div class="email-footer">
      &copy; 2025 Apna Labour. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

module.exports = trainingCompletionMail;
