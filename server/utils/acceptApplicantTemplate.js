const acceptApplicantTemplate = (name, trainingDetails) => `
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
      background-color: #28a745;
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
      background-color: #e6f9ee;
      border: 1px dashed #28a745;
      padding: 15px;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #28a745;
      border-radius: 4px;
      max-width: 400px;
    }
    .details-box {
      margin: 20px auto;
      padding: 15px;
      border: 1px solid #dddddd;
      border-radius: 6px;
      background-color: #fdfdfd;
      max-width: 500px;
    }
    .details-box p {
      margin: 6px 0;
      font-size: 14px;
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
      <h1>Congratulations!</h1>
    </div>
    <div class="email-body">
      <p>Hello ${name},</p>
      <p>We are pleased to inform you that your <strong>Apna Labour</strong> application has been <strong>accepted</strong>.</p>
      <div class="highlight-box">You have been selected for training 🎉</div>
      <div class="details-box">
        <h3>Training Details:</h3>
        <p><strong>Start Date:</strong> ${new Date(trainingDetails.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> ${new Date(trainingDetails.endDate).toLocaleDateString()}</p>
        <p><strong>Timings:</strong> ${trainingDetails.timings}</p>
        <p><strong>Location:</strong> ${trainingDetails.location}</p>
      </div>
      <p>Please ensure you attend the training as per the schedule. We look forward to working with you!</p>
    </div>
    <div class="email-footer">
      <p>&copy; 2025 Apna Labour. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = acceptApplicantTemplate;