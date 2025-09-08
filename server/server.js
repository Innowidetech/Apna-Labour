const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('./routes/auth.route');
const adminRouter = require('./routes/admin.route');
const labourerRouter = require('./routes/labourer.route');
const customerRouter = require('./routes/customer.route');
const userRouter = require('./routes/user.router');
const landingPageRouter = require('./routes/landingPages.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/labourer', labourerRouter);
app.use('/api/customer', customerRouter);
app.use('/api/user', userRouter);
app.use('/api/services', landingPageRouter);


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Server connected to database.'))
  .catch(err => { console.error('Error connecting to database', err) });

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running at port: ${port}`)
});






