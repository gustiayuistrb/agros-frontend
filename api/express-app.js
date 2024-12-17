const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from Express.js on Vercel!');
});

// Menggunakan serverless-http untuk mengonversi Express ke serverless function
module.exports.handler = serverless(app);
