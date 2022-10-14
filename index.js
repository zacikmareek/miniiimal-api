// require('dotenv').config();
const express = require('express');
const app = express();
const {sequelize} = require('./src/models')
const cors = require('cors');
//const sgMail = require("@sendgrid/mail");
const config = require('./src/config/config');

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  exposedHeaders: ['set-cookie']
}));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

require('./src/routes')(app)

sequelize.sync()
  .then((result) => {
    app.listen(config.app_port)
    console.log(`Server is running at port ${config.app_port}`);
  });
