const express = require('express');
const { userController } = require('./user/controller');

const app = express();
app.use(express.json());

// curl -i https://us70fa.deta.dev
app.get('/', userController.top);

// curl -i https://us70fa.deta.dev/users
app.get('/users', userController.users);

// curl -i -X POST -H "Content-Type: application/json" https://us70fa.deta.dev/user/register -d @./data-1.json
app.post('/user/register', userController.register);

// curl -i -X GET https://us70fa.deta.dev/user/okc9owi78u1p
app.get('/user/:id', userController.findById);

// curl -i -X POST -H "Content-Type: application/json" https://us70fa.deta.dev/user/findByAge -d '{"age":44}'
app.post('/user/findByAge', userController.findByAge);

// curl -i -X POST -H "Content-Type: application/json" https://us70fa.deta.dev/user/findByName -d '{"name":"Beverly"}'
app.post('/user/findByName', userController.findByName);

// curl -i -X PUT -H "Content-Type: application/json" https://us70fa.deta.dev/user/okc9owi78u1p -d @./data-1.json
app.put('/user/:id', userController.update);

// curl -i -X DELETE https://us70fa.deta.dev/user/okc9owi78u1p
app.delete('/user/:id', userController.remove);

module.exports = app;
