const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require('./models/User');
const cookieParser = require("cookie-parser");
const authRouter = require('./routes/auth.route');
const adminRouter = require('./routes/admin.route');
const labourerRouter = require('./routes/labourer.route');
const customerRouter = require('./routes/customer.route');
const userRouter = require('./routes/user.router');
const landingPageRouter = require('./routes/landingPages.route');

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const allowedOrigins = [
  "http://localhost:5173",
  "https://apnalabour.vercel.app"
  https://apnalabor.web.app'
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || !origin) {
        // allow requests with no origin (like Postman)
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // 👈 this allows cookies (guestId) to be sent
  })
);

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/labourer', labourerRouter);
app.use('/api/customer', customerRouter);
app.use('/api/user', userRouter);
app.use('/api/services', landingPageRouter);


mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log('Server connected to database ✅');

    // 🔹 Force rebuild indexes based on schema
    await User.syncIndexes();

  })
  .catch(err => {
    console.error('Error connecting to database', err)
  });

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`)
});






