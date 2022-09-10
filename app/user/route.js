const { Router } = require('express');
const { userController } = require('./controller');

const router = Router();

router.get('', userController.top);
router.get('/list', userController.users);
router.post('/register', userController.register);
router.get('/:id', userController.findById);
router.post('/findByAge', userController.findByAge);
router.post('/findByName', userController.findByName);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = {
  userRouter: router,
};
