const os = require('os');
const path = require('path');
const express = require('express');
const { userRouter } = require('./user/route');

// REST-API: open ./deta.rest
const baseUrl = '/v1';

const app = express();

app.set('etag', false);
app.set('x-powered-by', false);
app.use((req, res, next) => {
  const origin = req.headers.origin || `${req.protocol}://${req.headers.host}`;
  res.header('Access-Control-Allow-Origin', `${origin}`);
  res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Server', 'deta.sh');
  res.header('X-Powered-By', 'deta.sh');
  res.header('X-Backend-Host', os.hostname());
  next();
});
app.use(express.static(path.resolve(__dirname, '../docs')));
app.use(express.json());
app.get('', (req, res) => res.send('OK /'));
app.get(`${baseUrl}`, (req, res) => res.send('OK /v1'));
app.use(`${baseUrl}/user`, userRouter);

module.exports = app;
