const acceptedTrainingMail = (name, location, startDate, endDate, timing, imageUrl) => `
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
      margin: 20px auto;
      background: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .header {
      background-color: #28a745;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .body {
      padding: 20px;
      color: #333333;
    }
    .details-box {
      margin: 20px auto;
      background-color: #f0fdf4;
      border: 1px dashed #28a745;
      padding: 15px;
      border-radius: 6px;
      max-width: 450px;
    }
    .details-box p {
      margin: 8px 0;
      font-size: 15px;
    }
    .image-box {
      text-align: center;
      margin-top: 20px;
    }
    .image-box img {
      max-width: 100%;
      border-radius: 8px;
    }
    .footer {
      text-align: center;
      padding: 10px;
      color: #888888;
      font-size: 12px;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Training Accepted!</h1>
    </div>
    <div class="body">
      <p>Hello <b>${name}</b>,</p>
      <p>We’re happy to inform you that you’ve been <b>accepted</b> for the upcoming training session organized by <b>Apna Labour</b>.</p>

      <div class="details-box">
        <p><b>📍 Location:</b> ${location}</p>
        <p><b>🗓️ Start Date:</b> ${startDate}</p>
        <p><b>📅 End Date:</b> ${endDate}</p>
        <p><b>⏰ Timing:</b> ${timing}</p>
      </div>

      <div class="image-box">
        <img src="${imageUrl}" alt="Training Image" />
      </div>

      <p>We look forward to seeing you at the training! Please arrive 10 minutes early.</p>
    </div>
    <div class="footer">
      <p>&copy; 2025 Apna Labour. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = acceptedTrainingMail;

