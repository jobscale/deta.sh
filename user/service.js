const { Deta } = require('deta');

const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base(`${process.env.NODE_ENV}-user`);

class UserService {
  users() {
    return db.fetch({ active: true });
  }

  findById(rest) {
    const { key } = rest;
    return db.get(key);
  }

  findByAge(rest) {
    const { age } = rest;
    return db.fetch({ age })
    .then(({ items }) => items);
  }

  findByName(rest) {
    const { name } = rest;
    return db.fetch({ name })
    .then(({ items }) => items);
  }

  register(rest) {
    const { name, age, hometown } = rest;
    return db.put({ name, age, hometown, active: true });
  }

  update(rest) {
    const { key, name, age, hometown } = rest;
    return db.update({ name, age, hometown, active: true }, key);
  }

  remove(rest) {
    const { key } = rest;
    return db.delete(key);
  }
}

module.exports = {
  UserService,
  userService: new UserService(),
};
