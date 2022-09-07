const { userService } = require('./service');

class UserController {
  top(req, res) {
    res.send(`Hello World! ${process.env.NODE_ENV}`);
  }

  users(req, res) {
    userService.users()
    .then(users => {
      if (!users.length) {
        res.status(404).json({ message: 'Not Found' });
        return;
      }
      res.json(users);
    })
    .catch(e => res.status(500).json({ message: e.message }));
  }

  findById(req, res) {
    const { id } = req.params;
    userService.findById({ key: id })
    .then(user => {
      if (!user) {
        res.status(404).json({ message: 'Not Found' });
        return;
      }
      res.json(user);
    })
    .catch(e => res.status(500).json({ message: e.message }));
  }

  findByAge(req, res) {
    const { age } = req.body;
    userService.findByAge({ age })
    .then(users => res.json({ users, age }))
    .catch(e => res.status(500).json({ message: e.message }));
  }

  findByName(req, res) {
    const { name } = req.body;
    userService.findByName({ name })
    .then(users => res.json({ users, name }))
    .catch(e => res.status(500).json({ message: e.message }));
  }

  register(req, res) {
    const { name, age, hometown } = req.body;
    if (!name || (!age && age !== 0) || !hometown) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }
  
    userService.register({ name, age, hometown })
    .then(user => res.json(user))
    .catch(e => res.status(500).json({ message: e.message }));
  }

  update(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }

    const { name, age, hometown } = req.body;
    if (!name || (!age && age !== 0) || !hometown) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }

    userService.update({ key: id, name, age, hometown })
    .then(user => res.json(user))
    .catch(e => res.status(500).json({ message: e.message }));
  }

  remove(req, res) {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }

    userService.remove({ key: id })
    .then(() => res.json({ message: 'removed' }))
    .catch(e => res.status(500).json({ message: e.message }));
  }
}

module.exports = {
  UserController,
  userController: new UserController(),
};
