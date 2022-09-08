const os = require('os');
const express = require('express');
const { userController } = require('./user/controller');

const app = express();
app.use(express.json());
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

// curl -i https://us70fa.deta.dev
app.get('/', userController.top);

// curl -i https://us70fa.deta.dev/users
app.get('/users', userController.users);

// curl -i -X POST -H "Content-Type: application/json" https://us70fa.deta.dev/user/register -d @./data-1.json
app.post('/user/register', userController.register);

// curl -i -X GET https://us70fa.deta.dev/user/wesrjnsyhx2p
app.get('/user/:id', userController.findById);

// curl -i -X POST -H "Content-Type: application/json" https://us70fa.deta.dev/user/findByAge -d '{"age":44}'
app.post('/user/findByAge', userController.findByAge);

// curl -i -X POST -H "Content-Type: application/json" https://us70fa.deta.dev/user/findByName -d '{"name":"Beverly"}'
app.post('/user/findByName', userController.findByName);

// curl -i -X PUT -H "Content-Type: application/json" https://us70fa.deta.dev/user/wesrjnsyhx2p -d @./data-1.json
app.put('/user/:id', userController.update);

// curl -i -X DELETE https://us70fa.deta.dev/user/wesrjnsyhx2p
app.delete('/user/:id', userController.remove);

module.exports = app;
