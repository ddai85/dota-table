const environment = process.env.NODE_ENV;
const envPath = '.env.' + environment;
const envVars = require('dotenv').config({path: envPath});
const query = require('./database/queryHelper.js')

console.log('Current server environment: ', environment);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static(__dirname + '/../client/dist'));

app.post('/match', (req, res) => {
  query.insertMatch(req.body, () => {
	  res.status(200).end();
  })
})

app.get('/match', (req, res) => {
	query.searchMatch((result) => {
		res.status(200).send(result);
	})
})


app.listen(process.env.PORT, () => {
  console.log('listening to port ', process.env.PORT);
});

module.exports.app = app;
