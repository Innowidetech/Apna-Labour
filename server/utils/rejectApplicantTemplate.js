const rejectApplicantTemplate = (name) => `
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
      background-color: #dc3545;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .email-body {
      padding: 20px;
      color: #333333;
    }
    .highlight-box {
      margin: 20px auto;
      background-color: #fdecea;
      border: 1px dashed #dc3545;
      padding: 15px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #dc3545;
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
      <h1>Application Update</h1>
    </div>
    <div class="email-body">
      <p>Hello ${name},</p>
      <p>We regret to inform you that your <strong>Apna Labour</strong> application has been <strong>rejected</strong>.</p>
      <div class="highlight-box">Unfortunately, you were not selected this time.</div>
      <p>You can try applying again in the future. We wish you the best.</p>
    </div>
    <div class="email-footer">
      <p>&copy; 2025 Apna Labour. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = rejectApplicantTemplate;
