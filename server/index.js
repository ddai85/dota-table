const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
require('dotenv');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/../client/dist'));




app.listen(process.env.PORT, () => {
  console.log('listening to port ', process.env.PORT);
});

module.exports.app = app;
