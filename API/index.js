const express = require('express');
const request = require('request');
var cors = require('cors')
const app = express();
const axios = require('axios');
app.use(cors())

app.get('/data', (req, res, next) => {
  request('https://covid-19india-api.herokuapp.com/all',
    function (error, response, body) {
      res.send(body)
    });
});

axios.get('https://covid-19india-api.herokuapp.com/all')
  .then(function (response) {
    // handle success
    return response
  })
const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`From port ${port}`);
});